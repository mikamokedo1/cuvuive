import fs from "fs";
import path from "path";
import https from "https";

const DEST_DIR = path.join(process.cwd(), "src", "assets", "games", "learn-flag");

if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

// Map of standard 2-letter country codes to the filenames we want
const flags = {
  // Asia
  vn: "vietnam",
  jp: "japan",
  kr: "southkorea",
  cn: "china",
  th: "thailand",
  in: "india",

  // Europe
  gb: "uk",
  fr: "france",
  de: "germany",
  it: "italy",
  es: "spain",
  ru: "russia",

  // Americas
  us: "usa",
  ca: "canada",
  br: "brazil",
  ar: "argentina",
  mx: "mexico",
  co: "colombia",

  // Africa & Oceania
  za: "southafrica",
  eg: "egypt",
  au: "australia",
  ng: "nigeria",
  ma: "morocco",
  ke: "kenya",
};

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode === 200) {
          res
            .pipe(fs.createWriteStream(filepath))
            .on("error", reject)
            .once("close", () => resolve(filepath));
        } else {
          // Consume response data to free up memory
          res.resume();
          reject(new Error(`Request Failed With a Status Code: ${res.statusCode} for ${url}`));
        }
      })
      .on("error", reject);
  });
};

async function main() {
  for (const [code, filename] of Object.entries(flags)) {
    // flagcdn expects lowercase codes and w320 is a valid size mapping
    const url = `https://flagcdn.com/w320/${code}.png`;
    const filepath = path.join(DEST_DIR, `${filename}.png`);

    console.log(`Downloading ${filename} from ${url}...`);
    try {
      await downloadImage(url, filepath);
    } catch (e) {
      console.error(e.message);
    }
  }
}

main();
