import express from "express";
import fetch from "node-fetch";
import { parseString } from "xml2js";
import cors from "cors";
const app = express();
const PORT = 3000;

// Use the cors middleware
app.use(cors());

// Endpoint to fetch the RSS feed and return it as JSON
app.get("/rss", async (req, res) => {
  const rssUrl = req.query.url; // Get the RSS URL from query parameters

  if (!rssUrl) {
    return res.status(400).send("RSS URL is required");
  }

  try {
    // Fetch the RSS feed
    const response = await fetch(rssUrl);
    const rssData = await response.text();

    // Parse the RSS XML data to JSON
    parseString(rssData, (err, result) => {
      if (err) {
        return res.status(500).send("Error parsing RSS feed");
      }

      // Extract the feed items (articles)
      const items = result.rss.channel[0].item;

      // Send the extracted data to the client
      res.json({ items });
    });
  } catch (error) {
    res.status(500).send("Error fetching RSS feed");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
