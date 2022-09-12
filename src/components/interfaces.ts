import type { Moment } from "moment";

export interface Tab {
  title: string;
  component: Object;
  data?: any;
}

type ItemProps = {
  join: {
    Meta: JoinMetaData;
    name: "join";
  };
  mention: {
    Meta: MentionMetaData;
    name: "mention";
  };
  upgrade_plan: {
    Meta: UpgradePlanMetaData;
    name: "upgrade_plan";
  };
  file: {
    Meta: FileMetaData;
    name: "file";
  };
  edited: {
    Meta: EditedMetaData;
    name: "edited";
  };
  any: {
    Meta: any;
    name: ItemTypes;
  };
};
export type ItemTypes = Exclude<keyof ItemProps, "any">;

export interface NotificationInterface<type extends keyof ItemProps = "any"> {
  name: string;
  photo?: string;
  item_type: ItemProps[type]["name"];
  metadata?: ItemProps[type]["Meta"];
  group: string;
  emoji?: string;
  date: Date | string | Moment;
  read: boolean;
  status: "online" | "busy" | "offline" | "none";
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
