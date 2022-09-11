export interface Tab {
  title: string;
  component: Object;
  data?: any;
}

export type ItemTypes = "join" | "mention" | "upgrade_plan" | "file" | "edited";
export interface NotificationInterface<Meta = any> {
  name: string;
  photo: string;
  item_type: ItemTypes;
  metadata?: Meta;
  group: string;
  emoji: string;
  date: Date | string;
  read: boolean;
  status: "online" | "busy" | "offline";
}

export interface JoinMetaData {
  title: string;
}

export interface MentionMetaData {
  title: string;
}

export interface UpgradePlanMetaData {
  title: string;
}

export interface FileMetaData {
  size: string;
  filename: string;
  type: string;
}

export interface EditedMetaData {
  title: string;
  oldMessage: string;
  newMessage: string;
}
