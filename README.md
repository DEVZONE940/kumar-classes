# Kumar Classes — Website

Proposal website for **Kumar Classes**, a coaching centre in Kothrud, Pune 411038.
Prepared by **DEVANSHVERSE**.

| | |
| --- | --- |
| Live | https://devzone940.github.io/kumar-classes/ |
| Stack | Plain HTML, CSS, JS. No build step, no dependencies. |
| Hosting | GitHub Pages, `main` branch, root |

## Sections

Hero (split-letter headline, inset photo, review chip, facts bar) → subject rail →
The academy → Programmes (4 cards) → The method (sticky photo, 3 steps) →
Gallery → Demo class enquiry (WhatsApp handoff) → Visit (map) → Footer.

Motion: intro curtain with a brass rule that draws itself, scroll progress bar,
IntersectionObserver reveals with stagger, clip-path image wipes, drifting rail,
card hover states. All disabled under `prefers-reduced-motion`; a `<noscript>` block
keeps everything visible without JavaScript.

## Verified vs sample

**Taken from the academy's public Google listing (true):**
name, category (coaching centre), address (Rahul Complex, E Wing, Office E/11 & 12,
near Krishna Hospital, Kothrud, Pune 411038), phone +91 70302 93982,
coordinates 18.509151,73.8120284, rating 4.9, review count 223, closing time 8:30 PM.

**Sample copy for design review (must be confirmed or replaced):**
the four programme cards and their subject lists, the three "method" statements,
and the qualitative lines describing the classroom. No numeric results, no topper
claims, no fee figures and no faculty names appear anywhere on the site, because
none of those could be verified.

**Photography:** all five images in `assets/` are AI-generated stand-ins, not photographs
of this academy. Disclosed in the gallery note and the footer.

## Before publishing

1. Confirm every programme, subject and batch described actually runs.
2. Confirm weekly hours (Google only shows a closing time).
3. Replace the five images with the academy's own photographs of the classrooms.
4. Confirm +91 70302 93982 accepts WhatsApp — the enquiry form hands off to it.
5. Remove the two "sample" notices once the copy is signed off.

## Files

```
index.html · styles.css · script.js · robots.txt · sitemap.xml · .nojekyll
assets/hero-classroom.jpg · notes-hand.jpg · library.jpg · whiteboard.jpg · desk-dusk.jpg
```
