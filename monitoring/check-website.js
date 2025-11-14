import fetch from "node-fetch";
import websites from "./websites.json" assert { type: "json" };

async function checkSite(url) {
  try {
    const res = await fetch(url, { method: "GET", timeout: 5000 });
    if (!res.ok) {
      throw new Error(`Status ${res.status}`);
    }
    console.log(`✅ OK: ${url}`);
    return true;
  } catch (err) {
    console.log(`❌ DOWN: ${url} (${err.message})`);
    throw err; // penting untuk trigger failure() di GitHub Actions
  }
}

async function main() {
  for (const url of websites) {
    await checkSite(url);
  }
}

main();
