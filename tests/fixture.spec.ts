import { test, expect } from '../page.object.model/fixtures.ts';    
import { testUsers } from '../test-data/users.ts';

test.describe('E-commerce site', () => {  
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle('Swag Labs');
    });

    test('standard_user', async ({loginPage, productsPage, checkoutPage }) => {
        const user = testUsers.standard_user;
        await loginPage.login(user.username, user.password); 
        await productsPage.addProductsToCart();
        await productsPage.navigateToCart();
        await productsPage.verifyCartItemsCount(4);
        await checkoutPage.proceedToCheckout(user.firstName, user.lastName, user.zipCode);
        await checkoutPage.completePurchase();
    });

    test('locked_out_user', async ({loginPage}) => {
        const user = testUsers.locked_out_user;
        await loginPage.login(user.username, user.password); 
        await expect(loginPage.errorMessage).toBeVisible();
    });

    test('problem_user', async ({loginPage, productsPage, checkoutPage}) => {
        const user = testUsers.problem_user;
        await loginPage.login(user.username, user.password);
        await productsPage.addProductsToCart();
        await productsPage.navigateToCart();
        await checkoutPage.proceedToCheckout(user.firstName, user.lastName, user.zipCode);
        await expect(checkoutPage.errorMessage).toBeVisible();
    });

    test('performance_glitch_user', async ({loginPage, productsPage, checkoutPage}) => {
        const user = testUsers.performance_glitch_user;
        await loginPage.login(user.username, user.password);
        await productsPage.addProductsToCart();
        await productsPage.navigateToCart();
        await checkoutPage.proceedToCheckout(user.firstName, user.lastName, user.zipCode);
        await checkoutPage.completePurchase();
    });

    test('error_user', async ({loginPage, productsPage, checkoutPage}) => {
        const user = testUsers.error_user;
        await loginPage.login(user.username, user.password);
        await productsPage.navigateToCart();
        await checkoutPage.proceedToCheckout(user.firstName, user.lastName, user.zipCode);
        await checkoutPage.completePurchase();
    });

    test('visual_user', async ({loginPage, productsPage, checkoutPage}) => {
        const user = testUsers.visual_user;
        await loginPage.login(user.username, user.password);
        await productsPage.addProductsToCart();
        await productsPage.navigateToCart();
        await checkoutPage.proceedToCheckout(user.firstName, user.lastName, user.zipCode);
        await checkoutPage.completePurchase();
    });
});