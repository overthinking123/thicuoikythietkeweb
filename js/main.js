import { PRODUCTS, formatCurrency, getProductById } from './products.js';
import {
  addToCart,
  calculateCartTotals,
  initCartPage,
  loadAppliedPromo,
  loadCart,
  loadShippingMethod,
  removeFromCart,
  updateCartQuantity,
} from './cart.js';
import { renderRecommendationsSection } from './recommendations.js';
import { bindImageFallbacks, createProductCardMarkup, initShopPage, openProductModal } from './search.js';
import { initCheckoutPage } from './checkout.js';
import {
  applyStaticTranslations,
  getLang,
  setLang,
  t,
  tFinish,
  tProductName,
} from './i18n.js';

function initLanguageSwitcher() {
  const select = document.getElementById('lang-switcher');
  const currentLang = getLang();
  applyStaticTranslations(currentLang);

  if (select) {
    select.value = currentLang;
    select.addEventListener('change', () => {
      const next = setLang(select.value);
      applyStaticTranslations(next);
    });
  }

  window.addEventListener('nova:lang-changed', (event) => {
    const lang = event.detail?.lang || getLang();
    if (select && select.value !== lang) {
      select.value = lang;
    }
    applyStaticTranslations(lang);
  });
}

function updateHeaderBagBadge() {
  const items = loadCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('[data-bag-count]').forEach((el) => {
    el.textContent = String(count);
  });
}

function initActiveNavigation() {
  const pageName = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href') || '';
    const isActive = href === pageName || (pageName === '' && href === 'index.html');
    link.classList.toggle('is-active', isActive);
  });
}

function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobilePanel = document.getElementById('mobile-nav-panel');
  if (!toggleBtn || !mobilePanel) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = mobilePanel.classList.toggle('is-open');
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

function initBagDrawer() {
  const drawer = document.getElementById('bag-drawer');
  const backdrop = document.getElementById('bag-drawer-backdrop');
  const openBtn = document.getElementById('header-bag-btn');
  const closeBtn = document.getElementById('close-bag-drawer');
  const bodyEl = document.getElementById('drawer-items-list');
  const subtotalEl = document.getElementById('drawer-subtotal');
  const checkoutLink = document.getElementById('drawer-checkout-link');

  if (!drawer || !backdrop || !openBtn) return;

  function renderDrawer() {
    const items = loadCart();
    const totals = calculateCartTotals(items, loadShippingMethod(), loadAppliedPromo());
    if (subtotalEl) subtotalEl.textContent = formatCurrency(totals.subtotal);
    if (checkoutLink) {
      checkoutLink.style.pointerEvents = items.length === 0 ? 'none' : 'auto';
      checkoutLink.style.opacity = items.length === 0 ? '0.5' : '1';
    }

    if (!bodyEl) return;
    if (items.length === 0) {
      bodyEl.innerHTML = `
        <div class="empty-state">
          <h2>${t('drawer.emptyTitle')}</h2>
          <p>${t('drawer.emptyDesc')}</p>
          <a href="shop.html" class="btn btn-primary btn-sm">${t('drawer.browseCta')}</a>
        </div>
      `;
      return;
    }

    bodyEl.innerHTML = items
      .map((item) => {
        const prod = getProductById(item.productId) || item;
        const displayName = tProductName(prod);
        const displayFinish = tFinish(item.finish);
        return `
      <div class="drawer-item" data-cart-key="${item.key}">
        <img class="drawer-item-img" src="${item.image}" alt="${displayName}" referrerpolicy="no-referrer" />
        <div class="drawer-item-info">
          <p class="drawer-item-name">${displayName}</p>
          <p class="drawer-item-meta">${displayFinish} · ${formatCurrency(item.price)}</p>
          <div class="drawer-item-controls">
            <div class="qty-stepper" role="group" aria-label="${displayName}">
              <button type="button" class="qty-btn" data-drawer-action="dec" data-key="${item.key}" aria-label="${t('product.qtyDecAria')} ${displayName}">-</button>
              <span class="qty-val tabular-nums">${item.quantity}</span>
              <button type="button" class="qty-btn" data-drawer-action="inc" data-key="${item.key}" aria-label="${t('product.qtyIncAria')} ${displayName}">+</button>
            </div>
            <button type="button" class="remove-item-btn" data-drawer-action="remove" data-key="${item.key}" aria-label="${t('cart.remove')} ${displayName}">
              ${t('cart.remove')}
            </button>
          </div>
        </div>
      </div>
    `;
      })
      .join('');
  }

  function openDrawer() {
    renderDrawer();
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    closeBtn?.focus();
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
  }

  openBtn.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  bodyEl?.addEventListener('click', (event) => {
    const btn = event.target.closest('button[data-drawer-action]');
    if (!btn) return;
    const key = btn.dataset.key;
    const action = btn.dataset.drawerAction;
    const items = loadCart();
    const target = items.find((i) => i.key === key);
    if (!target) return;

    if (action === 'inc') {
      updateCartQuantity(key, target.quantity + 1);
    } else if (action === 'dec') {
      updateCartQuantity(key, target.quantity - 1);
    } else if (action === 'remove') {
      removeFromCart(key);
    }
  });

  window.addEventListener('nova:cart-updated', renderDrawer);
  window.addEventListener('nova:lang-changed', renderDrawer);
  renderDrawer();
}

