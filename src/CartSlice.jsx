import { createSlice } from '@reduxjs/toolkit';

// Each item: { name, image, cost (number), quantity }
const initialState = {
  items: [],
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Adds a plant, or increases its quantity if it is already in the cart
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existing = state.items.find((item) => item.name === name);
      if (existing) {
        existing.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    // Removes a plant type from the cart completely
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },
    // Sets the quantity of a plant type (used by + / - buttons)
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existing = state.items.find((item) => item.name === name);
      if (existing) {
        existing.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
