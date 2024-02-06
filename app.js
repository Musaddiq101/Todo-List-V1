import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static("public"))

let workTasks = [];
let tasks = [];
let today = new Date();
let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
}
let day = today.toLocaleDateString("en-US", options);

app.get("/", (req, res) => {
    res.render("index.ejs", {
        listTitle: day,
        newTasks: tasks
    })
});

app.post("/submit", (req, res) => {

    let task = req.body["newItem"]
    if (req.body["list"] === "Work List") {
        workTasks.push(task);
        res.redirect("/work")
    } else {
        tasks.push(task)
        console.log(task)
        res.redirect("/");
    }

    
    
});

app.get("/work", (req, res) => {
    res.render("index.ejs", {listTitle: "Work List", newTasks: workTasks})
})

app.post("/work", (req, res) => {
    let item = req.body["newItem"]
    workTasks.push(item)
    res.redirect("/work")
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});