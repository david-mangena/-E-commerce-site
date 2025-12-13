import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
    public readonly page: Page;
    public readonly title: Locator;
    public readonly checkoutButton: Locator;
    public readonly firstNameInput: Locator;
    public readonly lastNameInput: Locator;
    public readonly postalCodeInput: Locator;
    public readonly continueButton: Locator;
    public readonly finishButton: Locator;
    public readonly totalLabel: Locator;
    public readonly completeTitle: Locator;
    public readonly thankYouHeader: Locator;
    public readonly ponyExpressImage: Locator;  
    public readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.getByTestId('title');
        this.checkoutButton = page.getByTestId('checkout');
        this.firstNameInput = page.getByTestId('firstName');
        this.lastNameInput = page.getByTestId('lastName');
        this.postalCodeInput = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        this.totalLabel = page.getByTestId('total-label');
        this.completeTitle = page.getByTestId('title');
        this.thankYouHeader = page.getByTestId('complete-header');
        this.ponyExpressImage = page.getByTestId('pony-express');
        this.finishButton = page.getByTestId('finish');
        this.errorMessage = page.getByTestId('error'); 
    }   
    
    async proceedToCheckout(firstName: string, lastName: string, postalCode: string) {
        await this.checkoutButton.click();
        await this.firstNameInput.fill(firstName);  
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }   

    async completePurchase() {
        await this.totalLabel.isVisible();
        await this.finishButton.click();
        await this.completeTitle.isVisible();
        await this.thankYouHeader.isVisible();
        await this.ponyExpressImage.isVisible();
    }
}
