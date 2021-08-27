const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  for (const pass of passTimes) {
    const timeMillisecEST = new Intl.DateTimeFormat("en-CA", {dateStyle: "full", timeStyle: "full", timeZone: "America/Toronto"}).format(new Date(pass.risetime * 1000));

    console.log(`Next pass at ${timeMillisecEST} for ${pass.duration} seconds!`);
  }
});