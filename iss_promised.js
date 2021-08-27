const request = require('request-promise-native');

const fetchMyIP = () => request("https://api.ipify.org/?format=json");
const fetchCoordsByIP = (body) => request("https://freegeoip.app/json/" + JSON.parse(body).ip);
const fetchISSFlyOverTimes = (body) => request("https://iss-pass.herokuapp.com?lat=" + JSON.parse(body).latitude + "&lon=" + JSON.parse(body).longitude);

const nextISSTimesForMyLocation = () => fetchMyIP().then(fetchCoordsByIP).then(fetchISSFlyOverTimes).then(body => JSON.parse(body).response);

module.exports = {nextISSTimesForMyLocation};