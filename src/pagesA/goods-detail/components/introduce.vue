<template lang="pug">
view.introduce
  view(v-for="(item, index) in introduceList" :key="index")
    mp-html(:content="item.url")
</template>

<script setup>
const props = defineProps({
  introduceList: {
    type: Array,
    default: () => {
      return [];
    }
  }
});
</script>

<style lang="scss" scoped></style>
