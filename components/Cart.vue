<script setup lang="ts">
import { useCartIdStore } from '../stores/cart-id';
import { Delete } from '@element-plus/icons-vue';

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
  <h3>Carrinho</h3>
  <el-table v-if="cart" :data="cart">
    <el-table-column prop="id" label="Produto"/>
    <el-table-column prop="quantity" label="Qtd." />
    <el-table-column label="Opções">
      <template #default="scope">
        <el-button type="primary" @click="() => removeItem(scope.row)"><Delete /></el-button>
      </template>
    </el-table-column>
    <li v-for="i of cart">
      {{ i.id }} - {{ i.quantity }}
    </li>
  </el-table>
</template>