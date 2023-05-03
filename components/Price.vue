<script setup lang="ts">
const props = defineProps<{price: number}>();
const formatter = new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'});
const value = formatter.format(props.price / 100);
</script>
<template>
  <span>{{ value }}</span>
</template>
<style scoped>
span {
  font-weight: bold;
}
</style>