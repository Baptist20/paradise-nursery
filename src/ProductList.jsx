import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import CartItem from './CartItem.jsx';
import './ProductList.css';

// Builds a self-contained thumbnail (no external hosting needed).
// To use real photos, replace `thumb(...)` with an image URL, e.g. image: 'https://.../snake-plant.jpg'
const thumb = (emoji, bg) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" fill="${bg}"/><text x="150" y="190" font-size="130" text-anchor="middle">${emoji}</text></svg>`
  );

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: thumb('🌿', '#d9f0d3'), description: 'Produces oxygen at night, improving air quality.', cost: 15 },
      { name: 'Spider Plant', image: thumb('🍃', '#e3f4d0'), description: 'Filters formaldehyde and xylene from the air.', cost: 12 },
      { name: 'Peace Lily', image: thumb('🌼', '#f2f7dc'), description: 'Removes mold spores and purifies the air.', cost: 18 },
      { name: 'Boston Fern', image: thumb('🌱', '#cfeccd'), description: 'Adds humidity and removes toxins.', cost: 20 },
      { name: 'Rubber Plant', image: thumb('🪴', '#dcefe0'), description: 'Easy-care plant that absorbs airborne chemicals.', cost: 17 },
      { name: 'Aloe Vera', image: thumb('🌵', '#d6efd9'), description: 'Purifies the air and soothes burns and cuts.', cost: 14 },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: thumb('💜', '#e9ddf5'), description: 'Calming scent, promotes relaxation and sleep.', cost: 20 },
      { name: 'Jasmine', image: thumb('🤍', '#f5f1ea'), description: 'Sweet floral fragrance that uplifts the mood.', cost: 18 },
      { name: 'Rosemary', image: thumb('🌿', '#dde8d0'), description: 'Fragrant herb that boosts memory and focus.', cost: 15 },
      { name: 'Mint', image: thumb('🍃', '#d3f0e0'), description: 'Refreshing aroma, great for teas and cooking.', cost: 12 },
      { name: 'Lemon Balm', image: thumb('🍋', '#f6f3cf'), description: 'Citrus scent that reduces stress and anxiety.', cost: 14 },
      { name: 'Hyacinth', image: thumb('🌸', '#f7dff0'), description: 'Strong, sweet perfume that fills the room.', cost: 22 },
    ],
  },
  {
    category: 'Succulents and Cacti',
    plants: [
      { name: 'Echeveria', image: thumb('🪷', '#e0efe6'), description: 'Rosette-shaped succulent that thrives on neglect.', cost: 10 },
      { name: 'Jade Plant', image: thumb('🌳', '#d4ecd8'), description: 'Symbol of good luck and prosperity.', cost: 16 },
      { name: 'Barrel Cactus', image: thumb('🌵', '#e9efd2'), description: 'Round, spiny cactus that needs very little water.', cost: 19 },
      { name: 'Zebra Haworthia', image: thumb('🌿', '#dcebdc'), description: 'Striped succulent perfect for desks and shelves.', cost: 11 },
      { name: 'String of Pearls', image: thumb('🟢', '#d9efdc'), description: 'Trailing plant with bead-like leaves.', cost: 21 },
      { name: 'Burro\'s Tail', image: thumb('🪴', '#e2f0d6'), description: 'Cascading succulent, ideal for hanging pots.', cost: 17 },
    ],
  },
];

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="34" height="34" fill="currentColor" aria-hidden="true">
    <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,56H216V88H40Zm0,144V104H216v96Z" opacity="0" />
    <circle cx="80" cy="216" r="20" />
    <circle cx="184" cy="216" r="20" />
    <path d="M42.3,48H216L195.2,152a16,16,0,0,1-15.7,12.8H84.7A16,16,0,0,1,69,152.2L48.6,28.4A8,8,0,0,0,40.7,22H16a8,8,0,0,1,0-16H40.7A24,24,0,0,1,64.4,25.7Z" />
  </svg>
);

// Shared navbar: shown on both the product listing and the cart page
function Navbar({ view, onHome, onPlants, onCart }) {
  const items = useSelector((state) => state.cart.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-brand">🌿 Paradise Nursery</div>
      <div className="navbar-links">
        <button className="nav-link" onClick={onHome}>Home</button>
        <button className={`nav-link ${view === 'plants' ? 'active' : ''}`} onClick={onPlants}>Plants</button>
        <button className={`nav-link cart-link ${view === 'cart' ? 'active' : ''}`} onClick={onCart} aria-label="Cart">
          <span className="cart-icon-wrapper">
            <CartIcon />
            <span className="cart-count" data-testid="cart-count">{totalQuantity}</span>
          </span>
          Cart
        </button>
      </div>
    </nav>
  );
}

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem({ name: plant.name, image: plant.image, cost: plant.cost }));
  };

  return (
    <div>
      <Navbar
        view={showCart ? 'cart' : 'plants'}
        onHome={onHomeClick}
        onPlants={() => setShowCart(false)}
        onCart={() => setShowCart(true)}
      />

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-grid-container">
          {plantsArray.map((group) => (
            <section key={group.category} className="category-section">
              <h2 className="category-title">{group.category}</h2>
              <div className="product-grid">
                {group.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <h3 className="product-title">{plant.name}</h3>
                    <p className="product-description">{plant.description}</p>
                    <p className="product-price">${plant.cost}</p>
                    <button
                      className="product-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart(plant.name)}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
