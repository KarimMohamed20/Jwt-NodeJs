const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();


app.get("/api", (req,res)=> {
    res.json({
        message:"Welcome to the API"
    });
});

app.post("/api/posts", verifyToken ,(req,res)=>{
    jwt.verify(req.token,"secretkey",
    (err,authData) => {
        if(err){
            res.json({
                error:"your token is not correct"
            })
        } else {
            res.json({
                message:"Success!",
                authData
            })
        }
    }
    );
    
})
app.post("/api/login", (req,res)=>{
    const user = {
        id:1,
        name:"KarimMohamed",
        password:"karim1234"
    }
    jwt.sign(
        {user},
        'secretkey',
        (err,token)=>{

            if (err == null){
            res.json({
                token
            });
        }

        if (err !== null) {
            res.json({
                err
            })
        }
    }
    );
})

function verifyToken(req,res,next) {
    const bearerHeader = req.headers["authorization"]

    const bearer = bearerHeader.split(" ");

    const bearerToken = bearer[1];

    req.token = bearerToken

    next();
    if(typeof bearerHeader !== "undefined"){

    } else {
        res.json({
            error:"your token is not correct"
        })
    }
}
app.listen(5000,()=> console.log("Server Started On Port 5000"));