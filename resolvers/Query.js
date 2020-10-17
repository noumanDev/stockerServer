const { getUserId } = require('../utils');
const { scrapePsxMarketWatch } = require('./../scrapping/index');


async function lessons(parent, args, context) {
  const userId = getUserId(context);
  return context.prisma.lesson.findMany({ where: { postedById: userId } });
}

async function psxMarketWatch(parent, args, context) {
  var data = await scrapePsxMarketWatch();
  console.log("===", data)
  return data;
}

async function info(parent, args, context) {
  return "Welcome to Knowledge Repository";
}

async function watchSymbols(parent, args, context) {
  const symbols = await context.prisma.watchSymbols.findMany({
    where: {
      postedById: getUserId(context)
    }
  });
  return symbols.map(symbol => symbol.symbol);
}

module.exports = {
  info,
  lessons,

  psxMarketWatch,
  watchSymbols
};
