import commomActions from "../utils/commonActions.js";
import { expect } from '@playwright/test';

export default class shoppongCartOperations {
    constructor (page){
        this.actions = new commomActions(page);
        this.shoppingCartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.yourCartTitle = page.locator('[data-test="title"]');
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }
    async clickOnShoppingCartIcon  () {
        await this.shoppingCartIcon.click();
    }
}