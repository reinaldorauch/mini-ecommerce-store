<script setup lang="ts">
import { useSearchStore } from '../stores/search';

const route = useRoute();
const router = useRouter();
const search = ref('');
let loadedFromUrl = false;
const selectedPath = ref('/');

const searchStore = useSearchStore();

function handleSubmit(ev: Event) {
  ev.preventDefault();
  console.log('Searching', search.value);
  searchStore.doSearch(search.value)
  const queryString = new URLSearchParams(window.location.search);
  queryString.set('search', searchStore.search);
  router.push('/?' + queryString.toString());
}

function onInputKeyDown(ev: Event | KeyboardEvent) {
  if (!(ev instanceof KeyboardEvent)) return;
  if (ev.code === 'Enter') handleSubmit(ev);
}

watchEffect(() => {
  selectedPath.value = route.fullPath;
  if (!loadedFromUrl && typeof route.query.search === 'string') {
    search.value = route.query.search;
    searchStore.doSearch(search.value);
    loadedFromUrl = true;
  }
})
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
          <el-form-item class="app-bar-form-item">
            <el-input v-model="search" placeholder="Busca" @keydown="onInputKeyDown"></el-input>
          </el-form-item>
          <el-form-item  class="app-bar-form-item">
            <el-button type="primary" @click="handleSubmit">Buscar</el-button>
          </el-form-item>
        </el-form>
        <el-menu-item index="/product">Produtos</el-menu-item>
        <Cart index="cart"/>
      </el-menu>
    </el-header>
  </el-container>
</template>

<style scoped>
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