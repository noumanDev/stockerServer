const cron = require('node-cron');
const { getWatchSymbols } = require('../resolvers/Query');
// Schedule tasks to be run on the server.
//https://www.digitalocean.com/community/tutorials/nodejs-cron-jobs-by-examples
const schedulesms = (prisma) => {

    cron.schedule('* * * * *', async function () {
        console.log('running a task every minute');
        const data = await getWatchSymbols(null, null, { prisma, allUsers: true });

        for (var i = 0; i < data.length; i++) {
            var element = data[i];
            if (element.phone && element.amount) {
                try {
                    await prisma.sms.create({
                        data: {
                            symbol: element.symbol,
                            amount: element.amount,
                            phone: element.phone,
                            onceDaily: element.id + (new Date()).toDateString()
                        }
                    });
                } catch (e) {
                    console.log("repeated entry");
                }

            }
          
        }


    });
}

module.exports = schedulesms;


