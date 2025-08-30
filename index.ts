import { Checkout } from "./src/checkout";
import { ThreeForTwoRule } from "./src/rules/threeForTwo";
import { BulkDiscountRule } from "./src/rules/bulkDiscount";

const pricingRules = [
    new ThreeForTwoRule('atv'),
    new BulkDiscountRule('ipd', 4, 499.99)
];

// Example Scenario 1

const checkout = new Checkout(pricingRules);

checkout.scan('atv');
checkout.scan('atv');
checkout.scan('atv');
checkout.scan('vga');

console.log(`Total Price Example Scenario 1 to be $249.00 and got:$`,checkout.total());

// Example Scenario 2

const checkout2 = new Checkout(pricingRules);

checkout2.scan('atv');
checkout2.scan('ipd');
checkout2.scan('ipd');
checkout2.scan('atv');
checkout2.scan('ipd');
checkout2.scan('ipd');
checkout2.scan('ipd');

console.log(`Total Price Example Scenario 2 to be $2718.95 and got:$`,checkout2.total());



