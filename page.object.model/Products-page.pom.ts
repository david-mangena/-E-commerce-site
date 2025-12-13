import { Page, Locator, expect } from "@playwright/test";

export class ProductsPage {
    public readonly page: Page;
    public readonly title!: Locator;
    public readonly backpack!: Locator;
    public readonly bikeLight!: Locator;
    public readonly boltTShirt!: Locator;
    public readonly fleeceJacket!: Locator;
    public readonly shoppingCartLink!: Locator;
    public readonly itemQuantity!: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.getByTestId('title');
        this.backpack = page.getByTestId('add-to-cart-sauce-labs-backpack');
        this.bikeLight = page.getByTestId('add-to-cart-sauce-labs-bike-light');
        this.boltTShirt = page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt');
        this.fleeceJacket = page.getByTestId('add-to-cart-sauce-labs-fleece-jacket');
        this.shoppingCartLink = page.getByTestId('shopping-cart-link');
        this.itemQuantity = page.getByTestId('item-quantity');
    }

    async addProductsToCart() {   
        await this.title.waitFor();  
        await this.backpack.click();
        await this.bikeLight.click();
        await this.boltTShirt.click();
        await this.fleeceJacket.click();
    }   

    async navigateToCart() {
        await this.shoppingCartLink.click();
    }
    
    async verifyCartItemsCount(expectedCount: number) {
        await expect(this.itemQuantity).toHaveCount(expectedCount);
    }
}