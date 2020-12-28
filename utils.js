const jwt = require("jsonwebtoken");
const APP_SECRET = "GraphQL-is-aw3some";
const { AuthenticationError } = require("apollo-server");

function getUserId(context) {
  const Authorization = context.req.get("Authorization");
  console.log(Authorization);
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }

  throw new AuthenticationError("Not authenticated");
}
function removeSpecialCharacters(str) {
  return str.replace(/[^a-zA-Z ]/g, "");
}
function toCamelCase(str) {
  return str.toLowerCase().replace(/\s+(.)/g, function(match, group) {
    return group.toUpperCase();
  });
}

function convertArrayToObject(array, key) {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item
    };
  }, initialValue);
}

module.exports = {
  APP_SECRET,
  getUserId,
  toCamelCase,
  removeSpecialCharacters,
  convertArrayToObject
};
