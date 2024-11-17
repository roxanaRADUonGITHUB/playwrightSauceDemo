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
    const count = await pm.productListingandSorting.countPageItems();
    for (let i=0;i<count;i++){
        await expect(pm.page.locator(`img.inventory_item_img >> nth=${i}`)).toHaveAttribute('alt',altText[i]);
    }
  });

  test('Each item has picture - by src', async ({ page }) => {
    const srcPath = ['/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg','/static/media/bike-light-1200x1500.37c843b0.jpg','/static/media/bolt-shirt-1200x1500.c2599ac5.jpg','/static/media/sauce-pullover-1200x1500.51d7ffaf.jpg','/static/media/red-onesie-1200x1500.2ec615b2.jpg','/static/media/red-tatt-1200x1500.30dadef4.jpg'];
    const count = await pm.productListingandSorting.countPageItems();
    for (let i=0;i<count;i++){
        await expect(pm.page.locator(`img.inventory_item_img >> nth=${i}`)).toHaveAttribute('src',srcPath[i]);
    }
  });

test('Check that each item has a title - by text', async ({ page }) => {
  const itemTitle = ['Sauce Labs Backpack','Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt','Sauce Labs Fleece Jacket','Sauce Labs Onesie','Test.allTheThings() T-Shirt (Red)'];
  const count = await pm.productListingandSorting.countPageItems();
  for (let i=0;i<count;i++){
    await expect(pm.page.locator(`.inventory_item_name >> nth=${i}`)).toHaveText(itemTitle[i]);
  }
});

/*test('Check that each item has a description', async ({ page }) => {
  const itemDescription = [
  `carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.`,
  `A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.`,
  `Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.`,
  `It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.`,
  `Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.`,
  `This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.`
  ]
  const count = await pm.productListingandSorting.countPageItems();
  for (let i=0;i<count;i++){
    await expect(pm.page.locator(`.inventory_item_desc >> nth=${i}`)).toHaveText(itemDescription[i]);
  }
}); */
test('Check that each item has a description', async ({ page }) => {
  const itemDescription = await pm.productListingandSorting.getItemsPrices
  const count = await pm.productListingandSorting.getItemsDescriptions();
  for (let i=0;i<count;i++){
    await expect(pm.page.locator(`.inventory_item_desc >> nth=${i}`)).toHaveText(itemDescription[i]);
  }
});

test('Check that each item has a price', async ({ page }) => {
  //const itemPrice = await pm.page.locator('.inventory_item_price').allInnerTexts();
  const itemPrice = await pm.productListingandSorting.getItemsPrices();
  const count = await pm.productListingandSorting.countPageItems();
  for (let i=0;i<count;i++){
    await expect(pm.page.locator(`.inventory_item_price >> nth=${i}`)).toContainText(itemPrice[i]);
  }
});

test('Check that each item has Add to cart button', async ({ page }) => {
   const addToCart = page.locator('.inventory_item_price');
   const count = await pm.productListingandSorting.countPageItems();
   await expect(addToCart).toHaveCount(count);

});

});