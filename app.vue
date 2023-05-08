<script setup>
import { useCartStore } from './stores/cart';

const cartStore = useCartStore();
</script>

<template>
  <div>
    <AppBar />
    <el-container>
      <el-main>
        <NuxtPage />
        <ClientOnly>
          <el-drawer direction="rtl" v-model="cartStore.cartOpen" size="700px" title="Carrinho">
            <Cart />
          </el-drawer>
        </ClientOnly>
      </el-main>
    </el-container>

  </div>
</template>

<style>
body {
  margin: 0;
  border: 0;
}

* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
</style>