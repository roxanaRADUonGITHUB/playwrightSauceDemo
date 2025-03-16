import commomActions from "../utils/commonActions.js";
import { expect } from '@playwright/test';

export default class shoppingCartOperations {
    constructor (page){
        this.actions = new commomActions(page);
        this.shoppingCartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.removeBackPack = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.yourCartTitle = page.locator('[data-test="title"]');
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.itemTitle = page.locator('[data-test="inventory-item-name"]');
        this.itemDescription = page.locator('[data-test="inventory-item-desc"]');
        this.itemPrice = page.locator('[data-test="inventory-item-price"]');
        this.itemQuantity = page.locator('[data-test="item-quantity"]');
        this.continueShoppingBtn = page.locator('[data-test="continue-shopping"]');
    }
    async clickOnContinueShopping () {
        await this.continueShoppingBtn.click();
    }
    async clickOnShoppingCartIcon  () {
        await this.shoppingCartIcon.click();
    }
    async clickOnRemoveBackPack () {
        await this.removeBackPack.click();
    }
    async clickOnCartIcon () {
        await this.shoppingCartIcon.click();
    }
}