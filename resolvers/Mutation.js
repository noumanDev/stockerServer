const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function createLesson(parent, args, context) {
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

  const emailexists = await context.prisma.user.findOne({ where: { email: args.email } });
  if (emailexists) {
    throw new Error('email already exists');
  }

  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.user.create({ data: { ...args, password } })
  console.log(user);
  const token = jwt.sign({ userId: user.id }, APP_SECRET)
  return {
    token,
    user,
  }

}

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findOne({ where: { email: args.email } })
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid username or password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

async function removeWatchSymbol(prisma, userId, symbol) {
  var deletedSymbol = await prisma.watchSymbols.deleteMany({
    where: {
      postedById: userId,
      symbol: symbol
    }
  });

  var symbols = (await prisma.user.findOne({ where: { id: userId } }).watchSymbols())
  return symbols.map(symbol => symbol.symbol);

}
async function addWatchSymbol(prisma, userId, symbol) {

  var data = await prisma.watchSymbols.findMany({
    where: {
      postedById: userId,
      symbol: symbol
    }
  });
  if (!data.length) {
    await prisma.watchSymbols.create({
      data: {
        postedBy: { connect: { id: userId } },
        symbol: symbol
      }
    });
  }

  var symbols = (await prisma.user.findOne({ where: { id: userId } }).watchSymbols())
  return symbols.map(symbol => symbol.symbol);

}
async function switchWatchSymbol(parent, args, context, info) { //if symbol already exists in watch symbols then it will remove/ other wise this will add
  const userId = getUserId(context);
  const symbol = args.symbol;

  var data = await context.prisma.watchSymbols.findMany({
    where: {
      postedById: userId,
      symbol: symbol
    }
  });
  if (!data.length) { //add watch symbol
    return await addWatchSymbol(context.prisma, userId, symbol);
  } else {
    return await removeWatchSymbol(context.prisma, userId, symbol);
  }

}


module.exports = {
  signup,
  login,
  createLesson,
  switchWatchSymbol
 
}