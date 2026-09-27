/* =====================================================================
   SITE SETTINGS
   ---------------------------------------------------------------------
   Options for the whole website: languages, colors, theme, animations.
   The actual text of the site lives in:
     content/en.js  → English
     content/fa.js  → Persian (فارسی)

   Tip: after editing, save the file and refresh the browser.
   ===================================================================== */

window.SITE_SETTINGS = {

  /* Languages the site offers. The first-time visitor sees
     `defaultLanguage`; a small button in the top bar switches language.
       English only → languages: ["en"]
       Persian only → languages: ["fa"], defaultLanguage: "fa"            */
  languages: ["en", "fa"],
  defaultLanguage: "en",

  theme: {
    /* "light", "dark", or "auto" (follow the visitor's device setting) */
    default: "light",
    /* Show the sun / moon button so visitors can switch themselves */
    showToggle: true
  },

  /* Brand colors. Any CSS color works: "#0f2440", "rgb(15 36 64)", "teal"…
     Everything else (borders, soft backgrounds, muted text) is derived
     from these automatically.                                          */
  colors: {
    light: {
      accent: "#a8834b",      // gold — lines, icons, highlights
      heading: "#0f2440",     // navy — headings
      background: "#f7f5f0",  // page background
      surface: "#ffffff",     // cards
      text: "#1f2937",        // body text
      panel: "#0f2440"        // dark contact panel & primary buttons
    },
    dark: {
      accent: "#d2ae72",
      heading: "#eef1f7",
      background: "#0a1322",
      surface: "#111d31",
      text: "#cdd5e1",
      panel: "#132440"
    }
  },

  /* Gentle fade-in animations while scrolling (true / false) */
  animations: true
};
