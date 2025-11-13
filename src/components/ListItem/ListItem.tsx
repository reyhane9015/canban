import { type MouseEvent, type ReactNode, memo, use, useContext } from "react";

import clsx from "clsx";

import { ActiveItemContext } from "@/context/active-item-context";
import { BoardContext } from "@/context/board-countext";

import MingcuteDelete2Line from "@/icons/MingcuteDelete2Line";

import type { ListItemType } from "@/types/list-item";

import IconButton from "../IconButton/IconButton";

import styles from "./ListItem.module.css";

type Props = {
  listId: string;
  item: ListItemType;
};

const ListItem = memo(function ListItem({ listId, item }: Props): ReactNode {
  const { remove } = useContext(BoardContext);

  const { activeItemId, activate, deactivate } = use(ActiveItemContext);

  const handleListItemClick = (): void => {
    if (item.id === activeItemId) {
      deactivate();
    } else {
      activate(listId, item.id);
    }
  };

  const handleRemoveButtonClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    remove(listId, item.id);
    deactivate();
  };

  return (
    <div
      className={clsx(
        styles["list-item"],
        item.id === activeItemId && styles.active,
      )}
      onClick={handleListItemClick}
    >
      {item.title}
      <IconButton onClick={handleRemoveButtonClick}>
        <MingcuteDelete2Line />
      </IconButton>
    </div>
  );
});

export default ListItem;
