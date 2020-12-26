const { getUserId } = require('../utils');
const { scrapePsxMarketWatch, psxSymbolStats } = require('./../scrapping/index');
const _ = require('lodash');

async function lessons(parent, args, context) {
  const userId = getUserId(context);
  return context.prisma.lesson.findMany({ where: { postedById: userId } });
}

async function getWatchSymbols(parent, args, context) {
 
  const symbols = await context.prisma.watchSymbols.findMany({
    where: context.allUsers?{}: {
      postedById: getUserId(context)
    }
  });
  return symbols.map(symbol => symbol);
}


async function psxMarketWatch(parent, args, context) {

  //fetch psx data
  var psxMarketWatchKey = "psxMarketWatch";
  var data = context.myCache.get(psxMarketWatchKey);
  if (data == undefined) {
    data = await scrapePsxMarketWatch();
    context.myCache.set(psxMarketWatchKey, data, 60000);
  }

  //fetch symbols
  var watchSymbols = {};
  (await getWatchSymbols(parent, args, context)).forEach(symbol => watchSymbols[symbol.symbol] = symbol);

  //combile watch symbols with psx data
  data.forEach(symbol => {
    console.log(symbol.symbol, watchSymbols[symbol.symbol]);
    symbol.watch = (watchSymbols[symbol.symbol] ? true : false);
    symbol.amount = watchSymbols[symbol.symbol]?watchSymbols[symbol.symbol].amount:null;
    symbol.phone = watchSymbols[symbol.symbol]?watchSymbols[symbol.symbol].phone:null;
  });


  //sort according to watch symbols
  return _.sortBy(data, [(w) => !w.watch, (w) => !w.volume]);
}
async function getPsxSymbolStats(parent, args, context) {

  //fetch psx data
  var psxSymbolStatsKey = "psxSymbolStats" + args.symbol + args.todayOnly;
  var data = context.myCache.get(psxSymbolStatsKey);
  if (data == undefined) {
    data = await psxSymbolStats({ today: args.todayOnly, symbol: args.symbol });
    context.myCache.set(psxSymbolStatsKey, data, 60000);
  }

  return data;
}

async function info(parent, args, context) {
  return "Welcome to Knowledge Repository";
}


module.exports = {
  info,
  lessons,

  psxMarketWatch,
  getWatchSymbols,
  getPsxSymbolStats
};
