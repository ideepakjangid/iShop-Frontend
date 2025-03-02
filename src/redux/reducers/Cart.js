import { createSlice } from "@reduxjs/toolkit";
const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    original_total: 0,
    final_total: 0,
  },
  reducers: {
    dbToCart(state,actions){
      state.items = actions.payload.items;
      state.original_total = actions.payload.original_total;
      state.final_total = actions.payload.final_total;
      localStorage.setItem("cart",JSON.stringify(state))
    },
    addToCart(state, actions) {
      const item = state.items.find(
        (item) =>
          item.product_id == actions.payload.product_id &&
          item.color_id == actions.payload.color_id
      );
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({
          product_id: actions.payload.product_id,
          color_id: actions.payload.color_id,
          quantity: 1,
        });
      }
      state.original_total += actions.payload.prices.original_price;
      state.final_total += actions.payload.prices.discounted_price;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    descQuantity(state, actions) {
      const item = state.items.find(
        (item) =>
          item.product_id == actions.payload.product_id &&
          item.color_id == actions.payload.color_id
      );
      if (item) {
        if (item.quantity == 1) return;
        item.quantity -= 1;
        state.original_total -= actions.payload.prices.original_price;
        state.final_total -= actions.payload.prices.discounted_price;
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    lsToCart(state) {
      const lsCart = localStorage.getItem("cart");
      if (lsCart) {
        const cartData = JSON.parse(lsCart);
        state.items = cartData.items;
        state.original_total = cartData.original_total;
        state.final_total = cartData.final_total;
      }
    },
    removeProduct(state, actions) {
      const productId = actions.payload.productId;
      const colorId = actions.payload.color_id;
      const item = state.items.find(
        (item) => item.product_id == productId && item.color_id == colorId
      );
      const indexNo = state.items.findIndex(
        (item) => item.product_id == productId && item.color_id == colorId
      );
      state.items.splice(indexNo, 1);
      state.original_total =
        state.original_total -
        item.quantity * actions.payload.prices.originalPrice;
      state.final_total =
        state.final_total -
        item.quantity * actions.payload.prices.discountedPrice;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeCart(state){
      state.items = [];
      state.final_total = 0;
      state.original_total = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const {dbToCart, addToCart, lsToCart, removeProduct, descQuantity,removeCart } =
  CartSlice.actions;
export default CartSlice.reducer;
