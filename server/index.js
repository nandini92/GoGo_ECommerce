"use strict";

const PORT = 4000;

const { createServer } = require('./utils');

const  app = createServer();

app.listen(PORT, () => console.info(`Listening on port ${PORT}`));

module.exports = app;