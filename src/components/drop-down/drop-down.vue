/* eslint-disable @typescript-eslint/no-unused-vars */
<template>
  <div ref="dropRef">
    <button
      @click="toggleOpen"
      class="block h-10 w-48 rounded-xl overflow-hidden border-2 border-gray-300 focus:outline-none focus:border-white"
    >
      {{ title }}
    </button>
    <ul class="w-48 rounded-lg" style="display: block" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue"
export default defineComponent({
  name: "drop-down",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const isOpen = ref(false)
    const dropRef = ref<null | HTMLElement>(null)
    // console.log(1)

    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    const handler = (e: MouseEvent) => {
      // console.log(dropRef.value)
      if (dropRef.value) {
        if (!dropRef.value.contains(e.target as HTMLElement) && isOpen.value) {
          isOpen.value = false
        }
      }
    }
    onMounted(() => {
      document.addEventListener("click", handler)
    })
    onUnmounted(() => {
      document.removeEventListener("click", handler)
    })
    return {
      toggleOpen,
      isOpen,
      dropRef,
    }
  },
})
</script>