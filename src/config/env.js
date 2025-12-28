import "dotenv/config";

const required = [
  "DISCORD_TOKEN",
  "ARCHMC_API_BASE",
  "ARCHMC_API_KEY"
];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
}
