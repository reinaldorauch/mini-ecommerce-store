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
        <el-card 
          v-for="p in (prods.data)" 
          :key="p._id"
          class="d-flex f-column"
          :body-style="{ padding: '0px' }"
          :style="{width: '298px'}"
        >
          <NuxtLink 
            class="d-flex f-column no-decoration"
            :href="'/product/' + p._id"
          >
            <div class="d-flex f-grow f-column f-jc-center bc-black">
              <img
                class="image"
                :src="p.images[0] ?? '/sem_imagem.png'"
                />
            </div>
            <div style="padding: 14px">
              <el-badge :value="p.itemsInStock">
                <el-text style="margin: 5px" size="large" truncated>{{ p.title }}</el-text>
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
.el-card__body {
  display: flex;
  flex-grow: 1;
}
</style>

<style scoped>
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

.d-flex {
  display: flex;
}

.f-column {
  flex-direction: column;
}

.f-grow {
  flex-grow: 1;
}

.f-jc-center {
  justify-content: center;
}

.f-j-space-between {
  justify-content: space-between;
}

.bc-black {
  background-color: black;
}

.image {
  width: 100%;
  display: block;
}

.no-decoration {
  text-decoration: none;
  color: inherit;
}
</style>