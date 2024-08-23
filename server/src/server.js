const http = require('http');
// const mongoose = require('mongoose');

const app = require('./app');
const { mongoConnect } = require('./services/mongo');
const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;
// console.log(PORT);

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}...`);
  });
  // app.listen();
}

startServer();
// ...
