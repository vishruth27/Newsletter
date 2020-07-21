//jshint esversion:6
const https = require("https");
const bodyParser = require("body-parser")
const express = require("express");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    //const audienceID = 'add audeince id here'
    const url = "https://us10.api.mailchimp.com/3.0/lists/" + audienceID;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    jsonData = JSON.stringify(data);

    //auth variable is a string, which stores any string, followed by a colon, followed by your API key
    //for ex, auth: 'name:fdjsdfjgneroinoirebgoindfewinf'
    
    const options = {
        method: "POST",
        auth: ""
    };


    const request = https.request(url, options, (response) => {
        if (response.statusCode == 200) {
            res.sendFile(__dirname + '/success.html')
        } else {
            res.sendFile(__dirname + '/failure.html')
        }

        response.on("data", (data) => {
            console.log(data);
        });
    });

    request.write(jsonData);
    request.end();
});

app.post('/failure', (req, res) => {
    res.redirect('/')
});


app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port 3000.");
});

