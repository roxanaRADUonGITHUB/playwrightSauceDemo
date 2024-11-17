import commomActions from "../utils/commonActions.js";
import { expect } from '@playwright/test';

export default class productListingandSorting {
    constructor (page){
        this.actions = new commomActions(page);

        }

    async clickOnAddToCart(index){
        await this.actions.click(`button:nth-match(:text("Add to cart"),${index})`);
    }
    async countPageItems(){
       return await this.actions.count('.inventory_item');
    }
}