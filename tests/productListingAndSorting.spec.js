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
test('Each item has picture - by alt', async ({ page }) => {
    const altText = ['Sauce Labs Backpack','Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt','Sauce Labs Fleece Jacket','Sauce Labs Onesie','Test.allTheThings() T-Shirt (Red)'];
    const count = await pm.page.locator('.inventory_item').count();
    console.log(count);
    for (let i=0;i<count;i++){
        await expect(pm.page.locator(`img.inventory_item_img >> nth=${i}`)).toHaveAttribute('alt',altText[i]);
    }
  });

  test.only('Each item has picture - by src', async ({ page }) => {
    await page.pause();
    const srcPath = ['/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg','/static/media/bike-light-1200x1500.37c843b0.jpg','/static/media/bolt-shirt-1200x1500.c2599ac5.jpg','/static/media/sauce-pullover-1200x1500.51d7ffaf.jpg','/static/media/red-onesie-1200x1500.2ec615b2.jpg','/static/media/red-tatt-1200x1500.30dadef4.jpg'];
    const count = await pm.productListingandSorting.countPageItems();
    console.log(count);
    for (let i=0;i<count;i++){
        await expect(pm.page.locator(`img.inventory_item_img >> nth=${i}`)).toHaveAttribute('src',srcPath[i]);
    }
  });

test('Check item title', async ({ page }) => {
});

test('Check item description', async ({ page }) => {
});

test('Check item price', async ({ page }) => {
});

test('Check item Add to cart button', async ({ page }) => {
    await page.pause();
    await pm.productListingandSorting.clickOnAddToCart(2);
    await page.pause();
});

});