//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash"); // requiring the package called lodash

const homeStartingContent = " When you were a teenager, you might have kept a diary hidden under your mattress. It was a place to confess your struggles and fears without judgment or punishment. It likely felt good to get all of those thoughts and feelings out of your head and down on paper. The world seemed clearer.You may have stopped using a diary once you reached adulthood. But the concept and its benefits still apply. Now it’s called journaling.";
const aboutContent = "Keeping a journal helps you create order when your world feels like it’s in chaos. You get to know yourself by revealing your most private fears, thoughts, and feelings. Look at your writing time as personal relaxation time. It's a time when you can de-stress and wind down. Write in a place that's relaxing and soothing, maybe with a cup of tea. Look forward to your journaling time. And know that you're doing something good for your mind and body.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//..........................................................................................................


let myPostsList=[ {
    myPostTitle: "Day1",
    myPostBody: "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat."
  }];



//............................................................................................................


app.get("/",function(req,res){
  res.render("home",{
  homeStartingContent:homeStartingContent ,
  newAddedBlogs:myPostsList});
 
})

app.get("/about",function(req,res){
  res.render("about",{
    aboutPageContent:aboutContent });
})

app.get("/contact",function(req,res){
  res.render("mycontact",{
    ContactPageContent:contactContent });
})

app.get("/compose",function(req,res){
  res.render("compose",{
     });
})


app.get('/post/:postname', (req, res) => {
  // console.log(req.params);
 const requestTitle= _.lowerCase(req.params.postname);

 myPostsList.forEach(function(post){
  const storedTitle=_.lowerCase(post.myPostTitle);             // ???????? 

  if(storedTitle===requestTitle){
   res.render("post",{
       title:post.myPostTitle,
       content:post.myPostBody,
   })
  }
 });

});








app.post("/compose",function(req,res){
  const myPostObject={
     myPostTitle:req.body.postTitle,
     myPostBody:req.body.postBody
  };
   myPostsList.push(myPostObject);

   res.redirect("/");
 
})







app.listen(3000, function() {
  console.log("Server started on port 3000");
});



// nodemon  restarts server only when we make changes in app.js,   