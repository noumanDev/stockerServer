const { scraperObject, scrappers } = require('./pageScraper');
async function scrapeAll(browserInstance, scrapper,args) {
    let browser;
    try {
        browser = await browserInstance;
        const data = await scraperObject.scraper(browser, scrapper,args);
        await browser.close();
        return data


    }
    catch (err) {
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance, scrapper,args) => scrapeAll(browserInstance, scrapper,args)