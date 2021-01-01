const cron = require("node-cron");
const { NOTIFICATION_STATUS } = require("../constants");

// Schedule tasks to be run on the server.
//https://www.digitalocean.com/community/tutorials/nodejs-cron-jobs-by-examples
const sendNotification = prisma => {
  cron.schedule("15,30,45,00 * * * * *", async function() {
    console.log("running a send notification task every minute");

    var data = await prisma.notification.findMany({ where: { sent: false } });
    console.log(data);

    for (let i = 0; i < data.length; i++) {
      console.log("send notification....");
      const element = data[i];
    
      await prisma.notification.update({
        where: { id: element.id },
        data: { sent: true, status: NOTIFICATION_STATUS.SUCCESS }
      });

    }
  });
};

module.exports = sendNotification;
