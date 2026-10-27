# Clean My Face — Responsive Website (HTML + CSS + JavaScript)

An actual **two-page ecommerce storefront design**, based on the uploaded homepage and shop page references. All artwork was extracted from the supplied `Clean my Face.zip`, with responsive composition for mobile, tablet, and desktop.

## Pages

- `index.html` — homepage (hero, science/brand story, best sellers, skin solutions, **infinite-loop product carousel**, editorial collage, closing CTA)
- `shop.html` — shop inner page with **working collection / product type / ingredient filters**, sorting, product cards, and buttons
- `product.html?id=heartleaf-oil` — reusable product details, quantity selector, and add-to-bag
- `about.html` — brand story and formulation philosophy
- `contact.html` — FAQ and prelaunch support information

## Actual working interactions

- Mobile menu / navigation; search across the product catalog; searchable product details
- Product cards link to detail pages; add-to-bag and quantity controls
- Local cart drawer that **persists across pages** using `localStorage`
- Home carousel loops seamlessly in both directions and auto-advances. Manual arrows and touch swipe are supported. Auto-advance pauses on hover/focus and with reduced-motion preference.
- Shop filter sidebar collapse; multiple filter selection; clear filters; URL collection filter; price/name sort
- All key buttons and links have destinations/actions; the checkout button explicitly explains that real payments are not connected.

## Run locally

Use a local server instead of opening `file:///` so browser behavior matches GitHub Pages.

```bash
python -m http.server 8000
```

Open **http://localhost:8000**.

## Upload to GitHub Pages

1. Create a new public GitHub repository (e.g. `clean-my-face-website`).
2. Upload **the contents of this folder**, not the enclosing folder. In particular, `index.html` must be at repository root.
3. Commit the files.
4. Navigate to **Settings → Pages → Build and deployment → Deploy from a branch**, choose `main` and `/ (root)`, then Save.
5. When GitHub finishes deployment, open the Pages URL. **Every page uses relative asset paths**, so the site also works under a project repository path.

Alternatively, clone your repository and copy this folder's contents into it, then `git add . && git commit -m "Add responsive Clean My Face website" && git push`.

## IMPORTANT: Before launching a real store

- **Demo product prices** in `js/products.js` are sample numbers for design/testing, *not verified retail prices*. Please replace and approve them.
- **No verified product ratings/review counts** were supplied, so the website does not manufacture reviews.
- **Payment checkout is NOT connected**. The cart is frontend/local only, and clicking Checkout setup needed explains what remains.
- Replace photos of prototype/AI product packaging with final authorized product images if needed; verify every product benefit/ingredient/medical claim before publishing.
- Official business contact, address, policies, shipping and delivery terms were not confirmed and are not invented. Connect legitimate contact/email and a backend order workflow before selling.
- Colors, fonts, spacing, and breakpoints are configured in `css/style.css`; catalog data in `js/products.js`.

## Structure

```text
index.html
shop.html
product.html
about.html
contact.html
favicon.svg
.nojekyll
css/style.css
js/products.js
js/site.js
js/home.js
js/shop.js
js/product.js
assets/*.webp
```

No npm, no frameworks, no database, no external assets, no API keys needed.
