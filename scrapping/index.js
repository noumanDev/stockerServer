const browserObject = require('./browser');
const scraperController = require('./pageController');
const { scrappers } = require('./pageScraper');



async function scrapePsxMarketWatch() {
    //Start the browser and create a browser instance
    let browserInstance = browserObject.startBrowser();
    
    // Pass the browser instance to the scraper controller
    return await scraperController(browserInstance, scrappers.PSX_MARKET_WATCH);

}

module.exports = {
    scrapePsxMarketWatch
}