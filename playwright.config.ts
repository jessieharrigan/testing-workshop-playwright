import { defineConfig, devices } from '@playwright/test';

module.exports = defineConfig({
    testDir: "./tests",
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: 4, // Set the number of retries for all projects

    timeout: 5 * 60 * 1000, // How long before a test fails due to running for too long
    expect: {
        timeout: 60 * 1000,
    }, // How long an individual expect() function will fail
    reportSlowTests: null,

    workers: process.env.FUNCTIONAL_TESTS_WORKERS ? 5 : 5,
    // The number of tests that can run in parallel
    reporter: process.env.CI ? "html" : "html",
    // How the tests will be reported, see playwright.dev reporters for more.

    use: {
        baseURL: 'https://www.gov.uk/calculate-your-holiday-entitlement',
    },

    projects: [
        {
            name: "chromium",
            use: {
                ...devices["Desktop Chrome"],
                channel: "chrome", // Desktop Chrome
                trace: "retain-on-first-failure", // Gives a playwright trace on failure
                javaScriptEnabled: true, // Enables Javascript in the browser
            },
        }
    ],
});
