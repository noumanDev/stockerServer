const { getJson } = require('./htmlToJson');
const { toCamelCase, removeSpecialCharacters } = require('./../utils');


const scrappers = {
    PSX_MARKET_WATCH: 'PSX_MARKET_WATCH'
}
const scraperObject = {
    async scraper(browser, scrapper) {
        if (scrapper == scrappers.PSX_MARKET_WATCH) {
            return await scrapePsxMarketWatch(browser);
        }
        throw new Error("No scrapper found");

    }
}

async function scrapePsxMarketWatch(browser) {
    var url = 'https://dps.psx.com.pk/market-watch';
    let page = await browser.newPage();
    console.log(`Navigating to ${url}...`);
    await page.goto(url);

    var pageDataJson = await getJson(await page.content());


    return formatMarketWatch(pageDataJson.data);


}
function formatMarketWatch(data) {

    var rows = data.tables[0].rows;
    var header = [];
    var psxEntities = [];

    rows.forEach((row, rowIndex) => {
        if (rowIndex != 0 && !row.cols[2].nodeValue.includes("KSE30"))
            return;

        var symbol = row.cols[0].nodeValue;
        if (rowIndex != 0) {
            psxEntities[rowIndex] = {};
        }

        row.cols.forEach((col, colIndex) => {
            if (rowIndex == 0) {//header row
                header.push(toCamelCase(removeSpecialCharacters(col.nodeValue.replace('%', 'Percentage'))));
            } else {
                psxEntities[rowIndex][header[colIndex]] = col.nodeValue
            }
        });

    });

    return psxEntities.filter(e => e); //remove null entries,because of some empty indexing based on kse30 condition
}
module.exports = {
    scraperObject,
    scrappers
};