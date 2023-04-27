<script setup lang="ts">
import {useCartIdStore} from '../stores/cart-id';
interface CartItem {
  id: string
  quantity: number
}
const config = useRuntimeConfig();
const cartIdStore = useCartIdStore();
const { data: cart, pending, error, refresh } = useLazyAsyncData(
  "cart",
  () => $fetch<CartItem[]>("/cart" + cartIdStore.pathParam, { 
    baseURL: config.public.apiBase, 
  })
    .catch((err) => {
      if (err.status === 404) {
        if (cartIdStore.cartId) {
          cartIdStore.$reset();
        }
        return [];
      } else {
        throw err;
      }
    })
);

async function removeItem({id, quantity}: CartItem): Promise<void> {
  const {cartId} = cartIdStore;
  await $fetch<void>('/cart',  { 
    method: 'POST',
    baseURL: config.public.apiBase, 
    body: JSON.stringify({cartId, id, quantity: quantity * -1 })
  })
  refreshNuxtData('cart');
}
</script>

<template>
  <div>
    <p>CartId: {{ cartIdStore.cartId }}</p>
    <p v-if="error"><pre>{{ error }}</pre></p>
    <p>Carrinho: {{ pending ? '...' : cart?.length }}</p>
    <div v-if="cart">
      <ul>
        <li v-for="i of cart">
          <span>{{ i.id }} - {{ i.quantity }}</span>
          <button @click="removeItem(i)">Remover</button>
        </li>
      </ul>
    </div>
  </div>
</template>