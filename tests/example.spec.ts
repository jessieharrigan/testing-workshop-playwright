import {expect, Page, test} from "@playwright/test";
import * as Helper from '../help.ts';

/*
test(`First test`, async ({ page }) => {
    await page.goto('');
    await expect(page.locator(`.govuk-heading-xl`))
        .toHaveText(`Calculate holiday entitlement`);
    // Continue me!
    // How would you click the continue button?
});
*/


//Start button test - when start button is clicked it should redirect to the (correct) next page
test('StartButton redirects to the correct page', async ({ page }) => {
    // Navigate to the home page
    await page.goto("");
  
    // Click the 'Start now' button
    await page.getByText('Start now').click();
  
    // Assert that the current URL is the expected URL
    await Helper.checkCurrentPage('https://www.gov.uk/calculate-your-holiday-entitlement/y', page);
  });

//We should be on the 'Does the employee work, irregular hours' page - testing our happy path
test("Test page confirms previous selections", async({page}) => {
    //double check correct page
    await Helper.checkCurrentPage('https://www.gov.uk/calculate-your-holiday-entitlement/y', page);
});