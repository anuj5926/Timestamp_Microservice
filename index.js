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
  if (req.params.date !== undefined) {
    const dateObject = new Date(req.params.date);
    if (isValidDate(dateObject) === true) {
      res.json({
        unix: dateObject.getTime(),
        utc: `${dateObject.toUTCString()}`
      });
    }
    else {
      const date = await convertUnixToDate(req.params.date);
      if(date === "Invalid Date"){
       return res.json({
          error:"Invalid Date"
        })
      }
      else{
        console.log("anuj",req.params.date," ", date);
        res.json({
          unix: parseInt(req.params.date),
          utc: date.toString()
        });

      }
    }
  }
  else {
    const currentDate = new Date();
    const formattedDate = currentDate.toUTCString();
    const unixTimestamp = currentDate.getTime();
    // console.log(formattedDate," ",unixTimestamp);
    res.json({
      unix: unixTimestamp,
      utc: formattedDate
    });
  }
});

const convertUnixToDate = (unixTimestamp) => {
  const date = new Date(parseInt(unixTimestamp) ); // Convert milliseconds to seconds
  return date.toUTCString();
};


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
