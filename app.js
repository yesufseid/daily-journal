const express=require("express");
const bodyparse=require("body-parser");
const app=express();
app.use(bodyparse.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
const listoftitle=[];
const listofpost=[];
const sliceposts=[];
const imagelist=[];


 app.get("/log-in",function(req,res){
     res.render("log-in.ejs")
 })


app.get("/",function(req,res){
    res.render("home.ejs",{TITLE:listoftitle,POST:sliceposts})
})

app.post("/",function(req,res){
    const list=req.body.button;
    res.render("posts.ejs",{TITLE:listoftitle[list],POST:listofpost[list],image:imagelist[list]})
})


///app.get("/compose",function(req,res){
    
//})
app.post("/compose",function(req,res){
    const title=req.body.title;
    const post=req.body.post;
    const image=req.body.img
    imagelist.push(image);
    const slicepost = post.slice(0, 100);
    sliceposts.push(slicepost)
    listoftitle.push(title);
    listofpost.push(post);
    res.redirect("/")
    
})

app.post("/log-in",function(req,res){
    var pass=req.body.password
    if (pass == "seya") {
        res.render("Compose.ejs")
    } else{
        res.redirect("/log-in")
    }
})



const port=process.env.PORT || 3000 ;
app.listen(port,function(){
    console.log("the server is run on port 3000");
})
