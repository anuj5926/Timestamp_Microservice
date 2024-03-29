// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return !isNaN(date);
};

app.get("/api/:date?", async function (req, res) {
  const dateObject = new Date(req.params.date);
  if(isValidDate(dateObject)=== true){
    res.json({
      unix: dateObject.getTime(),
      utc: `${dateObject.toUTCString()}`
    });
  }
  else{
    const date = await convertUnixToDate(req.params.date);
    console.log(date)
    res.json({
      unix: req.params.date,
      utc: date
    });
  }
});

const convertUnixToDate = (unixTimestamp) => {
  const date = new Date(unixTimestamp / 1000); // Convert milliseconds to seconds
  const options = {
    weekday: 'short', // Short day name (e.g., "Fri")
    day: '2-digit', // Day of the month (e.g., "25")
    month: 'short', // Short month name (e.g., "Dec")
    year: 'numeric', // Full year (e.g., "2015")
    hour: '2-digit', // Hour in 24-hour format (e.g., "00")
    minute: '2-digit', // Minutes (e.g., "00")
    second: '2-digit', // Seconds (e.g., "00")
    timeZoneName: 'short', // Time zone name (e.g., "GMT")
  };
  return date.toLocaleString('en-US', options);
};

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
