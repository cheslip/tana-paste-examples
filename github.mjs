#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title GitHub
// @raycast.mode fullOutput

// Optional parameters:
// @raycast.icon ⚡️
// @raycast.argument1 { "type": "text", "placeholder": "Owner" }
// @raycast.argument2 { "type": "text", "placeholder": "Repo" }
// @raycast.packageName Tana Paste

import { Octokit } from "octokit";
import { formatDate } from "./helpers.mjs";
import { config } from "./config.mjs";

const octokit = new Octokit({
  auth: config.githubToken,
});

const owner = process.argv[2];
const repo = process.argv[3];

const res = await octokit.rest.pulls.list({
  owner,
  repo,
});

console.log("%%tana%%");
res.data.slice(0, 5).forEach((x) => {
  console.log(`- ${x.title} #PR`);
  console.log(`  - PR Created:: [[${formatDate(x.created_at)}]]`);
  console.log(`  - Github User:: [[${x.user.login}]]`);
  console.log(`  - State:: ${x.state}`);
  console.log(`  - PR Link:: ${x.html_url}`);
  console.log(`  - Description:`);
  x.body?.split("\n").forEach((f) => console.log(`    - ${f}`));
});
