<script setup lang="ts">
import { useCartStore } from '../stores/cart';
import { Close } from '@element-plus/icons-vue';

interface CartItem {
  id: string
  title: string
  quantity: number
}

const config = useRuntimeConfig();
const cartStore = useCartStore();
const { data: cart, pending, error, refresh } = useLazyAsyncData(
  "cart",
  () => $fetch<CartItem[]>("/cart" + cartStore.pathParam, { 
    baseURL: config.public.apiBase, 
  })
    .catch((err) => {
      if (err.status === 404) {
        if (cartStore.cartId) {
          cartStore.$reset();
        }
        return [];
      } else {
        throw err;
      }
    })
);

function removeItem(item: CartItem): Promise<void> {
  return change(item, item.quantity * -1);
}

async function change({id}: CartItem, quantity: number): Promise<void> {
  const { cartId } = cartStore;
  await $fetch<void>('/cart',  { 
    method: 'POST',
    baseURL: config.public.apiBase, 
    body: JSON.stringify({cartId, id, quantity })
  })
  refreshNuxtData('cart');
}

async function onQtyChange(item: CartItem, current?: number, old?: number) {
  if (typeof current === 'undefined' || typeof old === 'undefined') return;

  await change(item, current - old);
}
</script>

<template>
  <h3>Carrinho</h3>
  <el-table v-loading="pending" v-if="cart" :data="cart">
    <el-table-column prop="title" label="Produto"/>
    <el-table-column prop="quantity" label="Qtd.">
      <template #default="scope">
        <el-input-number v-model="scope.row.quantity" @change="(c, o) => onQtyChange(scope.row, c, o)"/>
      </template>
    </el-table-column>
    <el-table-column label="Opções">
      <template #default="scope">
        <el-button type="danger" @click="() => removeItem(scope.row)"><el-icon><Close /></el-icon></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>