import { jwtEncode, jwtDecode } from "@/lib-hook/useJwt";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6W119.AzjfHMco3mqiLjM9Mod8oLHZYpQkmQI1IdBLtGFdCZQ",
      addToCart: (productObj) => {
        set((state) => addCartItem(state, productObj));
      },
      removeFromCart: (productId) => {
        set((state) => removeCartItem(state, productId));
      },
      increaseCartQuantity: (productId) => {
        set((state) => increaseCartItem(state, productId));
      },
      decreaseCartQuantity: (productId) => {
        set((state) => decreaseCartItem(state, productId));
      },
      cleanCart: () => {
        set({
          cart: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6W119.AzjfHMco3mqiLjM9Mod8oLHZYpQkmQI1IdBLtGFdCZQ",
        });
      },
    }),
    { name: "cart" }
  )
);

const addCartItem = (state, product) => {
  let filterCart = [],
    sameProduct;
  const originalCart = jwtDecode(state.cart);

  if (originalCart.id) {
    filterCart = originalCart.id.filter((item) => item.id !== product.id);
    sameProduct = originalCart.id.find((item) => item.id === product.id);

    if (sameProduct) {
      const updatedQuantity = sameProduct.quantity + product.quantity;
      const encodeCart = jwtEncode([
        ...filterCart,
        { ...product, quantity: updatedQuantity, timestamp: Date.now() },
      ]);
      return { cart: encodeCart };
    }
  }

  const encodeCart = jwtEncode([
    ...filterCart,
    { ...product, timestamp: Date.now() },
  ]);
  return {
    cart: encodeCart,
  };
};

const removeCartItem = (state, id) => {
  const originalCart = jwtDecode(state.cart);

  const filterCart = originalCart.id.filter((item) => item.id !== id);
  const encodeCart = jwtEncode([...filterCart]);

  return { cart: encodeCart };
};

const increaseCartItem = (state, id) => {
  const originalCart = jwtDecode(state.cart);

  const updatedCart = originalCart.id.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        quantity: item.quantity + 1,
      };
    }
    return item;
  });

  const encodeCart = jwtEncode(updatedCart);

  return {
    cart: encodeCart,
  };
};

const decreaseCartItem = (state, id) => {
  const originalCart = jwtDecode(state.cart);

  const updatedCart = originalCart.id.map((item) => {
    if (item.id === id) {
      if (item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
    }
    return item;
  });

  const selectedItem = originalCart.id.find((item) => item.id === id);

  if (selectedItem.quantity > 1) {
    const encodeCart = jwtEncode(updatedCart);
    return {
      cart: encodeCart,
    };
  } else {
    const encodeCart = jwtEncode(updatedCart);
    return {
      cart: encodeCart,
    };
  }
};
