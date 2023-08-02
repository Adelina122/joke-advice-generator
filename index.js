import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    // res.send("Hello");
    res.render("index.ejs", { content: "Click a button" });
});

app.post("/get-advice", async (req, res) => {
    try {
        const result = await axios.get("https://api.adviceslip.com/advice");
        res.render("index.ejs", { content: JSON.stringify(result.data.slip.advice) });
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});