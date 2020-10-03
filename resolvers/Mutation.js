const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function post(parent, args, context) {
  const userId = getUserId(context);

  //https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/relation-queries
  const lesson = await context.prisma.lesson.create({
    data: {
      description: args.description,
      postedBy: { connect: { id: userId } },
      multimedia: {
        create: args.multimedia
      }
    },
  });

  //update
  return { ...lesson, multimedia: [] };
}
async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.user.create({ data: { ...args, password } })
  const token = jwt.sign({ userId: user.id }, APP_SECRET)
  return {
    token,
    user,
  }
}

async function login(parent, args, context, info) {
  // 1
  const user = await context.prisma.user.findOne({ where: { email: args.email } })
  if (!user) {
    throw new Error('No such user found')
  }

  // 2
  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  // 3
  return {
    token,
    user,
  }
}

async function removeSymbol(parent, args, context, info) {
  const userId = getUserId(context);
  const symbol = args.symbol;

  var deletedSymbol = await context.prisma.watchSymbols.deleteMany({
    where: {
      postedById: userId,
      symbol: symbol
    }
  });

  var symbols = (await context.prisma.user.findOne({ where: { id: userId } }).watchSymbols())
  return symbols.map(symbol => symbol.symbol);

}
async function addToMySymbol(parent, args, context, info) {
  const userId = getUserId(context);
  const symbol = args.symbol;

  var data = await context.prisma.watchSymbols.findMany({
    where: {
      postedById: userId,
      symbol: symbol
    }
  });
  if (!data.length) {
    await context.prisma.watchSymbols.create({
      data: {
        postedBy: { connect: { id: userId } },
        symbol: symbol
      }
    });
    console.log('add symbol');
  }

  var symbols = (await context.prisma.user.findOne({ where: { id: userId } }).watchSymbols())
  return symbols.map(symbol => symbol.symbol);

}


module.exports = {
  signup,
  login,
  post,
  addToMySymbol,
  removeSymbol
}