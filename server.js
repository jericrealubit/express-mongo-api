const express = require("express") 
const app = express() 

// needed for adding a document
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.listen(3000) // run the server

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index", { text: "World" })
})

const userRouter = require("./routes/users")
app.use("/users", userRouter)
