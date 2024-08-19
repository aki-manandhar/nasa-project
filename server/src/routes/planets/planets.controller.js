const { getAllPlanets } = require('../../models/planets.model');

// function getAllPlanets(req, res) {
//   return res.status(200).json(planets);
// }
async function httpGetAllPlanets(req, res) {
  return res.status(200).json(await getAllPlanets());
}

module.exports = { httpGetAllPlanets, };