import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../page.object.model/login-page.pom.ts';
import { ProductsPage } from '../page.object.model/Products-page.pom.ts';
import { CheckoutPage } from '../page.object.model/checkout-page.pom.ts';

export const test = base.extend<{loginPage: LoginPage; productsPage: ProductsPage; checkoutPage: CheckoutPage }>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    productsPage: async ({ page }, use) => {
        const productsPage = new ProductsPage(page);
        await use(productsPage);
    },

    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },
});

export { expect };