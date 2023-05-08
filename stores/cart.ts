import { defineStore } from "pinia";

interface CartStore {
  cartId: null | string;
  cartOpen: boolean;
}

export const useCartStore = defineStore("cart", {
  state: (): CartStore => {
    return { cartId: null, cartOpen: false };
  },
  getters: {
    param({ cartId }): { cartId: string } | {} {
      if (cartId) {
        return { cartId };
      }
      return {};
    },
    pathParam({ cartId }) {
      if (cartId) return "/" + cartId;
      return "";
    },
  },
  actions: {
    setCartId(id: string) {
      this.cartId = id;
    },
    showCart() {
      this.cartOpen = true;
    },
    hideCart() {
      this.cartOpen = false;
    },
  },
  persist: true,
});
