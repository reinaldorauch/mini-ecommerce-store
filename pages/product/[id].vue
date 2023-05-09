<script setup lang="ts">
import { useCartStore } from '../../stores/cart';
const route = useRoute()
const config = useRuntimeConfig();
const cartStore = useCartStore();
const commonConfig = {
  baseURL: config.public.apiBase
};
const { data: prod, pending, error } = useLazyAsyncData(
  'prod-page',
  () => $fetch<Product>(
    '/product/' + route.params.id,
    commonConfig
  )
);
async function addToCart(prod: Product) {
  const res = await $fetch<{ cartId: string } | null>('/cart', {
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
  <div v-if="error">
    <pre>{{ error }}</pre>
  </div>
  <div v-if="prod">
    <h1>Produto: {{ prod.title }}</h1>
    <div style="display: flex; gap: 10px">
      <div v-for="i of prod.images" style="background-color: black; display: flex; align-items: center;">
        <img style="max-width: 300px;" :src="i" alt="{{ prod.title }}">
      </div>
    </div>
    <p>
      <strong>Preço: </strong>
      <Price :cents='true' :price='prod.price' />
    </p>
    <p>
      Itens em estoque: {{ prod.itemsInStock }}
    </p>
    <p><el-button type="primary" @click="addToCart(prod)">Adicionar ao carrinho</el-button></p>
  </div>
</template>