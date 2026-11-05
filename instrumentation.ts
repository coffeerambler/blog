export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const { ensureCountryMapFonts } = await import("./src/lib/country-map-fonts");
  ensureCountryMapFonts();
}
