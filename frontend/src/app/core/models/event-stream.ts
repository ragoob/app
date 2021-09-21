import { BaseResource } from "./resources.result"

export class EventStream<T extends BaseResource>{
    NameSpace: string
    Resource: string
    EventName: string
    PayLoad:  T
    ClusterId: string
}