const express = require('express');
const cors = require('cors');
const axios = require('axios');
const CircularJSON = require('circular-json');
const bodyParser = require('body-parser');

const app = express();

// const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5501");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
// write a javascript function to get the lat and long of the user 

app.post('/pbs',async (req,res)=>{
  const param = req.body.data;
  const param1 = param.lat;
  const param2 = param.lng;
    console.log(CircularJSON.stringify(param.lat));
    console.log(CircularJSON.stringify(param.lng));
    console.log(CircularJSON.stringify(req));

    let da = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+param1+"%2C"+param2+"&radius=1500&type=pbs%20&keyword=pbs&key=AIzaSyD-wRH1VTYqhyihl015jMYm6scpLDKkQt4"
    console.log(da);
    axios
    .get(da)
    .then(function (response) {  
    
        const busStopData = response.data.results.map(result => ({
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng,
            name: result.name
          }));
     
        let data = [['Lat', 'Lng','Name']];
        busStopData.forEach(stop => {
            console.log(stop);
        data.push([stop.lat, stop.lng, JSON.stringify(stop.name)]);
});
        console.log(data);
        res.send(data);
    
    });
})
app.post('/bus',async (req,res)=>{
    const param = req.body.data;
    const param1 = param.lat;
    const param2 = param.lng;
      console.log(CircularJSON.stringify(param.lat));
      console.log(CircularJSON.stringify(param.lng));
      console.log(CircularJSON.stringify(req));
  
      let da = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+param1+"%2C"+param2+"&radius=1500&type=bus%20&keyword=bus&key=AIzaSyD-wRH1VTYqhyihl015jMYm6scpLDKkQt4"
      console.log(da);
      axios
      .get(da)
      .then(function (response) {  
      
          const busStopData = response.data.results.map(result => ({
              lat: result.geometry.location.lat,
              lng: result.geometry.location.lng,
              name: result.name
            }));
       
          let data = [['Lat', 'Lng','Name']];
          busStopData.forEach(stop => {
              console.log(stop);
          data.push([stop.lat, stop.lng, JSON.stringify(stop.name)]);
  });
          console.log(data);
          res.send(data);
      
      });
  })
app.listen('5555',()=>console.log('http://localhost:5555/'));
















    // working place google api

    // axios
    // .get("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=AIzaSyD-wRH1VTYqhyihl015jMYm6scpLDKkQt4")
    // .then(function (response) {
    //     const result = JSON.stringify(response.data);   
    
    // const result1 = response.data
    // const geometry = result1.candidates[0].geometry;
    // console.log(geometry);
    //   res.json(geometry);
    // });
    // const result = req.body;
    // console.log(JSON.stringify(result));






       // for(let i=0;i<response.data.results.length;i++){
        //     busStopData.push(response.data.results[i].geometry.location, response.data.results[i].name);
        //     // console.log(JSON.stringify(response.data.results[i].geometry.location));
        //     // console.log(JSON.stringify(response.data.results[i].name));
        // }