import LoginPage from "./LoginPage.js";
import productListingandSorting from "./productListingAndSorting.js";
import shoppingCartOperations from "./shoppingCartOperations.js";
import checkoutProcess from "./checkoutProcess.js";

export default class PomManager {
    constructor(page){
        this.page =page;
        this.loginPage = new LoginPage(page);
        this.productListingandSorting = new productListingandSorting(page);
        this.shoppingCartOperations = new shoppingCartOperations(page);
        this.checkoutProcess = new checkoutProcess(page);
    }
}