function initToastListener() {
  const toastEl = document.getElementById('toast-banner');
  if (!toastEl) return;

  let hideTimer = null;
  window.addEventListener('nova:toast', (event) => {
    const message = event.detail?.message || '';
    if (!message) return;
    toastEl.textContent = message;
    toastEl.classList.add('is-visible');
    if (hideTimer) window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => {
      toastEl.classList.remove('is-visible');
    }, 2600);
  });
}

function initHomePage() {
  const featuredGrid = document.getElementById('home-featured-grid');
  const recGrid = document.getElementById('home-recommendations-grid');
  const heroMedia = document.querySelector('.hero-media');

  if (heroMedia) {
    bindImageFallbacks(heroMedia);
  }

  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 3);
  const featuredIds = featuredProducts.map((p) => p.id);

  if (featuredGrid) {
    const renderFeatured = () => {
      featuredGrid.innerHTML = featuredProducts.map(createProductCardMarkup).join('');
      bindImageFallbacks(featuredGrid);
    };
    renderFeatured();
    window.addEventListener('nova:lang-changed', renderFeatured);

    featuredGrid.addEventListener('click', (event) => {
      const addBtn = event.target.closest('button[data-add-id]');
      if (addBtn) {
        addToCart(addBtn.dataset.addId);
        return;
      }
      const inspectBtn = event.target.closest('button[data-inspect-id]');
      if (inspectBtn) {
        openProductModal(inspectBtn.dataset.inspectId);
      }
    });
  }

  if (recGrid) {
    const refreshHomeRecs = () =>
      renderRecommendationsSection(recGrid, {
        limit: 3,
        excludeIds: featuredIds,
        onInspect: (id) => openProductModal(id),
      });
    refreshHomeRecs();
    window.addEventListener('nova:cart-updated', refreshHomeRecs);
    window.addEventListener('nova:lang-changed', refreshHomeRecs);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  initActiveNavigation();
  initMobileMenu();
  initBagDrawer();
  initToastListener();
  updateHeaderBagBadge();

  window.addEventListener('nova:cart-updated', updateHeaderBagBadge);

  const pageId = document.body.dataset.page;
  if (pageId === 'home') {
    initHomePage();
  } else if (pageId === 'shop') {
    initShopPage();
  } else if (pageId === 'cart') {
    const cartRecGrid = document.getElementById('cart-recommendations-grid');
    initCartPage({
      onAfterRender: () => {
        if (cartRecGrid) {
          renderRecommendationsSection(cartRecGrid, { limit: 3 });
        }
      },
    });
  } else if (pageId === 'checkout') {
    initCheckoutPage();
  }
});
