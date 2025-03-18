import commomActions from "../utils/commonActions.js";
import { expect } from '@playwright/test';

export default class checkoutProcess {
    constructor (page){
    this.actions = new commomActions(page);
    this.checkoutBtn = page.locator('[data-test="checkout"]');
    this.checkoutYourInfoTitle =page.locator('[data-test="title"]');
    this.checkoutOverviewTitle = page.locator('[data-test="title"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.zipInput = page.locator('[data-test="postalCode"]');
    this.continueBtn = page.locator('[id="continue"]');
    this.errorMsg = page.locator('[data-test="error"]');
    this.cancelBtn = page.locator('[data-test="cancel"]')
    
}
    async clickOnCancelBtn(){
        await this.cancelBtn.click();
    }
    async clickOnContinueBtn(){
        await this.continueBtn.click();
    }
    async clickOnCheckoutBtn(){
        await this.checkoutBtn.click();
    }
    async typeFirstName(firstName){
        await this.firstNameInput.fill(firstName)
    }
    async typeLastName(lastName){
        await this.lastNameInput.fill(lastName)
    }
    async typeZip(lastZip){
        await this.zipInput.fill(lastZip)
    }
}