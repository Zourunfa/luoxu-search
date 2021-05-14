<template>
  <li>
    <div
      style="cursor: pointer"
      class="flex block bg-gray-50 px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
    >
      {{ text }}
    </div>
  </li>
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "drop-item",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  // setup(props) {
  //   console.log(props)
  // },
})
</script>