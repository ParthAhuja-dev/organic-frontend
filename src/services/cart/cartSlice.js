import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totals: {
    netTotal: 0,
    taxes: 0,
    shippingCharges: 0,
    total: 0,
  },
};

const calculateTotals = (state) => {
  const netTotal = state.products.reduce(
    (total, product) => total + product.discountprice * product.quantity,
    0
  );

  const taxes = netTotal * parseFloat(import.meta.env.VITE_TAX_VALUE);

  const noOfProducts = parseFloat(import.meta.env.VITE_NO_OF_PRODUCTS);
  const shippingCharges = parseFloat(import.meta.env.VITE_SHIPPING_CHARGES);

  const shippingChargesFinal =
    state.products.length <= noOfProducts && state.products.length !== 0
      ? shippingCharges
      : 0;
  const total = netTotal + taxes + shippingChargesFinal;
  state.totals = {
    netTotal: netTotal.toFixed(2),
    taxes: taxes.toFixed(2),
    shippingCharges: shippingChargesFinal,
    total: total.toFixed(2),
  };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { productId, quantity, name, discountprice, imageUrl, size } =
        action.payload;

      const existingProduct = state.products.find(
        (product) => product.productId === productId && product.size === size
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.products.push({
          productId,
          quantity,
          name,
          discountprice,
          imageUrl,
          size,
        });
      }
      calculateTotals(state);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity, size } = action.payload;
      const existingProduct = state.products.find(
        (product) => product.productId === productId && product.size === size
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
        if (existingProduct.quantity <= 0) {
          state.products = state.products.filter(
            (product) =>
              !(product.productId === productId && product.size === size)
          );
        }
        calculateTotals(state);
      }
    },
    removeItem: (state, action) => {
      const { productId, size } = action.payload;
      state.products = state.products.filter(
        (product) =>
          !(product.productId === productId && product.size === size)
      );
      calculateTotals(state);
    },
    clearCart: (state) => {
      state.products = [];
      calculateTotals(state);
    },
    buyNow: (state, action) => {
      state.products = [action.payload];
      calculateTotals(state);
    },
  },
});

export const {
  addItem,
  updateQuantity,
  removeItem,
  clearCart,
  buyNow,
} = cartSlice.actions;

export default cartSlice.reducer;
