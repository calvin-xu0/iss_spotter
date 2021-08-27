const request = require("request");

const fetchMyIP = function(callback) {
  request("https://api.ipify.org/?format=json", (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const IP = JSON.parse(body).ip;
    return callback(null, IP);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request("https://freegeoip.app/json/" + ip, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const coords = {};
    coords.latitude = JSON.parse(body).latitude;
    coords.longitude = JSON.parse(body).longitude;
    return callback(null, coords);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request("https://iss-pass.herokuapp.com?lat=" + coords.latitude + "&lon=" + coords.longitude, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching upcoming times. Response:\n${body}`;
      callback(Error(msg), null);
      return;
    }

    return callback(null, JSON.parse(body).response);
  });
};

const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((err, ip) => {
    if (err) return callback(err, null);
    fetchCoordsByIP(ip, (err, coord) => {
      if (err) return callback(err, null);
      fetchISSFlyOverTimes(coord, (err, times) => {
        if (err) return callback(err, null);
        return callback(err, times);
      });
    });
  });
};


module.exports = { nextISSTimesForMyLocation };