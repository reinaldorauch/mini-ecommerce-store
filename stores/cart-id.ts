import { defineStore } from "pinia";

interface CartIdStore {
  cartId: null | string;
}

export const useCartIdStore = defineStore("cartId", {
  state: (): CartIdStore => {
    return { cartId: null };
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
  },
  persist: true,
});
