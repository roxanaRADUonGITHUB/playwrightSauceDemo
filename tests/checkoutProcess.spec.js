import { test, expect } from '@playwright/test';
import PomManager from '../pages/PomManager.js';
import { count } from 'console';

let pm;
test.describe('Checkout Process', () => {
      test.beforeEach(async ({ page }) => {

        // Go to the starting url before each test.
        pm = new PomManager(page);
        await pm.loginPage.navigate('https://www.saucedemo.com/');
        await pm.loginPage.login('standard_user','secret_sauce');
      });
        test ('Verify that clicking the "Checkout" button redirects the user to the "Checkout: Your Information" page.', async ({ page }) => {
        
            await pm.shoppingCartOperations.clickOnShoppingCartIcon();
            await pm.checkoutProcess.clickOnCheckoutBtn();
            await expect(pm.checkoutProcess.checkoutYourInfoTitle).toContainText(/Checkout: Your Information/);

      
        });
        test.only('Test filling out the form with valid inputs and proceed to the next page', async ({ page }) => {
        
            await pm.shoppingCartOperations.clickOnShoppingCartIcon();
            await pm.checkoutProcess.clickOnCheckoutBtn();
            await pm.checkoutProcess.typeFirstName('First Name');
            await pm.checkoutProcess.typeLastName('Last Name');
            await pm.checkoutProcess.typeZip('0001');
            await pm.checkoutProcess.clickOnContinueBtn();

            await expect(pm.checkoutProcess.checkoutOverviewTitle).toContainText(/Checkout: Overview/);

      
        });


});