# Paradise Nursery 🌿

Paradise Nursery is the front end of a houseplant shopping application built with **React** and **Redux Toolkit**.
Browse plants by category, add them to your cart, and manage quantities before checkout.

## Features
- **Landing page** with a background image, company name, an About Us paragraph, and a **Get Started** button
- **Product listing page** with 18 houseplants in 3 categories (Air Purifying, Aromatic Fragrant, Succulents and Cacti), each with thumbnail, name, price, and an **Add to Cart** button (disabled once added)
- **Navbar** on the product and cart pages with Home / Plants / Cart links and a cart icon showing the live item count
- **Shopping cart page** with total plants, total cost, per-plant thumbnail, name, unit price and subtotal, increase / decrease / delete buttons, **Continue Shopping**, and **Checkout** ("Coming Soon")

## Tech stack
React 18, Redux Toolkit, React-Redux, Vite, gh-pages

## Project structure
```
src/
  App.jsx         # Landing page
  App.css         # Global styles + landing background image
  AboutUs.jsx     # Company description
  ProductList.jsx # Product listing + navbar
  CartItem.jsx    # Shopping cart page
  CartSlice.jsx   # Redux slice (addItem, removeItem, updateQuantity)
  store.js        # Redux store
```

## Run locally
```bash
npm install
npm run dev
```

## Deploy to GitHub Pages
1. In `vite.config.js`, set `base` to `'/<your-repo-name>/'`
2. In `package.json`, set `homepage` to `https://<your-username>.github.io/<your-repo-name>`
3. Run `npm run deploy`, then in the repo go to Settings → Pages and select the `gh-pages` branch
