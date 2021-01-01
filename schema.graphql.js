const schema = `
type Query {
  info: String!
  lessons: [Lesson!]!
  
  psxMarketWatch : [PsxEntity!]!
  getWatchSymbols : [String!]!
  getPsxSymbolStats(todayOnly:Boolean!,symbol:String!):[[String]]!
  fetchPsxData:[[PsxEntity]]
  
}

type PsxEntity {
    symbol: String!,
    sector: String!,
    listedIn: String!,
    ldcp: String!,
    open: String!,
    high: String!,
    low: String!,
    current: String!,
    change: String!,
    changePercentage: String!,
    volume: String!,
    watch: Boolean!,
    minAmount: String,
    maxAmount: String,
    phone : String
}

type Mutation {
  createLesson(description: String!, multimedia: [MultimediaInput]!): Lesson!
  signup(email: String!, password: String!, name: String!): AuthPayload
  login(email: String!, password: String!): AuthPayload

  switchWatchSymbol(symbol:String!,minAmount:String!,maxAmount:String!,phone:String!):[String!]!
  
}


type Lesson {
  id: ID!
  description: String!
  multimedia: [Multimedia!]!
  postedBy: User
}

type Multimedia {
  id : ID!
  url : String!
}
input MultimediaInput {
  id : ID
  url : String!
}

type AuthPayload {
  token: String
  user: User
}

type User {
  id: ID!
  name: String!
  email: String!
  lessons: [Lesson!]!
}
`
module.exports = schema;