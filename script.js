const browserObject = require('./scrapping/browser');
const scraperController = require('./scrapping/pageController');

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

// Pass the browser instance to the scraper controller
scraperController(browserInstance);//.then(data=>console.log(data));