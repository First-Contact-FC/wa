import {expect, test} from '@playwright/test';
import Menu from "./utils/menu";
import {login} from "./utils/roles";
import Map from "./utils/map";
import {play_url, publicTestMapUrl} from "./utils/urls";

test.setTimeout(240_000); // Fix Webkit that can take more than 60s
test.use({
  baseURL: play_url,
})

test.describe('Mobile', () => {
    test('Successfully bubble discussion with mobile device', async ({ page, browser, request, browserName }, workerInfo) => {
        // If the browser is webkit
        if (workerInfo.project.name!== "mobilechromium") {
            //eslint-disable-next-line playwright/no-skipped-test
            test.skip();
            return;
        }
        await page.goto(Map.url("empty"));
        await login(page, "Bob", 3, 'en-US');

        const positionToDiscuss = {
            x: 3 * 32,
            y: 4 * 32
        };

        // walk on the position for the test
        // TODO: find a solution to test Joystick
        await Map.walkToPosition(page, positionToDiscuss.x, positionToDiscuss.y);
        // Text open menu
        await Menu.openBurgerMenu(page);
        // Text close menu
        await Menu.closeBurgerMenu(page);

        // Second browser
        const newBrowserAlice = await browser.newContext();
        const pageAlice = await newBrowserAlice.newPage();
        await pageAlice.goto(Map.url("empty"));
        await pageAlice.evaluate(() => localStorage.setItem('debug', '*'));
        await login(pageAlice, "Alice", 5, 'en-US');

        // Move Alice and create a bubble with another user
        // TODO: find a solution to test Joystick
        await Map.walkToPosition(pageAlice, positionToDiscuss.x, positionToDiscuss.y);

        await expect(pageAlice.getByText('Bob')).toBeVisible();
        // check if we can still open and close burgerMenu when 2 in proximity chat with cam on
        await Menu.openBurgerMenu(pageAlice);
        await Menu.closeBurgerMenu(pageAlice);
        
        // check if we can pin the camera of other user
        // to do this we use the pin button to unpin the video
        await pageAlice.locator('#cameras-container').getByRole('button').nth(1).click();
        await pageAlice.locator('#video-container-receive').getByRole('button').first().click();
        await pageAlice.getByRole('button', {name: 'Pin', exact: true }).click();

        // Second browser
        const newBrowserJohn = await browser.newContext();
        const pageJohn = await newBrowserJohn.newPage();
        await pageJohn.goto(Map.url("empty"));
        await pageJohn.evaluate(() => localStorage.setItem('debug', '*'));
        await login(pageJohn, "John", 5, 'en-US');

        // Move John and create a bubble with another user
        // TODO: find a solution to test Joystick
        await Map.walkToPosition(pageJohn, positionToDiscuss.x, positionToDiscuss.y);

        // Expect to see camera of users
        await expect(pageJohn.getByText('Bob')).toBeVisible();
        await expect(pageJohn.getByText('Alice')).toBeVisible();

        // check if we can still open and close burgerMenu when 2 in proximity chat with cam on
        await Menu.openBurgerMenu(pageJohn);
        await Menu.closeBurgerMenu(pageJohn);
        
        await pageJohn.locator('#cameras-container').getByRole('button').nth(1).click();
        await pageJohn.locator('#video-container-receive').getByRole('button').first().click();
        await pageJohn.getByRole('button', {name: 'Pin', exact: true }).click();
        

        await pageAlice.close();
        await pageJohn.close();
        await page.close();
        await newBrowserAlice.close();
        await newBrowserJohn.close();
    });

    test('Successfully jitsi cowebsite with mobile device', async ({ page, browser }, workerInfo) => {
        // If the browser is webkit, we skip the test because the option 'ArrowRight' doesn't work
        if (workerInfo.project.name !== "mobilechromium") {
            //eslint-disable-next-line playwright/no-skipped-test
            test.skip();
            return;
        }
        page.goto(
            publicTestMapUrl('tests/CoWebsite/cowebsite_jitsiroom.json', 'mobile')
        );
        await login(page, "Bob", 3, 'en-US');
        // Move to open a cowebsite
        await page.locator('#body').press('ArrowRight', { delay: 3000 });
        // Now, let's move player 2 to the speaker zone
        
        // Click on the button to close the cowebsite
        await page.getByTestId('tab1').getByRole('button', {name: 'Close'}).click();

        // Check that the cowebsite is hidden
        await expect(page.getByTestId('tab1').getByRole('button', {name: 'Close'})).toBeHidden({
            timeout: 10000
        });

        page.close();
    });

    // TODO: create test to interact with another object
});