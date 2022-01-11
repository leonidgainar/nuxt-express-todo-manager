<template>
  <span
    v-if="status === true"
    class="px-2 py-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800 max-h-8"
  >
    Completed
  </span>
  <span
    v-else-if="status === false"
    class="px-2 py-2 inline-flex text-xs font-semibold rounded-full bg-red-100 text-red-800 max-h-8"
  >
    Uncompleted
  </span>
</template>

<script>
export default {
  props: {
    status: {
      type: Boolean,
    },
  },
}
</script>
