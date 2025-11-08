import type { ListItemType } from "./list-item";

export type ListType = {
  id: string;
  title: string;
  items: ListItemType[];
};
