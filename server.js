const express = require("express");
const dbmongoose = require("mongoose");
const app = express();

dbmongoose
  .connect(
    "mongodb+srv://tellommt95:9jZGBkdBod0HqRwb@cluster0.swyfuc8.mongodb.net/?appName=Cluster0"
  )
  .then(() => {
    console.log("db connected");
  })
  .catch((error) => {
    console.log("db can't connect", error);
  });

app.use(express.json());

const Article = require("./models/Article");
const Post = require("./models/Post");

//when we use mongodb we ue the model for anter the model and create the dataase and write and read the records 
app.post("/createArticle", async (req, res) => {
  const newArtile = new Article();
  newArtile.title = "moaz";
  newArtile.body = "moaz";
  newArtile.likes = 10;
  await newArtile.save();
  res.send("article saved succesfully");
});

app.post("/CreatePost", async (req, res) => {
  const newPost = new Post();
  (newPost.title = "new first post ever"),
    (newPost.name = "moaz tello"),
    (newPost.description =
      "this is the tet of the double parameters that containing the large body of the all decription that contain the full mega message allow us to tet the reponse from the client to the server and then we can share the server in vercel or on hostinger"),
    (newPost.isRead = false),
    (newPost.likes = 10);
  await newPost.save();
  res.json({
    message: "the post is save in the db uccesfully",
    title: "new first post ever",
    name: "moaz tello",
    description:
      "this is the tet of the double parameters that containing the large body of the all decription that contain the full mega message allow us to tet the reponse from the client to the server and then we can share the server in vercel or on hostinger",
    isRead: false,
    likes: 10,
  });
});

//this is the bet one of the reload the preference of the 

app.get("/getPostByIdOrName/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const target = await Post.findById(id);
    const target2 = await Post.findOne({ name: id });
    target2 && res.json(target2);
    target && res.json(target);
    !target && !target2 && res.send("no post found")
  } catch (error) {
    console.log("error", error);
    res.json(error);
  }
});

app.get("/hello", (req, res) => {
  res.send("Hi Hi");
});

app.post("/popo", (req, res) => {
  res.send("Hi Hi popo");
});

app.get("/home/:num/:num2", (req, res) => {
  // console.log(req);
  console.log(req.params);
  console.log(req.params.num);
  console.log(req.params.num2);
  res.send(
    `you have send num : ${req.params.num} and num2 : ${req.params.num2}`
  );
});

app.get("/getAllPosts", async (req, res) => {
  const allPosts = await Post.find();
  res.json(allPosts);
});

app.get("/paramsbody", (req, res) => {
  console.log(req.query);
  console.log(req.query.age);
  console.log(req.body);
  console.log(req.body.name);
  console.log(req.body.age);
  res.send(
    `you have send name : ${req.body.name} and age : ${req.body.age}\nthe query parameter is ${req.query.sa}`
  );
});

app.get("/getjson", (req, res) => {
  res.json({
    name: "moaz",
    age: 32,
  });
});


app.get("/htmlfile", (req, res) => {
  res.sendFile(__dirname + "/views/first.html");
});

app.get("/htmlejs", (req, res) => {
  //   res.render(__dirname + "/views/firstejs.ejs", {
  res.render("firstejs.ejs", {
    name: "moaz",
  });
});

app.get("/getAllArticles", async (req, res) => {
  const theArticles = await Article.find();
  console.log("the articles", theArticles);
  res.json(theArticles);
});

app.get("/getArticleId/:id", async (req, res) => {
  try {
    const theArticleId = req.params.id;
    const article = await Article.findById(theArticleId);
    article ? res.json(article) : res.json("the article not found");
  } catch (error) {
    console.log(error);
    res.send({ error: error });
  }
});

app.delete("/getArticleId/:id", async (req, res) => {
  try {
    const theArticleId = req.params.id;
    const article = await Article.findByIdAndDelete(theArticleId);
    article ? res.json(article) : res.json("the article not found");
  } catch (error) {
    console.log(error);
    res.send({ error: error });
  }
});

app.listen(3000, () => {
  console.log("server running on 3000");
});
