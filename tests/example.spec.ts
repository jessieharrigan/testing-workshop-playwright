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

/* HAPPY PATH TESTING */
test.describe("Happy Path", () => {

    //Start button test - when start button is clicked it should redirect to the (correct) next page
    test('Page 1 - StartButton redirects to the correct page', async ({ page }) => {
        // Navigate to the home page
        await page.goto("");
    
        // Click the 'Start now' button
        await page.getByText('Start now').click();
    
        // Assert that the current URL is the expected URL
        await Helper.checkCurrentPage('https://www.gov.uk/calculate-your-holiday-entitlement/y', page);
    });

    test("Page 2 - can go to next page by selecting 'Yes' Button.", async({page}) => {
        //Go to page
        await page.goto("https://www.gov.uk/calculate-your-holiday-entitlement/y");
            
        const selectYesandContinue = async () => {
            //Select the radio button labelled "Yes"
            await page.locator('id=response-0').click();
                        
            // Clicking the "Continue" button
            Helper.clickContinueButton(page);
            }
        
        selectYesandContinue();        
        
        // Assert that the current URL is the expected URL
        await Helper.checkCurrentPage('https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year', page);
     });

     test("Page 3 - fill in date boxes and continue", async({page}) => {
        //Go to page
        await page.goto("https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year");

        const dateValues = ['1', '1', '2000'];

        //DMY 
        await page.locator('input#response-0').fill(dateValues[0]);
        await page.locator('input#response-1').fill(dateValues[1]);
        await page.locator('input#response-2').fill(dateValues[2]);

        // Clicking the "Continue" button
        await page.getByText('Continue').click();

        // Assert that the current URL is the expected URL
        await Helper.checkCurrentPage('https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/2000-01-01', page);
    });

});