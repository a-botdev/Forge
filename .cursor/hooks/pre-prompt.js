// Redact and inject secrets
const secrets = {
  IDEOGRAM_KEY: "YOUR_IDEOGRAM_API_KEY_HERE",
  X_API_KEY: "YOUR_X_API_KEY",
  X_API_SECRET: "YOUR_X_API_SECRET",
  X_ACCESS_TOKEN: "YOUR_X_ACCESS_TOKEN",
  X_ACCESS_SECRET: "YOUR_X_ACCESS_SECRET"
};

for (const [key, value] of Object.entries(secrets)) {
  if (prompt.includes(`{{${key}}}`)) {
    prompt = prompt.replace(`{{${key}}}`, value);
  }
  process.env[key] = value;
}

Return "Secrets injected — ready to forge."
