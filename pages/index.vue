<script setup lang="ts">
import { useSearchStore } from '../stores/search';

const config = useRuntimeConfig();
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
    ),
    {watch: [searchStore, skip, take]}
  );
</script>

<template>
  <div>
    <h1>Produtos</h1>
    <p v-if="error">ProdError: {{ error }}</p>
    <p v-if="pending">Carregando...</p>
    
    <div v-if="prods">
      <el-container class="product-list">
        <el-card  v-for="p in (prods.data)" :key="p._id" :body-style="{ padding: '0px' }" :style="{width: '298px'}">
          <NuxtLink :href="'/product/' + p._id">
            <img
            :src="p.images[0] ?? '/sem_imagem.png'"
            class="image"
            />
            <div style="padding: 14px">
              <el-badge :value="p.itemsInStock">
                <el-button>{{ p.title }}</el-button>
              </el-badge>
              <div class="bottom">
                <Price :price="p.price" />
              </div>
            </div>
          </NuxtLink>
        </el-card>
      </el-container>
      <el-row>
        <el-pagination :total="prods.total" lang="pt-br"/>
      </el-row>
    </div>
  </div>
</template>

<style>
.product-list {
  margin-bottom: 20px;
  gap: 15px;
  flex-wrap: wrap;
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