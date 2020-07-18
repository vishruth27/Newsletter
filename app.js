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
    const url = "https://us10.api.mailchimp.com/3.0/lists/8701901c0f";

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

    const options = {
        method: "POST",
        auth: "vishruth:653a9aeebe60f0f77efb6ae80a65d9ad-us10"
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

