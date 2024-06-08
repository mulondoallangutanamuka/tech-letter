const express = require("express");
const app  = express();
const bodyParser = require("body-parser");
// const client = require("@mailchimp/mailchimp_marketing");      Only If method 1 is used
const https = require("https");

                    // 1
app.use(bodyParser.urlencoded({extended:true}));
// var apiKey = "fc45d8670a05a4cd8a517198664a5345-us18"
// var server = "us18"
// var audienceId =  "e8f6055ed0";

// app.get("/", (req, res)=>{
//     res.sendFile(__dirname + "/index.html");
// });

// app.post("/", (req, res)=>{
//     var firstName = req.body.fname;
//     var lastName = req.body.lname;
//     var email = req.body.email;

//     client.setConfig({
//     apiKey: apiKey,
//     server: server,
//     });

//     const run = async () => {
//     const response = await client.lists.batchListMembers(audienceId, {
//         members: [{
//             email_address:email,
//             status:"subscribed",
//             merge_fields: {
//                 FNAME : firstName,
//                 LNAME : lastName,
//             }
//         }],
//     });
//     console.log(response);
//     };

//     run();

//     res.send("Welcome");
//     // console.log(firstName, lastName, email);
// });

// app.listen(3000, ()=>{
//     console.log("Listening on port 3000");
// });


// Or

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res)=>{
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    var data = {
        members : [{
            email_address : email,
            status: "subscribed",
            merge_fields: {
                LNAME : lastName,
                FNAME : firstName, 
            }
        }]
    };


    const jsonData = JSON.stringify(data);
    const url = "https://us18.api.mailchimp.com/3.0/lists/e8f6055ed0";
    const options = {
        method: "POST",
        auth : "allanmg:fc45d8670a05a4cd8a517198664a5345-us18"
    };

    const request = https.request(url, options, (response)=>{
        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname + "/failed.html")
        }
        response.on("data", (data)=>{
            console.log(JSON.parse(data));
        });
    })

    request.write(jsonData);
    request.end();


  // console.log(firstName, lastName, email);
});

app.post("/success", (req, res)=>{
    res.redirect("/");
})
app.post("/failed", (req, res)=>{
    res.redirect("/");
})

app.listen(process.env.PORT||3000, ()=>{
    console.log("Listening on port 3000");
});



