import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="title"]')).toContainText('Products');
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('4');


  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText('Your Cart');
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('john');
  await page.locator('[data-test="lastName"]').fill('doe');
  await page.locator('[data-test="postalCode"]').fill('1744');
  await page.locator('[data-test="continue"]').click();
  await expect(page.locator('[data-test="total-label"]')).toContainText('Total: $114.44');
  await page.locator('[data-test="finish"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Complete!');
  await expect(page.locator('[data-test="complete-header"]')).toContainText('THANK YOU FOR YOUR ORDER');
  await expect(page.locator('[data-test="pony-express"]')).toBeVisible();
});