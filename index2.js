const { nextISSTimesForMyLocation } = require("./iss_promised");

nextISSTimesForMyLocation()
  .then((passTimes) => {
    for (const pass of passTimes) {
      const timeMillisecEST = new Intl.DateTimeFormat("en-CA", { dateStyle: "full", timeStyle: "full", timeZone: "America/Toronto" }).format(new Date(pass.risetime * 1000));

      console.log(`Next pass at ${timeMillisecEST} for ${pass.duration} seconds!`);
    }
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });