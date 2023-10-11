const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;

const straitTimesUrl = "https://www.straitstimes.com/";
const source = "The Strait Times";
const articles = [];
app.use(cors());

axios(straitTimesUrl)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    $(".card-title", html).each(function () {
      const title = $(this).text().replace("\n", " ").trim();
      const url = $(this).find("a").attr("href");

      articles.push({
        title,
        url,
        source: source,
      });
    });
    console.log(articles);
  })
  .catch((error) => console.log(error));

// Client side
app.listen(PORT, () => console.log(`Little Smol Dot API running on PORT ${PORT}!`));

// Server side
app.get("/", (req, res) => {
    res.json("Welcome to Singapore News API")
})

app.get("/news", (req, res) => {
  res.setHeader("content-type", "application/json");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.json(articles);
});
