import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "";

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

// When "Advice" button is clicked
app.post("/get-advice", async (req, res) => {
    try {
        const result = await axios.get("https://api.adviceslip.com/advice");
        res.render("index.ejs", { content: JSON.stringify(result.data.slip.advice) });
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
});

// When "Joke" button is clicked
app.post("/get-joke", async (req, res) => {
    try{
        const result = await axios.get("https://official-joke-api.appspot.com/jokes/random");
        const joke = '-  "' + result.data.setup + '"';
        const punchline = '-  "' + result.data.punchline + '"';
        res.render("index.ejs", { content: joke, punchline: punchline });
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data )});
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});