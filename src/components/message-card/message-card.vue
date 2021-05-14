<template>
  <div class="main flex justify-start ...">
    <img
      id="img"
      :src="`https://lab.lilydjwg.me/luoxu/avatar/${message.from_id}`"
      alt="头图"
      class="rounded-full h-16 w-16 flex items-center justify-center... self-end"
      ref="img_ref"
      onerror="this.src='https://lab.lilydjwg.me/luoxu/avatar/127308807'"
    />
    <div id="message-card">
      <div class="bubbleTail"></div>
      <div
        class="message-card max-w-max px-3 py-1 border border-gray-300 rounded-lg shadow-sm"
      >
        <p class="flex justify-between py-1 text-xs font-bold text-gray-600">
          {{ message.from_name }}
        </p>
        <p class="py-2 break-words whitespace-pre-line">
          <highlight v-once :message="message.text" :search="search" />
        </p>
        <div class="flex justify-end">
          <a :href="message.tg_link" class="underline">
            <p class="hover:text-gray-900 text-sm text-gray-500">
              {{ message.time }}
            </p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from "vue"
import { Message } from "@/models/message"
// import axios from "axios"
// import client from "@/clients/luoxu-client-instance"

export default defineComponent({
  name: "message-card",
  components: {
    highlight: require("@/components/highlight").default,
  },
  props: {
    message: {
      type: Object as PropType<Message>,
      required: true,
    },
    search: {
      type: String,
      required: false,
    },
  },
  setup(props, context) {
    // console.log(props)
    // console.log(props.message)
    let img_ref = ref(null)
    let defaultImg = "this.src=https://lab.lilydjwg.me/luoxu/avatar/127308807"
    onMounted(() => {
      console.log(img_ref.value)
    })

    return { img_ref, defaultImg }
  },
})
</script>

<style scoped>
.main {
  position: relative;
}
#message-card {
  position: relative;
  margin-left: 20px;
}
.bubbleTail {
  position: absolute;
  right: 100%;
  bottom: 30%;
  width: 20px;
  height: 16px;
  border-width: 0;
  border-style: solid;
  border-color: transparent;
  margin-right: -1px;
  border-top-width: 10px;
  border-top-color: currentColor;
  border-radius: 32px 0 0 0;
  color: skyblue;
}

#img {
  position: relative;
}

/* #img:after {
  content: url("https://lab.lilydjwg.me/luoxu/avatar/127308807");
  display: block;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
} */
</style>