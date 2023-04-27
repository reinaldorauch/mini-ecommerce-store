import { defineStore } from "pinia";

interface CartIdStore {
  cartId: null | string;
}

export const useCartIdStore = defineStore("cartId", {
  state: (): CartIdStore => {
    let cartId = null;
    // if (typeof window !== "undefined") {
    //   cartId = localStorage?.getItem("cartId");
    // }
    return { cartId };
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
});

const store = useCartIdStore();

store.$subscribe(
  (_, { cartId }) => {
    // if (typeof window !== "undefined" && cartId) {
    //   localStorage?.setItem("cartId", cartId);
    // }
  },
  { detached: true }
);
