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
    page.pause();
    await pm.shoppingCartOperations.clickOnShoppingCartIcon();
    await expect(pm.shoppingCartOperations.yourCartTitle).toHaveText('Your Cart');

  });
});