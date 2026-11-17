import {
  FREE_SHIPPING_THRESHOLD,
  PRODUCTS,
  PROMO_CODES,
  SHIPPING_METHODS,
  TAX_RATE,
  formatCurrency,
  getProductById,
} from './products.js';
import { t, tCategory, tFinish, tProductName } from './i18n.js';

const STORAGE_KEYS = {
  cart: 'nova_shop_cart',
  promo: 'nova_shop_promo',
  shipping: 'nova_shop_shipping',
  viewed: 'nova_shop_viewed',
  lastOrder: 'nova_shop_last_order',
};

export function createCartKey(productId, finish) {
  return `${productId}::${finish || 'Default'}`;
}

export function addItemToList(items, productId, finish, quantity = 1) {
  const product = getProductById(productId);
  if (!product) return [...items];

  const chosenFinish = finish || product.finishes[0];
  const qty = Math.max(1, Math.floor(Number(quantity) || 1));
  const key = createCartKey(product.id, chosenFinish);
  const existingIndex = items.findIndex((item) => item.key === key);

  if (existingIndex >= 0) {
    return items.map((item, idx) =>
      idx === existingIndex ? { ...item, quantity: item.quantity + qty } : item
    );
  }

  return [
    ...items,
    {
      key,
      productId: product.id,
      sku: product.sku,
      name: product.name,
      category: product.category,
      material: product.material,
      finish: chosenFinish,
      price: product.price,
      image: product.image,
      quantity: qty,
    },
  ];
}

export function updateItemQuantityInList(items, key, quantity) {
  const nextQty = Math.floor(Number(quantity) || 0);
  if (nextQty <= 0) {
    return items.filter((item) => item.key !== key);
  }
  return items.map((item) => (item.key === key ? { ...item, quantity: nextQty } : item));
}

export function removeItemFromList(items, key) {
  return items.filter((item) => item.key !== key);
}

export function validatePromoCode(rawCode, subtotal) {
  const normalized = String(rawCode || '').trim().toUpperCase();
  if (!normalized) {
    return {
      valid: false,
      code: '',
      discountAmount: 0,
      label: '',
      message: t('promo.empty'),
    };
  }

  const rule = PROMO_CODES[normalized];
  if (!rule) {
    return {
      valid: false,
      code: '',
      discountAmount: 0,
      label: '',
      message: t('promo.invalid', { code: normalized }),
    };
  }

  if (rule.minSubtotal && subtotal < rule.minSubtotal) {
    return {
      valid: false,
      code: '',
      discountAmount: 0,
      label: '',
      message: t('promo.minSubtotal', {
        code: rule.code,
        min: formatCurrency(rule.minSubtotal),
      }),
    };
  }

  const discountAmount =
    rule.type === 'percent'
      ? Number(((subtotal * rule.value) / 100).toFixed(2))
      : Math.min(subtotal, rule.value);

  const label = t(`promo.${rule.code}.label`);

  return {
    valid: true,
    code: rule.code,
    discountAmount,
    label,
    message: t('promo.applied', { code: rule.code, label }),
  };
}

export function calculateCartTotals(items, shippingMethodId = 'standard', promoCode = '') {
  const safeItems = Array.isArray(items) ? items : [];
  const itemCount = safeItems.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  const subtotal = Number(
    safeItems
      .reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0)
      .toFixed(2)
  );

  const promoResult = promoCode && subtotal > 0 ? validatePromoCode(promoCode, subtotal) : null;
  const discount = promoResult && promoResult.valid ? promoResult.discountAmount : 0;
  const discountedSubtotal = Math.max(0, Number((subtotal - discount).toFixed(2)));

  const method = SHIPPING_METHODS[shippingMethodId] || SHIPPING_METHODS.standard;
  let shippingCost = 0;
  if (subtotal > 0) {
    if (method.freeEligible && discountedSubtotal >= FREE_SHIPPING_THRESHOLD) {
      shippingCost = 0;
    } else {
      shippingCost = method.baseCost;
    }
  }

  const freeShippingRemaining = Math.max(
    0,
    Number((FREE_SHIPPING_THRESHOLD - discountedSubtotal).toFixed(2))
  );
  const tax = Number((discountedSubtotal * TAX_RATE).toFixed(2));
  const total = Number((discountedSubtotal + shippingCost + tax).toFixed(2));

  return {
    itemCount,
    subtotal,
    discount,
    discountCode: promoResult && promoResult.valid ? promoResult.code : '',
    discountLabel: promoResult && promoResult.valid ? promoResult.label : '',
    shippingMethodId: method.id,
    shippingCost,
    freeShippingRemaining,
    tax,
    total,
  };
}

