import { CATEGORIES, PRODUCTS, formatCurrency, getProductById } from './products.js';
import { addToCart, loadCart, recordRecentlyViewed } from './cart.js';
import { getRecommendations } from './recommendations.js';
import {
  t,
  tCategory,
  tFinish,
  tMaterial,
  tProductDescription,
  tProductName,
  tProductSpecKey,
  tProductSpecValue,
  tStockStatus,
} from './i18n.js';

export function filterAndSortProducts(
  products = PRODUCTS,
  { query = '', category = 'All', maxPrice = Infinity, sortBy = 'featured' } = {}
) {
  const cleanQuery = String(query || '').trim().toLowerCase();
  const numericMax = Number(maxPrice);
  const priceCap = Number.isFinite(numericMax) && numericMax > 0 ? numericMax : Infinity;

  const filtered = products.filter((product) => {
    if (category && category !== 'All' && product.category !== category) {
      return false;
    }
    if (product.price > priceCap) {
      return false;
    }
    if (cleanQuery) {
      const haystack = [
        product.name,
        tProductName(product, 'vi'),
        product.category,
        tCategory(product.category, 'vi'),
        product.material,
        tMaterial(product.material, 'vi'),
        product.sku,
        product.description,
        tProductDescription(product, 'vi'),
        ...(product.finishes || []),
        ...(product.finishes || []).map((f) => tFinish(f, 'vi')),
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(cleanQuery)) {
        return false;
      }
    }
    return true;
  });

  const sorted = [...filtered];
  if (sortBy === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
  } else {
    sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }

  return sorted;
}

export function createProductCardMarkup(product) {
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
}

export function bindImageFallbacks(root) {
  if (!root) return;
  root.querySelectorAll('img').forEach((img) => {
    img.addEventListener('error', () => {
      img.closest('.product-media, .hero-media, .modal-media')?.classList.add('is-fallback');
    });
  });
}

export function openProductModal(productId, initialFinish, initialQty) {
  const dialog = document.getElementById('product-detail-dialog');
  const product = getProductById(productId);
  if (!dialog || !product) return;

  recordRecentlyViewed(product.id);
  let selectedFinish = initialFinish && product.finishes.includes(initialFinish) ? initialFinish : product.finishes[0];
  let selectedQty = Math.max(1, Number(initialQty) || 1);

  const related = getRecommendations(PRODUCTS, {
    cartItems: loadCart(),
    currentProductId: product.id,
    limit: 3,
  });

  const specEntries = Object.entries(product.specs || {});
  const displayName = tProductName(product);
  const displayDesc = tProductDescription(product);
  const displayCat = tCategory(product.category);

  dialog.dataset.activeProductId = product.id;

  dialog.innerHTML = `
    <div class="modal-layout">
      <div class="modal-media">
        <img src="${product.image}" alt="${displayName}" referrerpolicy="no-referrer" />
        <div class="image-fallback" aria-hidden="true">
          <span>${displayCat}</span>
          <strong>${displayName}</strong>
        </div>
      </div>
      <div class="modal-content">
        <div class="modal-top">
          <div>
            <p class="section-kicker">${displayCat} · ${product.sku}</p>
            <h2 class="modal-title">${displayName}</h2>
          </div>
          <button type="button" class="drawer-close" id="close-product-dialog" aria-label="${t('product.closeModalAria')}">
            &times;
          </button>
        </div>
        <p class="modal-price">${formatCurrency(product.price)}</p>
        <p class="modal-desc">${displayDesc}</p>
        <div class="finish-group">
          <span class="finish-label">${t('product.finishLabel')} <strong id="selected-finish-label">${tFinish(selectedFinish)}</strong></span>
          <div class="finish-options" role="group" aria-label="${t('product.finishLabel')}">
            ${product.finishes
              .map(
                (finish) => `
              <button
                type="button"
                class="finish-btn ${finish === selectedFinish ? 'is-selected' : ''}"
                data-finish="${finish}"
              >${tFinish(finish)}</button>
            `
              )
              .join('')}
          </div>
        </div>
        <dl class="modal-specs">
          ${specEntries
            .map(
              ([label, value]) => `
            <div class="modal-spec-item">
              <dt>${tProductSpecKey(label)}</dt>
              <dd>${tProductSpecValue(product.id, label, value)}</dd>
            </div>
          `
            )
            .join('')}
        </dl>
        <div class="modal-buy-row">
          <div class="qty-stepper" role="group" aria-label="${displayName}">
            <button type="button" class="qty-btn" id="modal-qty-dec" aria-label="${t('product.qtyDecAria')}">-</button>
            <span class="qty-val tabular-nums" id="modal-qty-val">${selectedQty}</span>
            <button type="button" class="qty-btn" id="modal-qty-inc" aria-label="${t('product.qtyIncAria')}">+</button>
          </div>
          <button type="button" class="btn btn-primary" id="modal-add-to-bag">
            ${t('product.addToBag')} · ${formatCurrency(product.price * selectedQty)}
          </button>
        </div>
      </div>
    </div>
    ${
      related.length > 0
        ? `
      <div class="modal-related">
        <p class="modal-related-title">${t('product.relatedTitle')}</p>
        <div class="modal-related-grid">
          ${related
            .map(
              (rel) => `
            <button type="button" class="mini-rec-card" data-related-id="${rel.id}">
              <img src="${rel.image}" alt="${tProductName(rel)}" referrerpolicy="no-referrer" />
              <span>
                <span class="mini-rec-name">${tProductName(rel)}</span>
                <span class="mini-rec-price">${formatCurrency(rel.price)}</span>
              </span>
            </button>
          `
            )
            .join('')}
        </div>
      </div>
    `
        : ''
    }
  `;

  bindImageFallbacks(dialog);

  const closeBtn = dialog.querySelector('#close-product-dialog');
  const qtyVal = dialog.querySelector('#modal-qty-val');
  const addBtn = dialog.querySelector('#modal-add-to-bag');
  const finishLabel = dialog.querySelector('#selected-finish-label');

  closeBtn?.addEventListener('click', () => dialog.close());

  dialog.querySelectorAll('.finish-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedFinish = btn.dataset.finish;
      if (finishLabel) finishLabel.textContent = tFinish(selectedFinish);
      dialog.querySelectorAll('.finish-btn').forEach((other) => {
        other.classList.toggle('is-selected', other === btn);
      });
    });
  });

  dialog.querySelector('#modal-qty-dec')?.addEventListener('click', () => {
    selectedQty = Math.max(1, selectedQty - 1);
    if (qtyVal) qtyVal.textContent = String(selectedQty);
    if (addBtn) addBtn.textContent = `${t('product.addToBag')} · ${formatCurrency(product.price * selectedQty)}`;
  });

  dialog.querySelector('#modal-qty-inc')?.addEventListener('click', () => {
    selectedQty += 1;
    if (qtyVal) qtyVal.textContent = String(selectedQty);
    if (addBtn) addBtn.textContent = `${t('product.addToBag')} · ${formatCurrency(product.price * selectedQty)}`;
  });

  addBtn?.addEventListener('click', () => {
    addToCart(product.id, selectedFinish, selectedQty);
    dialog.close();
  });

  dialog.querySelectorAll('[data-related-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openProductModal(btn.dataset.relatedId);
    });
  });

  dialog.onclick = (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  };

  if (!dialog.open) {
    dialog.showModal();
  }
}

