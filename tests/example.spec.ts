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

    test("Page 4 - Holiday entitlement selection", async({page}) => {
        //Go to page
        await page.goto("https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/2000-01-01");
            
        const DaysWorkedPerWeek = async () => {
            //Select the radio button labelled "Yes"
            await page.locator('id=response-0').click();
                        
            // Clicking the "Continue" button
            Helper.clickContinueButton(page);
            }
        
        DaysWorkedPerWeek();        
        
        // Assert that the current URL is the expected URL
        await Helper.checkCurrentPage('https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/2000-01-01/days-worked-per-week', page);
     });

     test(" Page 5 - Parameter for working out holiday", async({page}) => {
        //Go to page
        await page.goto("https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/2000-01-01/days-worked-per-week");
            
        const ForAFullLeaveYear = async () => {
            //Select the radio button labelled "Yes"
            await page.locator('id=response-0').click();
                        
            // Clicking the "Continue" button
            Helper.clickContinueButton(page);
            }
        
        ForAFullLeaveYear();        
        
        // Assert that the current URL is the expected URL
        await Helper.checkCurrentPage('https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/2000-01-01/days-worked-per-week/full-year', page);
     });
     
     test("Page 6 - Number of days worked per week", async({page}) => {
        //Go to page
        await page.goto("https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/2000-01-01/days-worked-per-week/full-year");
        
        //Fill in 
        await page.locator('input#response').fill('7');

        // Clicking the "Continue" button
        await page.getByText('Continue').click();

        // Assert that the current URL is the expected URL
        await Helper.checkCurrentPage('https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/2000-01-01/days-worked-per-week/full-year/7.0', page);
    });

    test("Page 7 - assert correct number of AL days is present given all of the previous questions in happy path.", async ({ page }) => {
        // Go to the page
        await page.goto("https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/2000-01-01/days-worked-per-week/full-year/7.0");
    
        // Extract the text content of the body
        const bodyText = await page.locator('body').textContent();

        // Assert that "28 days" is included in the body text
        if (bodyText) {
            expect(bodyText).toContain('28 days');
        } else {
            throw new Error('Body text is empty');
        }
    });
    
    test("Page 7 - assert correct option appears after question", async ({ page }) => {
        await page.goto("https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/2000-01-01/days-worked-per-week/full-year/7.0");
      
        // Find the question block
       const question1 = page.getByText("Does the employee work irregular hours or for part of the year?", { exact: true });
      
        // Find the first following element with text "Yes" inside the same container or right after
        const yesAnswer = question1.locator("xpath=following-sibling::*").getByText("Yes", { exact: true });
      
        // Assert the text is correct
        await expect(yesAnswer).toHaveText("Yes");

        // Find the question block
        const question2 = page.getByText("When does the leave year start?", { exact: true });
      
        // Find the first following element with text "Yes" inside the same container or right after
        const DateAnswer = question2.locator("xpath=following-sibling::*").getByText("1 January 2000", { exact: true });
      
        // Assert the text is correct
        await expect(DateAnswer).toHaveText("1 January 2000");

        // Find the question block
        const question3 = page.getByText("Is the holiday entitlement based on:", { exact: true });
      
        // Find the first following element with text "Yes" inside the same container or right after
        const holidayEntitlement = question3.locator("xpath=following-sibling::*").getByText("days worked per week", { exact: true });
       
        // Assert the text is correct
        await expect(holidayEntitlement).toHaveText("days worked per week");
        
        // Find the question block
        const question4 = page.getByText("Do you want to work out holiday:", { exact: true });
      
        // Find the first following element with text "Yes" inside the same container or right after
        const workoutholiday = question4.locator("xpath=following-sibling::*").getByText("for a full leave year", { exact: true });
       
        // Assert the text is correct
        await expect(workoutholiday).toHaveText("for a full leave year")

      });
      
});