function readStorage(key, fallback) {
  if (typeof window === 'undefined' || !window.localStorage) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota issues safely
  }
}

export function loadCart() {
  const saved = readStorage(STORAGE_KEYS.cart, []);
  if (!Array.isArray(saved)) return [];
  return saved.filter((item) => item && getProductById(item.productId) && item.quantity > 0);
}

export function saveCart(items) {
  writeStorage(STORAGE_KEYS.cart, items);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('nova:cart-updated', { detail: { items } }));
  }
}

export function clearCart() {
  saveCart([]);
  saveAppliedPromo('');
}

export function loadAppliedPromo() {
  return readStorage(STORAGE_KEYS.promo, '');
}

export function saveAppliedPromo(code) {
  writeStorage(STORAGE_KEYS.promo, code || '');
}

export function loadShippingMethod() {
  const method = readStorage(STORAGE_KEYS.shipping, 'standard');
  return SHIPPING_METHODS[method] ? method : 'standard';
}

export function saveShippingMethod(methodId) {
  const validId = SHIPPING_METHODS[methodId] ? methodId : 'standard';
  writeStorage(STORAGE_KEYS.shipping, validId);
}

export function loadRecentlyViewed() {
  const list = readStorage(STORAGE_KEYS.viewed, []);
  return Array.isArray(list) ? list : [];
}

export function recordRecentlyViewed(productId) {
  if (!getProductById(productId)) return;
  const current = loadRecentlyViewed().filter((id) => id !== productId);
  const next = [productId, ...current].slice(0, 6);
  writeStorage(STORAGE_KEYS.viewed, next);
}

export function saveLastOrder(order) {
  writeStorage(STORAGE_KEYS.lastOrder, order);
}

export function loadLastOrder() {
  return readStorage(STORAGE_KEYS.lastOrder, null);
}

export function addToCart(productId, finish, quantity = 1) {
  const current = loadCart();
  const next = addItemToList(current, productId, finish, quantity);
  saveCart(next);
  recordRecentlyViewed(productId);
  const product = getProductById(productId);
  if (typeof window !== 'undefined' && product) {
    window.dispatchEvent(
      new CustomEvent('nova:toast', {
        detail: { message: t('toast.added', { name: tProductName(product) }) },
      })
    );
  }
  return next;
}

export function updateCartQuantity(key, quantity) {
  const next = updateItemQuantityInList(loadCart(), key, quantity);
  saveCart(next);
  return next;
}

export function removeFromCart(key) {
  const next = removeItemFromList(loadCart(), key);
  saveCart(next);
  return next;
}

