const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//app.use(express.static('images'));
app.use(express.static('public'));

const https = require("https");

app.use(bodyParser.urlencoded(
    {extended: true}
));

app.listen("3000", function() {
    console.log("Server started at port 3000...");
})

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
    
})

app.post("/", function(req, res) {
    const query = req.body.city;
    
    const apiKey = "d8d3d0b24de1747d674e5398105a1a03";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric";
    https.get(url, function(response) {
        //console.log(response);
        console.log(response.statusCode);

        response.on("data", function(data) {
            

            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;
            console.log(temp);

            const min_temp = weatherData.main.temp_min;
            const max_temp = weatherData.main.temp_max;

            const desc = weatherData.weather[0].description;
            console.log(desc);

            const wind_speed = weatherData.wind.speed;
            const pressure = weatherData.main.pressure;
            const humidity = weatherData.main.humidity;
            
            const icon = weatherData.weather[0].icon;
            const iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            // res.write("<h1> Temperature in " + query + " is " + temp + "</h1>");
            // res.write("<h2> Description is " + desc + "</h2>");
            // res.write("<img src=" + iconURL + ">");

            res.setHeader("Content-type", "text/html");

            res.write("<head>");
                res.write('<link rel="preconnect" href="https://fonts.googleapis.com">');
                res.write('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');
                res.write('<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap" rel="stylesheet">');
            res.write("</head>");

            res.write("<body style='background-color: ghostwhite; font-family: Rubik, sans-serif;'>");
                res.write("<div style='height: 100vh; display: flex; justify-content: center;'>");
                    res.write("<div style='background-color: white; display: flex; width: 60%; flex-direction: column; justify-content: center; align-items: center; margin: 100px 0px; padding: 0px 40px; border-radius: 10px; border: 2px solid lightgray;'>");
                        res.write("<h1 style='font-family: Rubik; font-size: 2rem;'>Right now in " + query + ", there's " + desc + ".</h1>")
                        res.write("<div style='display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr); grid-column-gap: 20px; grid-row-gap: 0px;'>");
                            res.write("<div style='grid-area: 1 / 1 / 4 / 2; display: flex; justify-content: center; align-items: center;'>");
                                res.write("<img src= " + iconURL + " style='height: 190px; width: 190px;'>");
                            res.write("</div>");
                            res.write("<div style='grid-area: 1 / 2 / 3 / 3;'>");
                                res.write("<h1 style='font-family: Rubik; font-size: 4rem; display: flex; justify-content: center; align-items: center;'>" + temp + " C</h1>");
                            res.write("</div>");
                            res.write("<div style='grid-area: 3 / 2 / 4 / 3; display: flex; justify-content: center; align-items: center;'>");
                                res.write("<h1 style='font-family: Rubik; font-size: 2rem;'>" + min_temp + " | " + max_temp + "</h1>");
                            res.write("</div>");
                            res.write("<div style='grid-area: 1 / 3 / 2 / 4; display: flex; justify-content: flex-start; align-items: center; margin-left: 20px;'>");
                                res.write("<p style='font-size: 1.2rem'>Wind speed: " + wind_speed + " mph</p>");
                            res.write("</div>");
                            res.write("<div style='grid-area: 2 / 3 / 3 / 4; display: flex; justify-content: flex-start; align-items: center; margin-left: 20px;'>");
                                res.write("<p style='font-size: 1.2rem'>Pressure: " + pressure + " hPa</p>");
                            res.write("</div>");
                            res.write("<div style='grid-area: 3 / 3 / 4 / 4; display: flex; justify-content: flex-start; align-items: center; margin-left: 20px;'>");
                                res.write("<p style='font-size: 1.2rem'>Humidity: " + humidity + " %</p>");
                            res.write("</div>");
                        res.write("</div>");
                    res.write("</div>");
                res.write("</div>");
            res.write("</body>");

            res.send();
        })
        
        
    })
})


