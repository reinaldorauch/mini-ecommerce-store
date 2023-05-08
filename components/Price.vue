<script setup lang="ts">
const props = defineProps<{ price: number, cents: boolean }>();
const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const value = formatter.format(props.cents ? props.price / 100 : props.price);
</script>
<template>
  <span>{{ value }}</span>
</template>
<style scoped>
span {
  font-weight: bold;
}
</style>