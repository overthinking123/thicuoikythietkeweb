import test from 'node:test';
import assert from 'node:assert/strict';

import { PRODUCTS } from '../js/products.js';
import {
  addItemToList,
  calculateCartTotals,
  removeItemFromList,
  updateItemQuantityInList,
  validatePromoCode,
} from '../js/cart.js';
import { filterAndSortProducts } from '../js/search.js';
import { getRecommendations } from '../js/recommendations.js';
import { validateCheckoutForm } from '../js/checkout.js';
import { getLang, t, tCategory, tProductName } from '../js/i18n.js';

test('filterAndSortProducts filters by category, query, and price ceiling', () => {
  const lamps = filterAndSortProducts(PRODUCTS, { query: 'lamp', category: 'Lighting' });
  assert.equal(lamps.length, 1);
  assert.equal(lamps[0].id, 'arc-desk-lamp');

  const under150 = filterAndSortProducts(PRODUCTS, { maxPrice: 150, sortBy: 'price-asc' });
  assert.equal(under150.length, 2);
  assert.equal(under150[0].id, 'modular-desk-dock');
  assert.equal(under150[1].id, 'chrono-desk-clock');
});

test('cart item mutations add, merge variants, update, and remove cleanly', () => {
  let cart = addItemToList([], 'chrono-desk-clock', 'Slate Dial', 1);
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 1);

  cart = addItemToList(cart, 'chrono-desk-clock', 'Slate Dial', 2);
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 3);

  cart = addItemToList(cart, 'chrono-desk-clock', 'Chalk White Dial', 1);
  assert.equal(cart.length, 2);

  cart = updateItemQuantityInList(cart, cart[0].key, 0);
  assert.equal(cart.length, 1);

  cart = removeItemFromList(cart, cart[0].key);
  assert.equal(cart.length, 0);
});

test('calculateCartTotals applies free shipping threshold, promo discounts, and 8% tax', () => {
  const smallCart = addItemToList([], 'modular-desk-dock', 'Slate Gray', 1); // $115
  const smallTotals = calculateCartTotals(smallCart, 'standard', '');
  assert.equal(smallTotals.subtotal, 115);
  assert.equal(smallTotals.shippingCost, 12);
  assert.equal(smallTotals.freeShippingRemaining, 35);
  assert.equal(smallTotals.tax, 9.2);
  assert.equal(smallTotals.total, 136.2);

  const largeCart = addItemToList([], 'monolith-speaker', 'Matte Charcoal', 1); // $280
  const promoTotals = calculateCartTotals(largeCart, 'standard', 'NOVA10');
  assert.equal(promoTotals.discount, 28);
  assert.equal(promoTotals.shippingCost, 0);
  assert.equal(promoTotals.tax, 20.16);
  assert.equal(promoTotals.total, 272.16);

  const invalidPromo = validatePromoCode('BADCODE', 200);
  assert.equal(invalidPromo.valid, false);
});

test('getRecommendations excludes cart items and favors matching categories', () => {
  const cart = addItemToList([], 'arc-desk-lamp', 'Obsidian / Silver', 1);
  const recs = getRecommendations(PRODUCTS, { cartItems: cart, limit: 3 });
  assert.equal(recs.length, 3);
  assert.ok(recs.every((p) => p.id !== 'arc-desk-lamp'));
  assert.equal(recs[0].category, 'Lighting');
});

test('validateCheckoutForm rejects empty fields and validates card conditionally', () => {
  const emptyResult = validateCheckoutForm({
    fullName: '',
    email: 'invalid',
    phone: '123',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });
  assert.equal(emptyResult.valid, false);
  assert.ok(emptyResult.errors.fullName);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.cardNumber);

  const validCod = validateCheckoutForm({
    fullName: 'Minh Nguyen',
    email: 'minh@example.com',
    phone: '0901234567',
    address: '42 Nguyen Hue Blvd',
    city: 'Ho Chi Minh City',
    postalCode: '700000',
    country: 'Vietnam',
    paymentMethod: 'cod',
  });
  assert.equal(validCod.valid, true);
});

test('i18n defaults to Vietnamese and resolves both vi and en labels cleanly', () => {
  assert.equal(getLang(), 'vi');
  assert.equal(tCategory('Audio', 'vi'), 'Âm thanh');
  assert.equal(tCategory('Audio', 'en'), 'Audio');
  assert.equal(tProductName(PRODUCTS[0], 'vi'), 'Loa không dây Monolith M1');
  assert.equal(tProductName(PRODUCTS[0], 'en'), 'Monolith M1 Wireless Speaker');
  assert.equal(t('nav.cart', {}, 'vi'), 'Giỏ hàng');
  assert.equal(t('nav.cart', {}, 'en'), 'Cart');
});
