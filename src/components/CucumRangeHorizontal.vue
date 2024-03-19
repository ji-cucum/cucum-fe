<template>
  <input id="default-range" type="range" :value="value" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
</template>
<script>
export default {
  name: 'CucumRange',
  props: {
    value: {
      type: Number,
      default: 50
    }
  },
}
</script>