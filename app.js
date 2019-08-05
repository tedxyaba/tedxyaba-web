const express = require('express');
const path = require('path');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Responds with production build of React app in /build.
// Run "yarn build" to build for production.
app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname+'/src/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('TedxYaba App is listening on port ' + port);
