import { test, expect } from '@playwright/test';
import PomManager from '../pages/PomManager.js';
import { count } from 'console';

let pm;

test.describe('Login tests', () => {

  test.beforeEach(async ({ page }) => {

    // Go to the starting url before each test.
    pm = new PomManager(page);
    await pm.loginPage.navigate('https://www.saucedemo.com/');
    await pm.loginPage.login('standard_user','secret_sauce');
  });

  test('Verify that clicking on the shopping cart icon redirects the user to the "Your Cart" page.', async ({ page }) => {
    
    await pm.shoppingCartOperations.clickOnShoppingCartIcon();
    await expect(pm.shoppingCartOperations.yourCartTitle).toHaveText('Your Cart');

  });
  test('Test adding multiple products to the cart by clicking on the “Add to cart” button, and verify the number badge updates accordingly', async ({page}) => {
    const numberOfProducts = 3 ;
    //add products to cart
    for (let i=1; i<=numberOfProducts;i++)
    {
    await pm.productListingandSorting.clickOnAddToCart(1);
    }
    await expect(pm.shoppingCartOperations.shoppingCartBadge).toHaveText(`${numberOfProducts}`);
  })

  test ('Removing a product from the cart by clicking on the “Remove” button, and verify the number badge decreases by one and the product is removed from the cart.', async ({page}) => {
    const numberOfProductsAdded = 3 ;
    //add products to cart
    for (let i=1; i<=numberOfProductsAdded;i++)
    {
    await pm.productListingandSorting.clickOnAddToCart(1);
    }
      await pm.shoppingCartOperations.clickOnRemoveBackPack();
      await expect(pm.shoppingCartOperations.shoppingCartBadge).toHaveText(`${numberOfProductsAdded-1}`);
  })

  test ('Product details (quantity, title, description, and price) are displayed correctly on the "Your Cart" page', async ({page}) => {
    let itemNumber = 0;
    //store title, description, price from products page
    let itemDetails =[];
    itemDetails[0] = await pm.productListingandSorting.getItemTitle(itemNumber);
    itemDetails[1] = await pm.productListingandSorting.getItemDescription(itemNumber);
    itemDetails[2] = await pm.productListingandSorting.getItemPrice(itemNumber);  

    //store title, description, price from products page
    let cartDetails =[];
    cartDetails[0] = await pm.shoppingCartOperations.itemTitle;
    cartDetails[1] = await pm.shoppingCartOperations.itemDescription;
    cartDetails[2] = await pm.shoppingCartOperations.itemQuantity; 
    //click on add to cart backpack
    await pm.productListingandSorting.clickOnAddToCart(itemNumber+1);
    //click on cart icon to be redirected to Your cart
    await pm.shoppingCartOperations.clickOnCartIcon();
    //assertion
    await expect (pm.shoppingCartOperations.itemTitle).toHaveText(`${details[0]}`);
    await expect (pm.shoppingCartOperations.itemDescription).toHaveText(`${details[1]}`);
    await expect (pm.shoppingCartOperations.itemPrice).toHaveText(`${details[2]}`);
    await expect (pm.shoppingCartOperations.itemQuantity).toHaveText('1');
  })
  test ('Verify that clicking the "Continue shopping" button redirects the user back to the product list page', async ({page}) => {
//click on cart icon 
await pm.shoppingCartOperations.clickOnCartIcon();
//click on Continue to Shopping button
await pm.shoppingCartOperations.clickOnContinueShopping();
//assertion on page title
await expect(page.locator('.title')).toContainText(/Products/);

  })
});