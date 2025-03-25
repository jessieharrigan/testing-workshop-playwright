import {expect, Page, test} from "@playwright/test";

export async function checkCurrentPage(url:string, page:Page) {
    await expect(page).toHaveURL(url);
}