export function initShopPage() {
  const grid = document.getElementById('shop-product-grid');
  const emptyState = document.getElementById('shop-empty-state');
  const categoryContainer = document.getElementById('category-filter-tabs');
  const searchInput = document.getElementById('shop-search-input');
  const searchClearBtn = document.getElementById('shop-search-clear');
  const sortSelect = document.getElementById('shop-sort-select');
  const priceSelect = document.getElementById('shop-price-select');
  const countEl = document.getElementById('shop-result-count');
  const resetBtn = document.getElementById('reset-filters-btn');

  if (!grid || !categoryContainer) return;

  const params = new URLSearchParams(window.location.search);
  const state = {
    query: params.get('q') || '',
    category: CATEGORIES.includes(params.get('category')) ? params.get('category') : 'All',
    maxPrice: Infinity,
    sortBy: 'featured',
  };

  function renderCategoryTabs() {
    categoryContainer.innerHTML = CATEGORIES.map(
      (cat) => `
      <button
        type="button"
        class="filter-tab ${state.category === cat ? 'is-active' : ''}"
        data-category="${cat}"
        aria-pressed="${state.category === cat ? 'true' : 'false'}"
      >${tCategory(cat)}</button>
    `
    ).join('');
  }

  renderCategoryTabs();

  if (searchInput && state.query) {
    searchInput.value = state.query;
  }

  function renderCatalog() {
    const results = filterAndSortProducts(PRODUCTS, state);
    if (countEl) {
      countEl.textContent =
        results.length === 1 ? t('shop.countSingular') : t('shop.countPlural', { n: results.length });
    }

    if (searchClearBtn) {
      searchClearBtn.classList.toggle('is-visible', Boolean(state.query));
    }

    if (results.length === 0) {
      grid.innerHTML = '';
      grid.hidden = true;
      if (emptyState) emptyState.hidden = false;
      return;
    }

    grid.hidden = false;
    if (emptyState) emptyState.hidden = true;
    grid.innerHTML = results.map(createProductCardMarkup).join('');
    bindImageFallbacks(grid);
  }

  categoryContainer.addEventListener('click', (event) => {
    const btn = event.target.closest('button[data-category]');
    if (!btn) return;
    state.category = btn.dataset.category;
    categoryContainer.querySelectorAll('.filter-tab').forEach((tab) => {
      const active = tab.dataset.category === state.category;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    renderCatalog();
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      state.query = searchInput.value;
      renderCatalog();
    });
  }

  if (searchClearBtn && searchInput) {
    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      state.query = '';
      searchInput.focus();
      renderCatalog();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      state.sortBy = sortSelect.value;
      renderCatalog();
    });
  }

  if (priceSelect) {
    priceSelect.addEventListener('change', () => {
      state.maxPrice = priceSelect.value === 'all' ? Infinity : Number(priceSelect.value);
      renderCatalog();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      state.query = '';
      state.category = 'All';
      state.maxPrice = Infinity;
      state.sortBy = 'featured';
      if (searchInput) searchInput.value = '';
      if (sortSelect) sortSelect.value = 'featured';
      if (priceSelect) priceSelect.value = 'all';
      categoryContainer.querySelectorAll('.filter-tab').forEach((tab) => {
        const active = tab.dataset.category === 'All';
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      renderCatalog();
    });
  }

  grid.addEventListener('click', (event) => {
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

  renderCatalog();

  window.addEventListener('nova:lang-changed', () => {
    renderCategoryTabs();
    renderCatalog();
  });

  const initialProductId = params.get('product');
  if (initialProductId && getProductById(initialProductId)) {
    openProductModal(initialProductId);
  }
}