export function initCartPage({ onAfterRender } = {}) {
  const itemsContainer = document.getElementById('cart-items-container');
  const emptyContainer = document.getElementById('cart-empty-state');
  const layoutContainer = document.getElementById('cart-filled-layout');
  const clearBtn = document.getElementById('clear-cart-btn');
  const promoForm = document.getElementById('promo-form');
  const promoInput = document.getElementById('promo-code-input');
  const promoFeedback = document.getElementById('promo-feedback');

  if (!itemsContainer || !emptyContainer || !layoutContainer) return;

  function renderCart() {
    const items = loadCart();
    const promoCode = loadAppliedPromo();
    const shippingMethod = loadShippingMethod();
    const totals = calculateCartTotals(items, shippingMethod, promoCode);

    if (items.length === 0) {
      layoutContainer.hidden = true;
      emptyContainer.hidden = false;
      if (typeof onAfterRender === 'function') onAfterRender(items);
      return;
    }

    layoutContainer.hidden = false;
    emptyContainer.hidden = true;

    const meterText = document.getElementById('shipping-meter-text');
    const meterFill = document.getElementById('shipping-progress-fill');
    if (meterText && meterFill) {
      const progressPct = Math.min(100, Math.round(((FREE_SHIPPING_THRESHOLD - totals.freeShippingRemaining) / FREE_SHIPPING_THRESHOLD) * 100));
      meterFill.style.width = `${progressPct}%`;
      meterText.textContent =
        totals.freeShippingRemaining === 0
          ? t('cart.freeShipUnlocked')
          : t('cart.freeShipRemaining', { amount: formatCurrency(totals.freeShippingRemaining) });
    }

    itemsContainer.innerHTML = items
      .map((item) => {
        const prod = getProductById(item.productId) || item;
        const displayName = tProductName(prod);
        const displayCat = tCategory(item.category);
        const displayFinish = tFinish(item.finish);
        return `
      <article class="cart-item-row" data-cart-key="${item.key}">
        <img class="cart-item-thumb" src="${item.image}" alt="${displayName}" referrerpolicy="no-referrer" />
        <div class="cart-item-details">
          <h3 class="cart-item-title">${displayName}</h3>
          <p class="cart-item-meta">${displayCat} · ${displayFinish} · SKU ${item.sku}</p>
          <p class="cart-item-unit">${t('cart.each', { price: formatCurrency(item.price) })}</p>
        </div>
        <div class="cart-item-actions">
          <div class="qty-stepper" role="group" aria-label="${displayName}">
            <button type="button" class="qty-btn" data-action="dec" data-key="${item.key}" aria-label="${t('product.qtyDecAria')} ${displayName}">-</button>
            <span class="qty-val tabular-nums">${item.quantity}</span>
            <button type="button" class="qty-btn" data-action="inc" data-key="${item.key}" aria-label="${t('product.qtyIncAria')} ${displayName}">+</button>
          </div>
          <span class="cart-line-total tabular-nums">${formatCurrency(item.price * item.quantity)}</span>
          <button type="button" class="remove-item-btn" data-action="remove" data-key="${item.key}" aria-label="${t('cart.remove')} ${displayName}">
            ${t('cart.remove')}
          </button>
        </div>
      </article>
    `;
      })
      .join('');

    const subtotalEl = document.getElementById('summary-subtotal');
    const discountRow = document.getElementById('summary-discount-row');
    const discountEl = document.getElementById('summary-discount');
    const shippingEl = document.getElementById('summary-shipping');
    const taxEl = document.getElementById('summary-tax');
    const totalEl = document.getElementById('summary-total');
    const countEl = document.getElementById('cart-item-count-label');

    if (countEl) {
      countEl.textContent =
        totals.itemCount === 1
          ? t('cart.itemSingular')
          : t('cart.itemPlural', { n: totals.itemCount });
    }
    if (subtotalEl) subtotalEl.textContent = formatCurrency(totals.subtotal);
    if (discountRow && discountEl) {
      if (totals.discount > 0) {
        discountRow.hidden = false;
        discountEl.textContent = `-${formatCurrency(totals.discount)}`;
      } else {
        discountRow.hidden = true;
      }
    }
    if (shippingEl) {
      shippingEl.textContent =
        totals.shippingCost === 0 ? t('cart.shippingFree') : formatCurrency(totals.shippingCost);
    }
    if (taxEl) taxEl.textContent = formatCurrency(totals.tax);
    if (totalEl) totalEl.textContent = formatCurrency(totals.total);

    if (promoInput && promoCode && !promoInput.value) {
      promoInput.value = promoCode;
    }

    if (promoFeedback) {
      if (promoCode) {
        const res = validatePromoCode(promoCode, totals.subtotal);
        promoFeedback.textContent = res.message;
        promoFeedback.className = `promo-feedback ${res.valid ? 'is-success' : 'is-error'}`;
      } else {
        promoFeedback.textContent = '';
        promoFeedback.className = 'promo-feedback';
      }
    }

    if (typeof onAfterRender === 'function') onAfterRender(items);
  }

  itemsContainer.addEventListener('click', (event) => {
    const btn = event.target.closest('button[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    const key = btn.dataset.key;
    const items = loadCart();
    const target = items.find((item) => item.key === key);
    if (!target) return;

    if (action === 'inc') {
      updateCartQuantity(key, target.quantity + 1);
    } else if (action === 'dec') {
      updateCartQuantity(key, target.quantity - 1);
    } else if (action === 'remove') {
      removeFromCart(key);
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      clearCart();
    });
  }

  if (promoForm && promoInput && promoFeedback) {
    promoForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const items = loadCart();
      const totals = calculateCartTotals(items, loadShippingMethod(), '');
      const result = validatePromoCode(promoInput.value, totals.subtotal);
      if (result.valid) {
        saveAppliedPromo(result.code);
        promoFeedback.textContent = result.message;
        promoFeedback.className = 'promo-feedback is-success';
        renderCart();
      } else {
        saveAppliedPromo('');
        promoFeedback.textContent = result.message;
        promoFeedback.className = 'promo-feedback is-error';
        renderCart();
      }
    });
  }

  window.addEventListener('nova:cart-updated', renderCart);
  window.addEventListener('nova:lang-changed', renderCart);
  renderCart();
}

export { PRODUCTS };
