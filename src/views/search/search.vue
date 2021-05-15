<template>
  <div>
    <div v-if="state.group">
      <div class="flex flex-col justify-center py-3 border-b-2 border-gray-300">
        <div class="md:flex-row md:pt-3 md:pl-2 flex flex-col items-baseline">
          <h1 class="md:px-10 min-w-max px-3 py-1 text-2xl text-gray-700">
            <router-link :to="{ path: '/' }">落絮</router-link>
          </h1>
          <form class="md:px-0 w-full px-3 py-1" @submit.prevent="search">
            <div
              class="md:w-4/5 flex w-full px-2 border-2 border-gray-200 rounded-lg shadow-md"
            >
              <input
                v-model="state.query"
                class="w-full p-2 m-2 border-none"
                type="text"
                required
              />
              <button class="p-1 my-2 font-bold">
                <icon-search-circle class="text-gray-500" />
              </button>
            </div>
          </form>
        </div>
        <div class="flex justify-around">
          <div>
            <h1 class="md:px-33 px-11 pt-2 text-gray-800">
              @{{ state.group.pub_id }}
            </h1>
          </div>
          <!-- <div> -->
          <div class="pt-1" style="position: absolute; z-index: 999">
            <drop-down title="按时间">
              <drop-item
                @click="get_filter(username, 24)"
                text="过去一天"
              ></drop-item>
              <drop-item @click="get_filter(username, 168)" text="过去一周">
              </drop-item>
              <drop-item @click="get_filter(username, 730)" text="过去一月">
              </drop-item>
              <drop-item
                @click="get_filter(username, 8478 / 2)"
                text="过去半年"
              >
              </drop-item>
              <drop-item @click="get_filter(username, 8478)" text="过去一年">
              </drop-item>
            </drop-down>
          </div>
          <!-- </div> -->
          <div class="pt-1">
            <form @submit.prevent="get_filter(username, _time)">
              <div
                class="h-10 flex w-full border-2 border-gray-300 rounded-lg shadow-md"
              >
                <input
                  v-model="username"
                  placeholder="按用户"
                  class="w-full p-0.5 m-1 border-none"
                  type="text"
                  required
                />
                <button class="font-bold">
                  <icon-search-circle class="text-gray-500" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div v-if="state.messages" class="md:px-44 px-3">
        <div class="px-1 py-2 text-gray-500">
          找到 {{ state.messages.length }} 条消息 --
        </div>
        <div
          v-for="message in state.messages"
          class="py-2"
          :key="message.id + ',' + state.query"
        >
          <message-card :message="message" :search="state.query" />
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center my-8">
      <search-loading :state="state" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, onMounted, ref, watch } from "vue"
import { useRouter, useRoute } from "vue-router"
import { SearchState as State } from "./search-state"

export default defineComponent({
  name: "search",
  components: {
    "message-card": require("@/components/message-card").default,
    "search-loading": require("@/views/search/search-loading.vue").default,
    "icon-search-circle": require("@/components/icons/icon-search-circle.vue")
      .default,
    "drop-down": require("@/components/drop-down").default,
    "drop-item": require("@/components/drop-item").default,
  },
  props: {
    group_id: { type: Number, required: true },
    query: { type: String, required: true },
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const username = ref()
    let _time = ref()
    const state = reactive<State>(
      new State({
        group_id: props.group_id,
        query: props.query,
      })
    )

    onMounted(async () => {
      await state.search()
    })
    // watch(_time,()=>{

    // })

    let get_filter = (username: string, time: number) => {
      console.log(time)

      _time.value = time
      console.log(_time.value)

      search_byuser_andtime(username, time)
    }

    async function search(): Promise<void> {
      const query = {
        g: props.group_id.toString(),
        q: state.query,
      }

      await state.search()

      if (query.g !== route.query.g || query.q !== route.query.q) {
        router.push({ path: "/search", query })
      }
    }

    // async function search_bytime(time: number): Promise<void> {
    //   const query = {
    //     g: props.group_id.toString(),
    //     q: state.query,
    //   }

    //   await state.search_bytime(time)

    //   if (query.g !== route.query.g || query.q !== route.query.q) {
    //     router.push({ path: "/search", query })
    //   }
    // }

    // async function search_user(username: string): Promise<void> {
    //   const query = {
    //     g: props.group_id.toString(),
    //     q: state.query,
    //   }

    //   await state.search_byuser(username)

    //   if (query.g !== route.query.g || query.q !== route.query.q) {
    //     router.push({ path: "/search", query })
    //   }
    // }

    async function search_byuser_andtime(
      username: string,
      time: number = 10000
    ) {
      const query = {
        g: props.group_id.toString(),
        q: state.query,
      }

      await state.search_byuser_time(username, time)

      if (query.g !== route.query.g || query.q !== route.query.q) {
        router.push({ path: "/search", query })
      }
    }
    return {
      state,
      search,
      username,
      search_byuser_andtime,
      _time,
      get_filter,
    }
  },
})
</script>
