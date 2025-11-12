import { type MouseEvent, type ReactNode, memo, useContext } from "react";

import { BoardContext } from "@/context/board-countext";

import MingcuteDelete2Line from "@/icons/MingcuteDelete2Line";

import type { ListItemType } from "@/types/list-item";

import IconButton from "../IconButton/IconButton";

import styles from "./ListItem.module.css";

type Props = {
  listId: string;
  item: ListItemType;
  onClick?: (listId: string, itemId: string) => void;
};

const ListItem = memo(function ListItem({
  listId,
  item,
  onClick,
}: Props): ReactNode {
  const { remove } = useContext(BoardContext);
  const handleRemoveButtonClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    remove(listId, item.id);
  };

  return (
    <div
      className={styles["list-item"]}
      onClick={() => onClick?.(listId, item.id)}
    >
      {item.title}
      <IconButton onClick={handleRemoveButtonClick}>
        <MingcuteDelete2Line />
      </IconButton>
    </div>
  );
});

export default ListItem;
