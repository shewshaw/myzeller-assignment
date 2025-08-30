import type { Product } from "../product";
import type { PricingContext, PricingRule } from "../pricingRule";

export class BulkDiscountRule implements PricingRule {
    constructor(private sku: string, private minQuantity: number, private discountedPrice: number) {}

    apply(ctx: PricingContext, catalog: Record<string, Product>): number {
        let count = 0;
        for(const item of ctx.items) {
            if(item === this.sku) count++;
        }
        if(count > this.minQuantity) {
            const product = catalog[this.sku];
            if (!product) return 0;
            const discount = (product.price - this.discountedPrice)*count;
            return -discount;
        }
        return 0;
    }
}
