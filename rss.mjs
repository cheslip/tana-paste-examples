#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title RSS
// @raycast.mode fullOutput

// Optional parameters:
// @raycast.icon ⚡️
// @raycast.argument1 { "type": "text", "placeholder": "RSS feed URL" }
// @raycast.packageName Tana Paste

import Parser from "rss-parser";
import { formatDate } from "./helpers.mjs";
let parser = new Parser();

(async () => {
  console.log("%%tana%%");
  let feed = await parser.parseURL(process.argv[2]);

  feed.items.slice(0, 3).forEach((item) => {
    console.log(`- ${item.title} #blog-post
  - Blog:: [[${feed.title}]]
  - Link:: ${item.link}
  - Publication date:: ${formatDate(new Date(item.pubDate))}
  - ${item.contentSnippet.split("\n").join("\n  - ")}`);
  });
})();
