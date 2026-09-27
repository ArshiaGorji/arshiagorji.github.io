# Portfolio website — Mohammad Arshia Gorji

A bilingual (English / فارسی), responsive portfolio built with plain **HTML, CSS and JavaScript**.
No frameworks, no build step, no database, so it can be hosted **free, permanently** on GitHub Pages.

- All text lives in two files: `content/en.js` (English) and `content/fa.js` (Persian).
- Colors, languages and theme live in `content/settings.js`.
- Light and dark mode, a language switch, a mobile menu, project filters and scroll animations are built in.
- Works on phones, tablets and desktops, and prints as a clean CV (Ctrl + P).

---

## What's in the folder

```
portfolio/
├── index.html            ← page skeleton + link-preview tags (rarely edited)
├── 404.html              ← "page not found" page
├── .nojekyll             ← tells GitHub Pages to publish files exactly as they are
├── README.md             ← this guide
├── content/
│   ├── settings.js       ← languages, colors, theme, animations
│   ├── en.js             ← ALL English text
│   └── fa.js             ← ALL Persian text
└── assets/
    ├── css/style.css     ← design
    ├── js/main.js        ← builds the page from the content files (no need to edit)
    ├── img/profile.jpg   ← your photo
    ├── img/favicon.svg   ← browser-tab icon
    └── files/            ← put a CV PDF here if you want a download button
```

---

## 1. See it on your computer

Double-click **`index.html`**. It opens in your browser, no installation needed.
After every edit: **save the file → refresh the browser (F5)**.

