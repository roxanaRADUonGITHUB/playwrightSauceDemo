import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import PomManager from '../pages/PomManager.js';

let pm;

test.describe('Login tests', () => {

  test.beforeEach(async ({ page }) => {

    // Go to the starting url before each test.
    pm = new PomManager(page);
    await pm.loginPage.navigate('https://www.saucedemo.com/');
  });

  test('Check that username input is displayed when accessing the link ', async ({ page }) => {
    await expect(page.locator('id="user-name"')).toBeVisible;
  });
  test('Check that password input is displayed when accessing the link ', async ({ page }) => {
    await expect(page.locator('id="password"')).toBeVisible;
  });

  test('Login succesful', async ({ page }) => {
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page.locator('.title')).toContainText(/Products/);
  });

  test('Login succesful - POM', async ({ page }) => {
    await pm.loginPage.login('standard_user','secret_sauce');
    await expect(page.locator('.title')).toContainText(/Products/);
  });
  test('Login failed ', async ({ page }) => {
    await page.locator('#user-name').fill('not_standard_user');
    await page.locator('#password').fill('not_secret_sauce');
    await page.locator('#login-button').click();
    await expect(page.locator('h3')).toContainText(/Epic sadface: Username and password do not match any user in this service/);
  });

  test('POM Login failed - wrong USERNAME and PASSWORD', async ({ page }) => {
    await page.pause();
    await pm.loginPage.login('not_standard_user','not_secret_sauce');
    await pm.loginPage.assertErrorMessage('Epic sadface: Username and password do not match any user in this service');
  });
  test('POM Login failed - USER LOCKED OUT', async ({ page }) => {
    await pm.loginPage.login('locked_out_user','secret_sauce');
    await pm.loginPage.assertErrorMessage('Epic sadface: Sorry, this user has been locked out.');
  });

});