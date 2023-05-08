<script setup lang="ts">
import {useCartStore} from '../../stores/cart';
const route = useRoute()
const config = useRuntimeConfig();
const cartStore = useCartStore();
const commonConfig = {
  baseURL: config.public.apiBase
};
const {data:prod, pending, error} = useLazyAsyncData(
  'prod-page', 
  () => $fetch<Product>(
    '/product/' + route.params.id, 
    commonConfig  
  )
);
async function addToCart(prod: Product) {
  const res = await $fetch<{cartId: string} | null>('/cart', {
    ...commonConfig,
    method: 'POST',
    body: JSON.stringify({
      id: prod._id,
      quantity: 1,
      ...cartStore.param
    })
  });

  if (res?.cartId) {
    cartStore.setCartId(res.cartId);
  }

  refreshNuxtData('cart');
}
</script>

<template>
  <div v-if="pending">
    <p>Carregando...</p>
  </div>
  <div v-if="error"><pre>{{ error }}</pre></div>
  <div v-if="prod">
    <h1>Produto: {{ prod.title }}</h1>
    <p>
      <img style="max-width: 300px;" v-for='[index, i] of prod.images.entries()' :key="index" :src="i" alt="{{ prod.title }}">
    </p>
    <p><button @click="addToCart(prod)">Adicionar ao carrinho</button></p>
  </div>
</template>