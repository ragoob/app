export class Notifications{
  type: NotificationTypes
  dismissible?: boolean
  durationTime?: number
  message: string
}

export enum NotificationTypes{
    SUCCESS = "success",
    WARNING = "warning",
    INFO = "info",
    ERROR = "danger"
}