import { Checkout } from "../src/checkout";
import { ThreeForTwoRule } from "../src/rules/threeForTwo";
import { BulkDiscountRule } from "../src/rules/bulkDiscount";

const pricingRules = [
  new ThreeForTwoRule("atv"),
  new BulkDiscountRule("ipd", 4, 499.99),
];

test("3 Apple TVs + 1 VGA", () => {
  const co = new Checkout(pricingRules);
  ["atv", "atv", "atv", "vga"].forEach(sku => co.scan(sku));
  expect(co.total()).toBe(249.00);
});

test("Bulk discount on iPads", () => {
  const co = new Checkout(pricingRules);
  ["atv", "ipd", "ipd", "atv", "ipd", "ipd", "ipd"].forEach(sku => co.scan(sku));
  expect(co.total()).toBe(2718.95);
});

test("No discount if buying less than 3 Apple TVs", () => {
  const co = new Checkout(pricingRules);
  ["atv", "atv"].forEach(sku => co.scan(sku));
  expect(co.total()).toBe(219.00); // 2 * 109.50
});

test("6 Apple TVs should give 2 free (pay for 4)", () => {
  const co = new Checkout(pricingRules);
  ["atv", "atv", "atv", "atv", "atv", "atv"].forEach(sku => co.scan(sku));
  expect(co.total()).toBe(438.00); // 6 * 109.5 - 2*109.5
});

test("Exactly 4 iPads should be full price", () => {
  const co = new Checkout(pricingRules);
  ["ipd", "ipd", "ipd", "ipd"].forEach(sku => co.scan(sku));
  expect(co.total()).toBe(2199.96); // 4 * 549.99
});

test("5 iPads should apply bulk discount", () => {
  const co = new Checkout(pricingRules);
  ["ipd", "ipd", "ipd", "ipd", "ipd"].forEach(sku => co.scan(sku));
  expect(co.total()).toBe(2499.95); // 5 * 499.99
});

test("Mixed basket: 3 Apple TVs (3-for-2) + 5 iPads (bulk discount)", () => {
  const co = new Checkout(pricingRules);
  ["atv", "atv", "atv", "ipd", "ipd", "ipd", "ipd", "ipd"].forEach(sku => co.scan(sku));
  expect(co.total()).toBe(2718.95); 
  // Apple TVs => pay for 2 = 219.00
  // iPads => 5 * 499.99 = 2499.95
  // Total = 2718.95
});

test("Throws error for invalid SKU", () => {
  const co = new Checkout(pricingRules);
  expect(() => co.scan("xyz")).toThrow("Invalid SKU: xyz");
});