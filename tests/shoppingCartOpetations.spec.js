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

  test ('removing a product from the cart by clicking on the “Remove” button, and verify the number badge decreases by one and the product is removed from the cart.', async ({page}) => {
    const numberOfProductsAdded = 3 ;
    //add products to cart
    for (let i=1; i<=numberOfProductsAdded;i++)
    {
    await pm.productListingandSorting.clickOnAddToCart(1);
    }
      await pm.shoppingCartOperations.clickOnRemoveBackPack();
      await expect(pm.shoppingCartOperations.shoppingCartBadge).toHaveText(`${numberOfProductsAdded-1}`);
  })

  test.only ('Product details (quantity, title, description, and price) are displayed correctly on the "Your Cart" page', async ({page}) => {
    //store title, description, price
  const title = pm.page.locator(`.inventory_item_name >> nth=${1}`).allInnerTexts();

    //click on add to cart backpack
    await pm.productListingandSorting.clickOnAddToCart(1);
    //click on cart icon to be redirected to Your cart
    await pm.shoppingCartOperations.clickOnCartIcon();
    await expect (pm.page.locator('[data-test="inventory-item-name"]')).toHaveText(`${title}`);
  })
});