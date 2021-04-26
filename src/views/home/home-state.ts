import { Group } from "@/models/group"
import { Message } from "@/models/message"
import { luoxu_client_instance as client } from "@/clients/luoxu-client"

export class HomeState {
  query: string = ""
  groups: null | Array<Group> = null

  constructor() {}

  async init(): Promise<void> {
    const result = await client.groups()

    this.groups = result.map(Group.from_group_result)
  }
}