import { Group } from "@/models/group"
import { Message } from "@/models/message"
import client from "@/clients/luoxu-client-instance"

export class SearchState {
  group_id: number
  query: string

  group: null | Group = null
  messages: null | Array<Message> = null

  constructor(opts: { group_id: number; query: string }) {
    this.group_id = opts.group_id
    this.query = opts.query
  }

  async search(): Promise<void> {
    const result = await client.search({
      group_id: this.group_id,
      query: this.query,
    })
    console.log(result);

    const group = Group.from_search_result(result)

    this.group = group

    if (this.query) {

      this.messages = result.messages.map((message) => {
        return Message.from_message_result_and_group({
          ...message,
          group,
        })
      }
      )
    } else {
      this.messages = null
    }
  }
  // 按时间搜索
  async search_bytime(time: number): Promise<void> {
    const result = await client.search({
      group_id: this.group_id,
      query: this.query,
    })
    // console.log(result);

    const group = Group.from_search_result(result)

    this.group = group

    if (this.query) {

      let res = result.messages.filter(message => {
        let now_time = new Date().getTime()
        let start_time = message.t * 1000
        let perid = (now_time - start_time) / 3600000
        return time > perid
      })

      this.messages = res.map((message) => {
        return Message.from_message_result_and_group({
          ...message,
          group,
        })
      }
      )
    } else {
      this.messages = null
    }

  }

  // 按用户搜索
  async search_byuser(username: string): Promise<void> {
    const result = await client.search({
      group_id: this.group_id,
      query: this.query,
    })
    // console.log(result);

    const group = Group.from_search_result(result)

    this.group = group

    if (this.query) {
      let res = result.messages.filter(message => {
        let leng = username.length
        let mes_name = message.from_name.slice(0, leng)
        return mes_name === username
      })
      console.log(res);

      this.messages = res.map((message) => {
        return Message.from_message_result_and_group({
          ...message,
          group,
        })
      }
      )
    } else {
      this.messages = null
    }

  }
}