To edit the files, use any text editor. The free **[Visual Studio Code](https://code.visualstudio.com/)** is recommended:
it colors the code and underlines mistakes in red.

> **Windows users:** don't double-click the `.js` files. Windows would try to *run* them and show an error.
> Right-click → **Open with** → Visual Studio Code (or Notepad) instead. In VS Code you can also open the
> whole `portfolio` folder via **File → Open Folder**.

---

## 2. Editing the content

Open `content/en.js` (and `content/fa.js` for Persian). Everything on the page is there, in page order.

### The three rules that keep the file working

1. Text goes inside **double quotes**: `title: "Financial Analyst",`
2. **Every item ends with a comma**, even the last one.
3. Don't delete the brackets `{ }` and `[ ]` that wrap each item and list.

If you break one of these, the page shows a yellow bar or a message naming the **file and line number**.
Look at that line and the line just above it.

### Change text

Just edit what's between the quotes. Inside text you can use:

| You write | You get |
|---|---|
| `**important**` | **important** |
| `*nuance*` | *nuance* |
| `[my article](https://example.com)` | a clickable link |

### Add an item (example: a new job)

In the `experience` section, copy a whole block from `{` to `},`, paste it **above** the first job
(so the newest is on top), and change the text:

```js
{
  title: "Senior Financial Analyst",
  place: "Company Name",
  period: "Jan 2027 – Present",
  location: "Tehran",
  points: [
    "What you did, one line per point",
    "Another achievement",
  ],
  tags: ["Valuation", "Power BI"],
},
```

The same copy-paste-edit method works for projects, certificates, skills, courses, anything.
Then add the Persian version to `content/fa.js`, or skip it if it should appear only in English.

### Remove or hide something

- **Remove:** delete the whole `{ … },` block.
- **Hide but keep for later:** add `hidden: true,` inside the block. This works on any item or on a whole section.

> Everything in these files is public: anyone can open `content/en.js` in their browser.
> A hidden item is not shown on the page, but it's still readable in the file. Never put private information here.

### Add a completely new section

Copy any section block inside `sections: [ … ]`, give it a new unique `id`, and choose a `type`.
Fields every section can have:

| Field | Meaning |
|---|---|
| `id` | Unique short name, no spaces (used in links like `#projects`) |
| `type` | One of the types below |
| `menu` | Name in the top menu. Leave it out to keep the section out of the menu |
| `eyebrow` | Small gold label above the title |
| `title` | Section title |
| `intro` | Optional sentence under the title |
| `columns` | Max cards per row (1–4), for `cards`, `projects`, `list`, `skills` |
| `hidden` | `true` hides the whole section |

The section types:

| `type` | Good for | Each item can have |
|---|---|---|
| `about` | Intro text + a card of quick facts | `paragraphs: [ … ]`, `facts: [{ icon, label, value, link }]` |
| `cards` | Expertise, services, testimonials | `icon, title, text, points, tags, image, link, linkLabel` |
| `timeline` | Jobs, education, volunteering, anything with dates | `title, place, period, location, badge, text, points, tagsLabel, tags, link` |
| `projects` | Projects with automatic filter buttons | `category, icon, subtitle, title, text, points, tags, image, link, linkLabel` |
| `skills` | Groups of skills | `groups: [{ title, icon, style, items }]`, where `style` is `"tags"`, `"list"` or `"levels"` (levels items: `{ name, level, value: 0–100 }`) |
| `list` | Certificates, awards, publications, memberships | `icon, label, title, subtitle, date, text, link` |
| `contact` | The dark contact panel | `text, button: { label, link }`, `items: [{ icon, label, value, link, copy: true }]` |
| `text` | Anything free-form | `paragraphs: [ … ], points, image` |

Example: adding a *Volunteering* section (there is also a ready-made example at the end of `sections` in `en.js`):

```js
{
  id: "volunteering",
  type: "timeline",
  menu: "Volunteering",
  eyebrow: "Beyond work",
  title: "Volunteering",
  items: [
    { title: "Mentor", place: "Startup Weekend Tehran", period: "2026", text: "Helped teams build financial models." },
  ],
},
```

### Reorder sections or the menu

The page shows sections in the order they appear in `sections: [ … ]`. Move a whole block up or down to reorder.
The top menu follows the same order and lists only sections that have a `menu` name.

### Common edits

| I want to… | Do this |
|---|---|
| **Add my LinkedIn link** | Paste your profile address (e.g. `https://www.linkedin.com/in/your-id`) into the empty `link: ""` in `social` **and** in the `contact` section, in both `en.js` and `fa.js` |
| Change the photo | Replace `assets/img/profile.jpg` with a new square photo with the same name (600×600 px or larger looks sharpest) |
| Add a "Download CV" button | Put your PDF in `assets/files/` (e.g. `cv.pdf`), then remove the `//` in front of the *Download CV* line in `profile.buttons` |
| Link a certificate | Add `link: "https://…",` to that certificate. Its title becomes clickable |
| Add a project image | Put the image in `assets/img/` and add `image: "assets/img/my-project.jpg",` to the project |
| Change the highlight numbers | Edit `profile.stats` |
| Remove the phone number | Delete the phone line in the `contact` section (in both files) |
| Change the "Open to…" badge | Edit `profile.status`, or set it to `""` to hide it |

### Colors, theme, languages: `content/settings.js`

- **Colors:** change `accent` (gold), `heading` (navy), `background`, `surface` (cards), `text`, `panel` (dark contact box and main buttons), separately for light and dark mode. Everything else adapts.
- **Theme:** `default: "light"`, `"dark"` or `"auto"` (follows the visitor's phone/computer setting). `showToggle: false` hides the sun/moon button.
- **English only:** `languages: ["en"]`. You can also delete `content/fa.js` and its `<script>` line in `index.html`.
- **Persian first:** `defaultLanguage: "fa"`.
- **No animations:** `animations: false`.
- Link straight to a language with `?lang=fa`, e.g. `https://yourname.github.io/?lang=fa`.

### Icons

Use any of these names wherever you see `icon: "…"`:

`activity` `alert` `archive` `arrow-right` `arrow-up` `award` `bar-chart` `book` `briefcase` `calculator`
`calendar` `check` `clock` `compass` `copy` `cpu` `database` `dollar` `download` `droplet` `email`
`external` `file-text` `github` `globe` `graduation` `grid` `instagram` `layers` `lightbulb` `link`
`linkedin` `location` `mail` `map` `map-pin` `medical` `message` `moon` `phone` `pie-chart`
`presentation` `search` `send` `shield` `sliders` `sparkles` `star` `sun` `target` `telegram`
`trending-up` `users` `website` `whatsapp` `zap`

### Link previews (WhatsApp, LinkedIn, Telegram…)

The preview title, description and image come from the top of `index.html`.
**After the site is live**, replace `YOUR-SITE-ADDRESS` in the `og:image` line with your real address,
for example `https://yourname.github.io/assets/img/profile.jpg`.

---

## 3. Publish it free on GitHub Pages (step by step)

GitHub Pages hosts static websites like this one **for free with no time limit**: no ads, HTTPS included,
nothing to renew. You only need a free GitHub account. All of this happens in the browser; no software to install.

### Step 1: Create a GitHub account

1. Go to **https://github.com/signup** and sign up (free plan).
2. Pick your **username** carefully: your site address will be **`https://USERNAME.github.io`**.
3. Verify your email. If GitHub asks you to turn on two-factor authentication, follow its prompts.

### Step 2: Create the repository

1. Click **+** (top right) → **New repository**.
2. **Repository name:** exactly `USERNAME.github.io`, with your username in lowercase, e.g. `arshiagorji.github.io`.
3. Choose **Public**. Leave everything else as it is.
4. Click **Create repository**.

### Step 3: Upload the website files

1. On the new, empty repository page, click the link **"uploading an existing file"**.
2. On your computer, open the `portfolio` folder, select **everything inside it** (Ctrl + A),
   and drag it into the browser window.
   Upload the *contents*, not the folder itself: `index.html` must end up at the top level.
3. Wait until all files are listed, then click **Commit changes**.

### Step 4: Turn on GitHub Pages

1. In the repository, open **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**,
   **Branch** to **`main`**, folder **`/ (root)`**, and click **Save**.
3. Wait 1–2 minutes and refresh. The page shows **"Your site is live at https://USERNAME.github.io"**.

Done: that address is your permanent, free website. Share it on LinkedIn, your CV and your email signature.

> A different repository name (e.g. `portfolio`) also works; the site will be at
> `https://USERNAME.github.io/portfolio/`. In that case, change the "Back to home" link in `404.html`
> from `/` to `/portfolio/`.

### Updating the site later

**Quick edits in the browser (easiest):**
1. Open your repository on github.com and click the file, e.g. `content` → `en.js`.
2. Click the **pencil icon ✏️** ("Edit this file"), make your change, then **Commit changes…** → **Commit changes**.
3. About a minute later the live site is updated. Press **Ctrl + F5** to refresh without the old cache.

Tip: on the repository page, press the **`.`** key to open a full code editor in the browser (github.dev).

**Replacing files (photo, CV, many edits):** edit and check the files on your computer first,
then in the repository go to the right folder → **Add file** → **Upload files** and drop the new versions.
A file with the same name replaces the old one.

**Check after each update:** open the live site. If a yellow "Content file error" bar appears, fix the line it mentions.

### Optional

- **Your own domain** (like `arshiagorji.com`) costs money (~$10/year from a registrar), so it's *not* needed.
  The `github.io` address stays free forever. If you buy one later: Settings → Pages → Custom domain.
- **Show up on Google faster:** add the site for free in [Google Search Console](https://search.google.com/search-console).
- **Other free hosts** that work with these same files: **Cloudflare Pages** (create a Pages project and choose
  direct upload of the folder) or **Netlify** (drag the folder onto *app.netlify.com/drop*).
  GitHub Pages is recommended because updates are simplest.

---

## 4. Good to know

- **Cost:** GitHub Pages is free for public repositories: no trial, no expiry. Its limits
  (1 GB site size, about 100 GB of traffic per month) are far more than a portfolio uses.
- **Privacy:** every file you upload is public, including the text files. Your phone number and email are shown
  on the site; remove them from the `contact` section if you prefer. Your date of birth was intentionally left out.
- **No cookies, no tracking.** The only outside service used is Google Fonts; if it's unavailable,
  the site falls back to system fonts automatically.
- **Browsers:** works in all current browsers (Chrome, Edge, Safari, Firefox; desktop and mobile).
