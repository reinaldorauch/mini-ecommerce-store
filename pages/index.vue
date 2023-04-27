<script setup lang="ts">
import { VERTICAL } from 'element-plus/es/components/virtual-list/src/defaults';
import { useSearchStore } from '../stores/search';

const config = useRuntimeConfig();
const route = useRoute();
const skip = useState<number>(() => 0);
const take = useState<number>(() => 10);
const searchStore = useSearchStore();

const { data: prods, pending, error } = 
  await useLazyAsyncData(
    'prod-list', 
    () => $fetch<PaginatedResult<Product>>(
      "/product", 
        {
        query: { skip: skip.value, take: take.value, search: searchStore.search },
        baseURL: config.public.apiBase,
      }
    )
  );
</script>

<template>
  <div>
    <h1>Produtos</h1>
    <p v-if="error">ProdError: {{ error }}</p>
    <p v-if="pending">Carregando...</p>
    
    <div v-if="prods">
      <el-container class="product-list">
        <el-card  v-for="p in (prods.data)" :key="p._id" :body-style="{ padding: '0px' }" :style="{width: '300px'}">
          <NuxtLink :href="'/product/' + p._id">
            <img
            :src="p.images[0]"
            class="image"
            />
            <div style="padding: 14px">
              <span>{{ p.title }}</span>
              <div class="bottom">
              </div>
            </div>
          </NuxtLink>
        </el-card>
      </el-container>
      <el-row>
        <el-pagination :total="prods.total" />
      </el-row>
    </div>
  </div>
</template>

<style>
.product-list {
  margin-bottom: 20px;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>