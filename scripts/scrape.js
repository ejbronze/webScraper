// Require axios and cheerio, making our scrapes possible
var axios = require("axios");
var cheerio = require("cheerio");

// This function will scrape the newyorkyimby website
var scrape = function() {
  // Scrape the NYYIMBY website
  return axios.get("https://newyorkyimby.com").then(function(res) {
    var $ = cheerio.load(res.data);
    console.log("scraping");
    // Make an empty array to save our article info
    var articles = [];

    // Now, find and loop through each element that is inside of article tags
    // (i.e, the section holding the articles)
    $("article").each(function(i, element) {
      // In each article section, we grab the headline, URL, and summary

      // Grab the headline of the article
      // for this site, those are located within head tags
      var head = $(this)
        .find("a")
        .text()
        .trim();

      // Grab the URL of the article
      var url = $(this)
        .find("a")
        .attr("href");

      // Grab the summary of the article
      var sum = $(this)
        .find("p")
        .text()
        .trim();

      // So long as our headline and sum and url aren't empty or undefined, do the following
      if (head && sum && url) {
        // This section uses regular expressions and the trim function to tidy our headlines and summaries
        // We're removing extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        // Initialize an object we will push to the articles array
        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          url: "https://newyorkyimby.com" + url
        };

        // Push new article into articles array
        articles.push(dataToAdd);
      }
    });
    return articles;
  });
};

// Export the function, so other files in our backend can use it
module.exports = scrape;
