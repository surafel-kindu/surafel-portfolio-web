#!/usr/bin/env node
/**
 * Dev-server wrapper for `npm run dev`.
 * Forwards CLI host/port arguments (e.g. `npm run dev -- --port 7100 --host 0.0.0.0`)
 * to react-scripts, which reads them from the PORT / HOST environment variables.
 */
const args = process.argv.slice(2);

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  const [key, inlineValue] = arg.includes("=") ? arg.split(/=(.*)/s, 2) : [arg, null];
  const value = () => (inlineValue !== null && inlineValue !== undefined ? inlineValue : args[++i]);

  if (key === "--port" || key === "-p") {
    process.env.PORT = String(value());
  } else if (key === "--host") {
    process.env.HOST = String(value());
  }
}

if (!process.env.BROWSER) {
  process.env.BROWSER = "none";
}

require("react-scripts/scripts/start");
