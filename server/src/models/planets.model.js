const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const planets = require('./planets.mongo');

/* const habitablePlanets = []; */

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

/*
const promise = new Promise((resolve, reject) => {
  resolve(42);
});
promise.then(result => {});
const result = await promise;
console.log(result);
*/
function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
    .pipe(parse({
      comment: '#',
      columns: true
    }))
    .on('data', async (data) => {
      if (isHabitablePlanet(data)) {
        // habitablePlanets.push(data);
        savePlanet(data);
      }
    })
    .on('error', (err) => {
      console.log('err :', err);
      reject(err);
    })
    .on('end', async () => {
      const countPlanetsFound = (await getAllPlanets()).length;
      // console.log(`${habitablePlanets.length} habitable Planets found!`);
      console.log(`${countPlanetsFound} habitable Planets found!`);
      resolve();
    });
  });
}

async function getAllPlanets() {
  // return habitablePlanets;
  return await planets.find({}, {
    '_id': 0, '__v': 0
  });
  // ({keplerName: 'Kepler-62 f'}, 
  // { 'keplerName': 1 })
}

async function savePlanet(planet) {
  // await planets.create({
  //   keplerName: data.kepler_name
  // }); 
  try {
    //  insert + update = upsert
    await planets.updateOne({
      keplerName: planet.kepler_name
    }, {
      keplerName: planet.kepler_name,
    }, {
      upsert: true
    });    
  } catch (err) {
    console.error(`Could not save planet: ${err}`);
  }
}

module.exports = {
  loadPlanetsData,
  // planets: habitablePlanets
  getAllPlanets
};
