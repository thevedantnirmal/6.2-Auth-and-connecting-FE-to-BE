const express=require("express");
const jwt=require("jsonwebtoken");

const JWT_SECRET="secret";
const app=express();
const user=[];

app.use(express.json())
app.get("/",function(req,res){
    res.sendFile(__dirname+"/main.html")
})

 app.post("/signup",function(req,res){
   const username=req.body.username;
   const password=req.body.password;
   user.push(
    {
        username,password
    }

   )
   console.log(req)

   res.json({
    Result:"You are signed up"
   })
 })
 app.post("/signin",function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    for(var i=0;i<user.length;i++){
        if(user[i].username==username&& user[i].password==password){
            const token=jwt.sign({
                username
            }, JWT_SECRET);
            res.json({
               token: token
            })
        }
    }
    res.json({
        "Message":"Account not signed up"
    })
 })
 app.use(function auth(req,res,next){
    const token=req.headers.token;
    const decodedData=jwt.verify(token,JWT_SECRET)
    let verified_user;
    for(let i=0;i<user.length;i++){
        if(user[i].username==decodedData.username){
           verified_user=user[i];
           next();

        }

    }
    res.json({
        result:"You are not logged in"
    })


 })
 app.get("/me",function(req,res){
    // // const token=req.headers.token;
    // // const decodedData=jwt.verify(token,JWT_SECRET)
    // // for(let i=0;i<user.length;i++){
    // //     if(user[i].username==decodedData.username){
    // //        res.json({
    // //         user:user[i]
    // //        })

    // //     }
    // }
    res.json({
        Message:"You are not authenticated for this"
    })

 })

 app.listen(3000)