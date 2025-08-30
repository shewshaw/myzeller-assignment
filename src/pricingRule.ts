import { catalog, Product } from "./product";

export interface PricingContext {
    items: string[];
}

export interface PricingRule {
    apply(ctx: PricingContext, catalog: Record<string, Product>): number;
}