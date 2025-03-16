import commomActions from "../utils/commonActions.js";
import { expect } from '@playwright/test';

export default class productListingandSorting {
    constructor (page){
        this.actions = new commomActions(page);
        this.item = page.locator('.inventory_item');
        this.itemsPrice = page.locator('.inventory_item_price');
        this.itemPrice = page.locator('[data-test="inventory-item-price"]');
        this.itemsDescription = page.locator('.inventory_item_dec');
        this.itemDescription = page.locator('[data-test="inventory-item-desc"]');
        this.addToCartButton = page.locator('.btn.btn_primary.btn_small.btn_inventory');
        this.itemsTitle = page.locator('.inventory_item_name');
        this.itemTitle = page.locator('[data-test="inventory-item-name"]');
        this.filter = page.locator('[data-test="product-sort-container"]');
        }

    async getItemPrice(n){
            return await this.itemPrice.locator(`nth=${n}`).innerText();
    }    
    async getItemDescription(n){
            return await this.itemDescription.locator(`nth=${n}`).innerText();
    }

    async getItemTitle(n){
        return await this.itemTitle.locator(`nth=${n}`).innerText();
    }
    async clickOnAddToCart(index){
        await this.actions.click(`button:nth-match(:text("Add to cart"),${index})`);
    }
    async countPageItems(){
     return await this.item.count();
    }
    async getItemsTitle(){
        return await this.itemsTitle.allInnerTexts()
    }
    async getItemsPrices(){
        return await this.itemsPrice.allInnerTexts()
    }
    async getItemsDescriptions(){
        return await this.itemsDescription.allInnerTexts()
    }
    async countButtons(){
        return await this.addToCartButton.count();
    }
    async selectFiterOption(value){
        await this.filter.selectOption(value);
    }
}