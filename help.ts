import {expect, Page, test} from "@playwright/test";
import path from "path";

export async function checkCurrentPage(url:string, page:Page) {
    await expect(page).toHaveURL(url);
}

export async function clickContinueButton(page: Page) {
    // Clicking the "Continue" button
    await page.getByText('Continue').click();
}