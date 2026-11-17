import { SHIPPING_METHODS, formatCurrency, getProductById } from './products.js';
import {
  calculateCartTotals,
  clearCart,
  loadAppliedPromo,
  loadCart,
  loadLastOrder,
  loadShippingMethod,
  saveLastOrder,
  saveShippingMethod,
} from './cart.js';
import {
  getLang,
  t,
  tCountry,
  tFinish,
  tPaymentLabel,
  tProductName,
  tShippingLabel,
} from './i18n.js';

export function validateCheckoutForm(data) {
  const errors = {};
  const clean = (val) => String(val || '').trim();

  if (clean(data.fullName).length < 2) {
    errors.fullName = t('err.fullName');
  }

  const email = clean(data.email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = t('err.email');
  }

  const phoneDigits = clean(data.phone).replace(/\D/g, '');
  if (phoneDigits.length < 8) {
    errors.phone = t('err.phone');
  }

  if (clean(data.address).length < 5) {
    errors.address = t('err.address');
  }

  if (clean(data.city).length < 2) {
    errors.city = t('err.city');
  }

  if (clean(data.postalCode).length < 3) {
    errors.postalCode = t('err.postalCode');
  }

  if (clean(data.country).length < 2) {
    errors.country = t('err.country');
  }

  if (data.paymentMethod === 'card') {
    const cardDigits = clean(data.cardNumber).replace(/\s+/g, '');
    if (!/^\d{13,19}$/.test(cardDigits)) {
      errors.cardNumber = t('err.cardNumber');
    }

    const expiry = clean(data.cardExpiry);
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      errors.cardExpiry = t('err.cardExpiry');
    }

    const cvc = clean(data.cardCvc);
    if (!/^\d{3,4}$/.test(cvc)) {
      errors.cardCvc = t('err.cardCvc');
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildOrderReceipt({
  orderId,
  createdAt,
  customer,
  shippingMethodId,
  paymentMethod,
  totals,
  items,
}) {
  const shippingInfo = SHIPPING_METHODS[shippingMethodId] || SHIPPING_METHODS.standard;
  const paymentLabels = {
    card: 'Credit / Debit Card',
    cod: 'Cash on Delivery (COD)',
    bank: 'Direct Bank Transfer',
  };

  return {
    orderId: orderId || `NV-${Math.floor(10000 + Math.random() * 89999)}`,
    createdAt: createdAt || new Date().toISOString(),
    customer: {
      fullName: customer.fullName.trim(),
      email: customer.email.trim(),
      phone: customer.phone.trim(),
      address: customer.address.trim(),
      city: customer.city.trim(),
      postalCode: customer.postalCode.trim(),
      country: customer.country.trim(),
    },
    shippingMethodId: shippingInfo.id,
    paymentMethodId: paymentMethod || 'card',
    shippingMethodLabel: tShippingLabel(shippingInfo.id),
    paymentMethodLabel: paymentLabels[paymentMethod] || paymentLabels.card,
    totals,
    items: items.map((item) => ({
      productId: item.productId,
      name: item.name,
      finish: item.finish,
      sku: item.sku,
      quantity: item.quantity,
      unitPrice: item.price,
      lineTotal: Number((item.price * item.quantity).toFixed(2)),
    })),
  };
}

export function initCheckoutPage() {
  const form = document.getElementById('checkout-form');
  const checkoutLayout = document.getElementById('checkout-layout');
  const emptyNotice = document.getElementById('checkout-empty-state');
  const confirmationSection = document.getElementById('order-confirmation-section');
  const cardFieldsPanel = document.getElementById('card-fields-panel');
  const codNote = document.getElementById('cod-payment-note');
  const bankNote = document.getElementById('bank-payment-note');

  if (!form || !checkoutLayout) return;

  let activeReceipt = null;

  function renderOrderConfirmation(receipt) {
    activeReceipt = receipt;
    checkoutLayout.hidden = true;
    if (emptyNotice) emptyNotice.hidden = true;
    const backLink = document.getElementById('checkout-back-link');
    if (backLink) backLink.hidden = true;
    if (!confirmationSection) return;
    confirmationSection.hidden = false;

    const lang = getLang();
    const locale = lang === 'vi' ? 'vi-VN' : 'en-US';
    const orderDate = new Date(receipt.createdAt).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    const shipLabel = receipt.shippingMethodId
      ? tShippingLabel(receipt.shippingMethodId, lang)
      : receipt.shippingMethodLabel;
    const payLabel = receipt.paymentMethodId
      ? tPaymentLabel(receipt.paymentMethodId, lang)
      : receipt.paymentMethodLabel;

    confirmationSection.innerHTML = `
      <div class="surface-card confirmation-card">
        <p class="confirmation-status">${t('confirm.status')}</p>
        <h2 class="confirmation-title">${t('confirm.thankYou', { name: receipt.customer.fullName })}</h2>
        <p class="page-subtitle">
          ${t('confirm.subtitle', { orderId: receipt.orderId, email: receipt.customer.email })}
        </p>

        <dl class="confirmation-meta">
          <div>
            <dt>${t('confirm.ref')}</dt>
            <dd class="tabular-nums">#${receipt.orderId}</dd>
          </div>
          <div>
            <dt>${t('confirm.date')}</dt>
            <dd>${orderDate}</dd>
          </div>
          <div>
            <dt>${t('confirm.address')}</dt>
            <dd>${receipt.customer.address}, ${receipt.customer.city} ${receipt.customer.postalCode}, ${tCountry(receipt.customer.country, lang)}</dd>
          </div>
          <div>
            <dt>${t('confirm.shipPay')}</dt>
            <dd>${shipLabel} · ${payLabel}</dd>
          </div>
        </dl>

        <div class="checkout-items-mini">
          ${receipt.items
            .map((item) => {
              const prod = item.productId ? getProductById(item.productId) : null;
              const itemName = prod ? tProductName(prod, lang) : item.name;
              const itemFinish = tFinish(item.finish, lang);
              return `
            <div class="checkout-mini-row">
              <span>
                <span class="checkout-mini-name">${itemName} &times; ${item.quantity}</span>
                <span class="checkout-mini-meta">${itemFinish} · SKU ${item.sku}</span>
              </span>
              <span class="checkout-mini-price">${formatCurrency(item.lineTotal)}</span>
            </div>
          `;
            })
            .join('')}
        </div>

        <div class="summary-rows">
          <div class="summary-row">
            <span>${t('cart.subtotal')}</span>
            <strong>${formatCurrency(receipt.totals.subtotal)}</strong>
          </div>
          ${
            receipt.totals.discount > 0
              ? `
            <div class="summary-row summary-row--discount">
              <span>${t('confirm.discount', { code: receipt.totals.discountCode })}</span>
              <strong>-${formatCurrency(receipt.totals.discount)}</strong>
            </div>
          `
              : ''
          }
          <div class="summary-row">
            <span>${t('cart.shipping')}</span>
            <strong>${receipt.totals.shippingCost === 0 ? t('cart.shippingFree') : formatCurrency(receipt.totals.shippingCost)}</strong>
          </div>
          <div class="summary-row">
            <span>${t('cart.tax')}</span>
            <strong>${formatCurrency(receipt.totals.tax)}</strong>
          </div>
        </div>

        <div class="summary-total-row">
          <span>${t('confirm.totalPaid')}</span>
          <span>${formatCurrency(receipt.totals.total)}</span>
        </div>

        <div class="hero-actions">
          <a href="shop.html" class="btn btn-primary">${t('confirm.continue')}</a>
          <a href="index.html" class="btn btn-secondary">${t('confirm.home')}</a>
        </div>
      </div>
    `;
  }

  function renderSummary() {
    if (activeReceipt) {
      renderOrderConfirmation(activeReceipt);
      return;
    }

    const items = loadCart();
    if (items.length === 0) {
      const params = new URLSearchParams(window.location.search);
      const lastOrder = loadLastOrder();
      if (params.get('confirmed') === '1' && lastOrder) {
        renderOrderConfirmation(lastOrder);
        return;
      }
      checkoutLayout.hidden = true;
      if (emptyNotice) emptyNotice.hidden = false;
      return;
    }

    checkoutLayout.hidden = false;
    if (emptyNotice) emptyNotice.hidden = true;
    if (confirmationSection) confirmationSection.hidden = true;

    const shippingMethod = loadShippingMethod();
    const promoCode = loadAppliedPromo();
    const totals = calculateCartTotals(items, shippingMethod, promoCode);

    const shippingRadio = form.querySelector(`input[name="shippingMethod"][value="${shippingMethod}"]`);
    if (shippingRadio) shippingRadio.checked = true;

    const standardPriceEl = document.getElementById('standard-shipping-price');
    if (standardPriceEl) {
      const discountedSubtotal = Math.max(0, totals.subtotal - totals.discount);
      standardPriceEl.textContent =
        discountedSubtotal >= 150 ? t('cart.shippingFree') : formatCurrency(SHIPPING_METHODS.standard.baseCost);
    }

    const miniItemsEl = document.getElementById('checkout-items-mini');
    if (miniItemsEl) {
      miniItemsEl.innerHTML = items
        .map((item) => {
          const prod = getProductById(item.productId) || item;
          return `
        <div class="checkout-mini-row">
          <span>
            <span class="checkout-mini-name">${tProductName(prod)} &times; ${item.quantity}</span>
            <span class="checkout-mini-meta">${tFinish(item.finish)}</span>
          </span>
          <span class="checkout-mini-price">${formatCurrency(item.price * item.quantity)}</span>
        </div>
      `;
        })
        .join('');
    }

    const subtotalEl = document.getElementById('checkout-subtotal');
    const discountRow = document.getElementById('checkout-discount-row');
    const discountEl = document.getElementById('checkout-discount');
    const shippingEl = document.getElementById('checkout-shipping');
    const taxEl = document.getElementById('checkout-tax');
    const totalEl = document.getElementById('checkout-total');

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
  }

  function syncPaymentUI() {
    const selected = form.querySelector('input[name="paymentMethod"]:checked')?.value || 'card';
    if (cardFieldsPanel) cardFieldsPanel.hidden = selected !== 'card';
    if (codNote) codNote.hidden = selected !== 'cod';
    if (bankNote) bankNote.hidden = selected !== 'bank';
  }

  function clearErrors() {
    form.querySelectorAll('.form-input').forEach((input) => {
      input.removeAttribute('aria-invalid');
    });
    form.querySelectorAll('.field-error').forEach((el) => {
      el.textContent = '';
    });
  }

  function showErrors(errors) {
    Object.entries(errors).forEach(([fieldName, message]) => {
      const input = form.querySelector(`[name="${fieldName}"]`);
      const errorEl = document.getElementById(`error-${fieldName}`);
      if (input) input.setAttribute('aria-invalid', 'true');
      if (errorEl) errorEl.textContent = message;
    });

    const firstInvalid = form.querySelector('[aria-invalid="true"]');
    if (firstInvalid) firstInvalid.focus();
  }

  form.querySelectorAll('input[name="shippingMethod"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      saveShippingMethod(radio.value);
      renderSummary();
    });
  });

  form.querySelectorAll('input[name="paymentMethod"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      clearErrors();
      syncPaymentUI();
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors();

    const items = loadCart();
    if (items.length === 0) {
      renderSummary();
      return;
    }

    const formData = new FormData(form);
    const payload = {
      fullName: formData.get('fullName') || '',
      email: formData.get('email') || '',
      phone: formData.get('phone') || '',
      address: formData.get('address') || '',
      city: formData.get('city') || '',
      postalCode: formData.get('postalCode') || '',
      country: formData.get('country') || '',
      shippingMethod: formData.get('shippingMethod') || 'standard',
      paymentMethod: formData.get('paymentMethod') || 'card',
      cardNumber: formData.get('cardNumber') || '',
      cardExpiry: formData.get('cardExpiry') || '',
      cardCvc: formData.get('cardCvc') || '',
    };

    const validation = validateCheckoutForm(payload);
    if (!validation.valid) {
      showErrors(validation.errors);
      return;
    }

    const totals = calculateCartTotals(items, payload.shippingMethod, loadAppliedPromo());
    const receipt = buildOrderReceipt({
      customer: payload,
      shippingMethodId: payload.shippingMethod,
      paymentMethod: payload.paymentMethod,
      totals,
      items,
    });

    saveLastOrder(receipt);
    clearCart();
    renderOrderConfirmation(receipt);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('nova:cart-updated', renderSummary);
  window.addEventListener('nova:lang-changed', () => {
    renderSummary();
    form.querySelectorAll('.form-input[aria-invalid="true"]').forEach((input) => {
      const errorEl = document.getElementById(`error-${input.name}`);
      if (errorEl) {
        errorEl.textContent = t(`err.${input.name}`);
      }
    });
  });
  syncPaymentUI();
  renderSummary();
}
