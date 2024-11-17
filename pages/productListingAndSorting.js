import commomActions from "../utils/commonActions.js";
import { expect } from '@playwright/test';

export default class productListingandSorting {
    constructor (page){
        this.actions = new commomActions(page);
        this.item = page.locator('.inventory_item');
        this.itemsPrice = page.locator('.inventory_item_price');
        this.itemsDescription = page.locator('.inventory_item_dec');
        this.addToCartButton = page.locator('.btn.btn_primary.btn_small.btn_inventory');
        }

    async clickOnAddToCart(index){
        await this.actions.click(`button:nth-match(:text("Add to cart"),${index})`);
    }
    async countPageItems(){
     return await this.item.count();
    }
    async getItemsPrices(selector){
        return await this.itemsPrice.allInnerTexts()
    }
    async getItemsDescriptions(selector){
        return await this.itemsDescription.allInnerTexts()
    }
    async countButtons(selector){
        return await this.addToCartButton.count();
    }
}