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
  test.only('Test adding multiple products to the cart by clicking on the “Add to cart” button, and verify the number badge updates accordingly', async ({page}) => {
    await page.pause();
    const numberOfProducts = 3 ;
    //add products to cart
    for (let i=1; i<=numberOfProducts;i++)
    {
    await pm.productListingandSorting.clickOnAddToCart(i);
    }
    await expect(pm.shoppingCartOperations.shoppingCartBadge).toHaveText(`${numberOfProducts}`);
  })
});