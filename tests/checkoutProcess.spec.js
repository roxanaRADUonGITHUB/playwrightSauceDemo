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
        test('Test filling out the form with valid inputs and proceed to the next page', async ({ page }) => {
        
            await pm.shoppingCartOperations.clickOnShoppingCartIcon();
            await pm.checkoutProcess.clickOnCheckoutBtn();
            await pm.checkoutProcess.typeFirstName('First Name');
            await pm.checkoutProcess.typeLastName('Last Name');
            await pm.checkoutProcess.typeZip('0001');
            await pm.checkoutProcess.clickOnContinueBtn();

            await expect(pm.checkoutProcess.checkoutOverviewTitle).toContainText(/Checkout: Overview/);

      
        });
        test('Test submitting the form with missing required inputs and verify input highlighting', async ({ page }) => {
          await pm.shoppingCartOperations.clickOnShoppingCartIcon();
          await pm.checkoutProcess.clickOnCheckoutBtn();
          await pm.checkoutProcess.clickOnContinueBtn();

          await expect (pm.checkoutProcess.firstNameInput).toHaveClass('input_error form_input error');
          await expect (pm.checkoutProcess.lastNameInput).toHaveClass('input_error form_input error');
          await expect (pm.checkoutProcess.zipInput).toHaveClass('input_error form_input error');

        });

        test('Test submitting the form with missing first name inputs and verify the error message', async ({ page }) => {
          await pm.shoppingCartOperations.clickOnShoppingCartIcon();
          await pm.checkoutProcess.clickOnCheckoutBtn();
          await pm.checkoutProcess.clickOnContinueBtn();
          await expect (pm.checkoutProcess.errorMsg).toContainText(/Error: First Name is required/);

        });
        test('Test submitting the form with missing last name inputs and verify the error message', async ({ page }) => {
          await pm.shoppingCartOperations.clickOnShoppingCartIcon();
          await pm.checkoutProcess.clickOnCheckoutBtn();
          await pm.checkoutProcess.typeFirstName('First Name');
          await pm.checkoutProcess.clickOnContinueBtn();
          await expect (pm.checkoutProcess.errorMsg).toContainText(/Error: Last Name is required/);

        });

        test('Test submitting the form with missing zip inputs and verify the error message', async ({ page }) => {
          await pm.shoppingCartOperations.clickOnShoppingCartIcon();
          await pm.checkoutProcess.clickOnCheckoutBtn();
          await pm.checkoutProcess.typeFirstName('First Name');
          await pm.checkoutProcess.typeLastName('Last Name');
          await pm.checkoutProcess.clickOnContinueBtn();
          await expect (pm.checkoutProcess.errorMsg).toContainText(/Error: Postal Code is required/);

        });

        test('Verify that clicking the Cancel button on the Checkout: Your Information page redirects the user back to the shopping cart', async ({ page }) => {
          await pm.shoppingCartOperations.clickOnShoppingCartIcon();
          await pm.checkoutProcess.clickOnCheckoutBtn();
          await pm.checkoutProcess.clickOnCancelBtn();
          await expect(pm.shoppingCartOperations.yourCartTitle).toContainText(/Your Cart/);
        });

        test('Verify that clicking the "Continue" button on the "Checkout: Your Information" page redirects the user to the "Checkout: Overview" page', async ({ page }) => {
          await pm.shoppingCartOperations.clickOnShoppingCartIcon();
          await pm.checkoutProcess.clickOnCheckoutBtn();
          await pm.checkoutProcess.typeFirstName('First Name');
          await pm.checkoutProcess.typeLastName('Last Name');
          await pm.checkoutProcess.typeZip('0001')
          await pm.checkoutProcess.clickOnContinueBtn();
          await expect(pm.checkoutProcess.checkoutOverviewTitle).toContainText(/Checkout: Overview/);
        });

});