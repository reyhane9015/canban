import { type ReactNode, memo, useRef } from "react";

import IconButton from "@/components/IconButton/IconButton.tsx";

import MingcuteAddLine from "@/icons/MingcuteAddLine";
import MingcuteMore1Line from "@/icons/MingcuteMore1Line";

import type { ListType } from "@/types/list";

import ListItem from "../ListItem/ListItem";
import CreateListItemModal from "../create-list-item-modal/create-list-item-modal";

import styles from "./List.module.css";

type Props = {
  list: ListType;
};

const List = memo(function List({ list }: Props): ReactNode {
  const ref = useRef<HTMLDialogElement>(null);
  const handleOpenButtonClick = (): void => {
    ref.current?.showModal();
  };
  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <div className={styles.title}>{list.title}</div>
        <div className={styles.actions} onClick={handleOpenButtonClick}>
          <IconButton>
            <MingcuteAddLine />
          </IconButton>
          <IconButton>
            <MingcuteMore1Line />
          </IconButton>
        </div>
      </div>
      <ul className={styles.items}>
        {list.items.map((item) => (
          <li key={item.id}>
            <ListItem listId={list.id} item={item} />
          </li>
        ))}
      </ul>
      <CreateListItemModal ref={ref} listId={list.id} />
    </div>
  );
});

export default List;
