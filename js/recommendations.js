import { PRODUCTS, formatCurrency } from './products.js';
import { addToCart, loadCart, loadRecentlyViewed } from './cart.js';
import {
  t,
  tCategory,
  tMaterial,
  tProductDescription,
  tProductName,
  tStockStatus,
} from './i18n.js';

export function getRecommendations(
  products = PRODUCTS,
  { cartItems = [], recentlyViewedIds = [], currentProductId = '', excludeIds = [], limit = 3 } = {}
) {
  const excludedIds = new Set([...cartItems.map((item) => item.productId), ...excludeIds]);
  if (currentProductId) {
    excludedIds.add(currentProductId);
  }

  const preferredCategories = new Set();
  for (const item of cartItems) {
    if (item.category) preferredCategories.add(item.category);
  }
  for (const id of recentlyViewedIds) {
    const prod = products.find((p) => p.id === id);
    if (prod) preferredCategories.add(prod.category);
  }

  const currentProduct = currentProductId
    ? products.find((p) => p.id === currentProductId)
    : null;
  if (currentProduct) {
    preferredCategories.add(currentProduct.category);
  }

  const candidates = products.filter((p) => !excludedIds.has(p.id));
  const pool = candidates.length > 0 ? candidates : products.filter((p) => p.id !== currentProductId);

  const scored = [...pool].sort((a, b) => {
    const aCatMatch = preferredCategories.has(a.category) ? 1 : 0;
    const bCatMatch = preferredCategories.has(b.category) ? 1 : 0;
    if (aCatMatch !== bCatMatch) return bCatMatch - aCatMatch;
    if (a.rating !== b.rating) return b.rating - a.rating;
    return b.reviewCount - a.reviewCount;
  });

  return scored.slice(0, limit);
}

export function renderRecommendationsSection(container, { limit = 3, excludeIds = [], onInspect } = {}) {
  if (!container) return;

  const cartItems = loadCart();
  const recentlyViewedIds = loadRecentlyViewed();
  const picks = getRecommendations(PRODUCTS, {
    cartItems,
    recentlyViewedIds,
    excludeIds,
    limit,
  });

  if (picks.length === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = picks
    .map((product) => {
      const displayName = tProductName(product);
      const displayDesc = tProductDescription(product);
      const displayCat = tCategory(product.category);
      const displayMat = tMaterial(product.material);
      const displayStock = tStockStatus(product.stockStatus);
      return `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-media">
        <img src="${product.image}" alt="${displayName}" loading="lazy" referrerpolicy="no-referrer" />
        <div class="image-fallback" aria-hidden="true">
          <span>${displayCat}</span>
          <strong>${displayName}</strong>
        </div>
      </div>
      <div class="product-body">
        <div class="product-meta">
          <span>${displayCat} · ${displayMat}</span>
          <span class="product-status">${displayStock}</span>
        </div>
        <button type="button" class="product-title-btn" data-inspect-id="${product.id}">
          ${displayName}
        </button>
        <p class="product-summary">${displayDesc}</p>
        <div class="product-footer">
          <span class="product-price">${formatCurrency(product.price)}</span>
          <div class="product-actions">
            <button type="button" class="btn btn-secondary btn-sm" data-inspect-id="${product.id}">
              ${t('product.details')}
            </button>
            <button type="button" class="btn btn-primary btn-sm" data-add-id="${product.id}">
              ${t('product.addToBag')}
            </button>
          </div>
        </div>
      </div>
    </article>
  `;
    })
    .join('');

  container.querySelectorAll('img').forEach((img) => {
    img.addEventListener('error', () => {
      img.closest('.product-media')?.classList.add('is-fallback');
    });
  });

  container.onclick = (event) => {
    const addBtn = event.target.closest('button[data-add-id]');
    if (addBtn) {
      addToCart(addBtn.dataset.addId);
      return;
    }

    const inspectBtn = event.target.closest('button[data-inspect-id]');
    if (inspectBtn) {
      const id = inspectBtn.dataset.inspectId;
      if (typeof onInspect === 'function') {
        onInspect(id);
      } else {
        window.location.href = `shop.html?product=${encodeURIComponent(id)}`;
      }
    }
  };
}
