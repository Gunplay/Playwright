const { test, expect } = require('@playwright/test');
const LinksOfDemoBlaze = require('../pageAliObjects/LocatorsForMultepleElem.js');

test.describe('Locating multiple elements on DemoBlaze', () => {
    test('Should locate and log all links on the page', async ({ page }) => {
        const demoBlaze = new LinksOfDemoBlaze(page);
        await demoBlaze.openDemoBlaze();
        const links = await demoBlaze.getAllLinksOfDemoBlaze();
        console.log(links)
        // const linksCount = await demoBlaze.getLinksCount();
        // console.log(`Total number of links found: ${linksCount}`);
        // expect(links.length).toBe(0);
    });
});