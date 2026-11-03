# Portfolio

Animated personal portfolio of Umidjon Norkuziev, full-stack and AI developer.

**Live:** https://umidjon-portfolio-delta.vercel.app/

A single page in plain HTML, CSS and JavaScript. No build step.

## What is in it

- An opening animation: a ball drops, an "I" lands on it and catapults the letters of the name into place, the word turns into the headline, and the headline splits while a portrait builds itself from flying tiles.
- Scroll effects with GSAP ScrollTrigger: line-by-line heading reveals, word-by-word text, a pinned project shelf that the page scroll moves sideways, service rows, magnetic buttons.
- A hand-written WebGL fragment shader that draws the smoke behind the contact section.
- Respects `prefers-reduced-motion`: no intro, no scroll animation, everything visible straight away.

## Files

| Path | What it is |
|---|---|
| `index.html` | Markup and all CSS |
| `assets/app.js` | Intro, portrait, scroll animations, smoke shader, navigation |
| `assets/vendor/` | GSAP 3.13 and ScrollTrigger, saved locally |
| `assets/photo.png` | Photo, also used as the link-preview image |

The portrait is a 72 x 72 grid of brightness values stored in `app.js` (`PORTRAIT`), made once from `assets/photo.png`, so the page never has to read image pixels at runtime.

## Run it

Open `index.html`, or serve the folder:

```bash
python3 -m http.server 4599
```

## Change the intro

At the top of `assets/app.js`:

```js
const WORDMARK = 'UMIDJON';     // falls in during the intro (needs an "I" for the catapult)
const HERO_WORD = 'PORTFOLIO';  // the headline the wordmark turns into
const SPLIT_AT = 4;             // the headline splits after this many letters
```

## Deploy

Hosted on Vercel as a static site:

```bash
vercel deploy --prod --yes
```

## Credits

GSAP and ScrollTrigger are by GreenSock, used under the [GSAP standard license](https://gsap.com/standard-license).
