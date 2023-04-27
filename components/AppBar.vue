<script setup lang="ts">
import { useSearchStore } from '../stores/search';

const route = useRoute();

const selectedPath = ref('/');
watchEffect(() => {
  selectedPath.value = route.fullPath;
})

const searchStore = useSearchStore();

function handleSubmit(ev: Event) {
  ev.preventDefault();
  console.log('search', searchStore.search);
  refreshNuxtData('prod-list');
  const queryString = new URLSearchParams(window.location.search);
  queryString.set('search', searchStore.search);
  history.pushState(null, '', '/?' + queryString.toString());
}
</script>

<template>
  <el-container>
    <el-header>
      <el-menu 
        :default-active="selectedPath"
        mode="horizontal"
        :ellipsis="false"
      >
        <el-menu-item index="/">mini ecommerce</el-menu-item>
        <div class="spacer"></div>
        <el-form :inline="true" class="app-bar-form" @submit="handleSubmit">
          <el-form-item label="Busca" class="app-bar-form-item">
            <el-input v-model="searchStore.search"></el-input>
          </el-form-item>
          <el-form-item  class="app-bar-form-item">
            <el-button type="primary">Buscar</el-button>
          </el-form-item>
        </el-form>
        <el-menu-item index="/product">Produtos</el-menu-item>
        <Cart index="cart"/>
      </el-menu>
    </el-header>
  </el-container>
</template>

<style>
.spacer {
  flex-grow: 1;
}
.app-bar-form {
  display: flex;
  align-items: center;
}
.app-bar-form-item {
  margin-bottom: 0;
}
</style>