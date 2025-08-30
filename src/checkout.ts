import { catalog, Product } from "./product";
import type { PricingContext, PricingRule } from "./pricingRule";

export class Checkout {
    private items: string[] = [];
    private rules: PricingRule[] = [];

    constructor(rules: PricingRule[]) {
        this.rules = rules;
    }

    scan(sku: string) {
        if(!catalog[sku]) {
            throw new Error(`Invalid SKU: ${sku}`);
        }
        this.items.push(sku);
    }

    total(): number {
        let total = 0;
        for(const item of this.items) {
            if(catalog[item]) total += catalog[item].price;
            else throw new Error(`Invalid SKU: ${item}`);
        }
        const ctx: PricingContext = { items: this.items };
        for(const rule of this.rules) {
            total += rule.apply(ctx, catalog);
        }
        return parseFloat(total.toFixed(2));
    }
}