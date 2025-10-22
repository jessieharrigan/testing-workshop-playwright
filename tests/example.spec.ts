import {expect, test} from "@playwright/test";

// Remame this test
test(`First test`, async ({ page }) => {
    await page.goto('');
    await expect(page.locator(`.govuk-heading-xl`)).toHaveText(`Calculate holiday entitlement`);
    // Continue me!
});
