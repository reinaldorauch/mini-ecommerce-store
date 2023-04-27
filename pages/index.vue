<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();
const skip = useState<number>(() => 0);
const take = useState<number>(() => 10);
const search = useState<string>(() =>  {
  const s = route?.query?.search;
  return (Array.isArray(s) ? s[0] : s) ?? '';
});

const { data: prods, pending, refresh, error } = 
  await useLazyAsyncData(
    'prod-list', 
    () => $fetch<PaginatedResult<Product>>(
      "/product", 
        {
        query: { skip: skip.value, take: take.value, search: search.value },
        baseURL: config.public.apiBase,
      }
    )
  );

function next() {
  skip.value += take.value;
  refresh();
}

function back() {
  skip.value -= take.value;
  refresh();
}

function handleSubmit(ev: Event) {
  ev.preventDefault();
  refresh();
  const queryString = new URLSearchParams(window.location.search);
  queryString.set('search', search.value);
  history.pushState(null, '', '/?' + queryString.toString());
}
</script>

<template>
  <div>
    <h1>Produtos</h1>
    <form @submit="handleSubmit">
      <input type="text" name="search" v-model="search">
      <button>Buscar</button>
    </form>
    <p v-if="error">ProdError: {{ error }}</p>
    <p v-if="pending">Carregando...</p>
    <div v-else-if="prods">
      <ul>
        <li v-for="p in (prods.data)" :key="p._id">
          <NuxtLink :href="'/product/' + p._id">{{ p.title }}</NuxtLink>
        </li>
      </ul>
      <p>Mostrando {{ take }} de {{ prods.total ?? 0 }}</p>
      <button @click="back()">Voltar</button>
      <button @click="next()">Avançar</button>
    </div>
  </div>
</template>