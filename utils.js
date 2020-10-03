const jwt = require('jsonwebtoken')
const APP_SECRET = 'GraphQL-is-aw3some'

function getUserId(context) {
  const Authorization = context.request.get('Authorization')
  console.log(Authorization);
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET)
    return userId
  }

  throw new Error('Not authenticated')
}
function removeSpecialCharacters(str){
  return str.replace(/[^a-zA-Z ]/g, "");
}
function toCamelCase(str){
  return str.toLowerCase().replace(/\s+(.)/g, function (match, group) { 
    return group.toUpperCase()  
  })
}
module.exports = {
  APP_SECRET,
  getUserId,
  toCamelCase,
  removeSpecialCharacters
}