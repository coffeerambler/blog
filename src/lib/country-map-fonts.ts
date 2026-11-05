import { mkdirSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import path from "path";

let configured = false;

/** Point fontconfig at the bundled DejaVu TTFs so sharp can rasterize SVG labels on Vercel. */
export function ensureCountryMapFonts() {
  if (configured) return;
  const fontsDir = path.join(process.cwd(), "assets", "fonts");
  const confDir = path.join(tmpdir(), "country-map-fontconfig");
  const confPath = path.join(confDir, "fonts.conf");
  mkdirSync(confDir, { recursive: true });
  writeFileSync(
    confPath,
    `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "urn:fontconfig:fonts.dtd">
<fontconfig>
  <dir>${fontsDir}</dir>
  <cachedir>${path.join(tmpdir(), "country-map-fonts-cache")}</cachedir>
</fontconfig>
`,
  );
  // FILE selects this conf; PATH is also set for libraries that only honor FONTCONFIG_PATH.
  process.env.FONTCONFIG_FILE = confPath;
  process.env.FONTCONFIG_PATH = confDir;
  configured = true;
}
