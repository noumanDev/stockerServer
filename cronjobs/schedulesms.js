const cron = require("node-cron");
const { getWatchSymbols, fetchPsxData } = require("../resolvers/Query");
const { convertArrayToObject } = require("../utils");

// Schedule tasks to be run on the server.
//https://www.digitalocean.com/community/tutorials/nodejs-cron-jobs-by-examples
const schedulesms = (prisma, cache) => {
  cron.schedule("* * * * *", async function() {
    console.log("running a task every minute");

    //fetch latest psx data
    const psxData = await fetchPsxData(cache);

    //convert this array data to object, to avoid nested loops
    const psxDataObj = convertArrayToObject(psxData, "symbol");

    // get all users watch symbols
    const data = await getWatchSymbols(null, null, { prisma, allUsers: true });

    //if some or any watch symbol alert amount range fall in latest psx data, then add its record to sms alerts table, so that msgs sent to those users
    for (var i = 0; i < data.length; i++) {
      var element = data[i];
      var currentAmount = psxDataObj[element.symbol].current;
      console.log(
        element.minAmount,
        element.maxAmount,
        currentAmount,
        currentAmount >= element.minAmount && currentAmount <= element.maxAmount
      );
      if (
        element.phone &&
        element.minAmount &&
        element.maxAmount &&
        currentAmount >= element.minAmount &&
        currentAmount <= element.maxAmount
      ) {
        try {
          await prisma.sms.create({
            data: {
              msg: `${element.symbol} todays price is ${currentAmount}. Alert was set for range ${element.minAmount} - ${element.maxAmount}`,
              phone: element.phone,
              onceDaily: element.id + new Date().toDateString()
            }
          });
        } catch (e) {
          console.log("repeated entry",e.message);
        }
      }
    }
  });
};

module.exports = schedulesms;
