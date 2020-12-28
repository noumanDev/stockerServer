const cron = require("node-cron");
const { SMS_STATUSES } = require("../constants");

// Schedule tasks to be run on the server.
//https://www.digitalocean.com/community/tutorials/nodejs-cron-jobs-by-examples
const sendsms = prisma => {
  cron.schedule("15,30,45,00 * * * * *", async function() {
    console.log("running a send sms task every minute");

    var data = await prisma.sms.findMany({ where: { sent: false } });
    console.log(data);

    for (let i = 0; i < data.length; i++) {
      console.log("send sms....");
      const element = data[i];
    
      await prisma.sms.update({
        where: { id: element.id },
        data: { sent: true, status: SMS_STATUSES.SUCCESS }
      });

    }
  });
};

module.exports = sendsms;
