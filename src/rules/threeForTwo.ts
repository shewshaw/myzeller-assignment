import type { Product } from "../product";
import type { PricingContext, PricingRule } from "../pricingRule";

export class ThreeForTwoRule implements PricingRule {
    constructor(private sku: string) {}

    apply(ctx: PricingContext, catalog: Record<string, Product>): number {
        let count = 0;
        for(const item of ctx.items) {
            if(item === this.sku) count++;
        }
        if(count < 3) return 0;
        
        const product = catalog[this.sku];
        if (!product) return 0;

        const discount = Math.floor(count/3)*product.price;
        return -discount;
    }
}
