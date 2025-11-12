import { type ReactNode, useCallback, useState } from "react";

import { listsData } from "@/data/list-data";

import IconButton from "@/components/IconButton/IconButton.tsx";

import MingcuteAddLine from "@/icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "@/icons/MingcuteEdit2Line.tsx";

import type { ListType } from "@/types/list";
import type { ListItemType } from "@/types/list-item";

import Button from "../Button/Button";
import List from "../List/List";

import styles from "./Board.module.css";

export default function Board(): ReactNode {
  const [lists, setLists] = useState<ListType[]>(listsData);

  const [activeListId, setActiveListId] = useState<string | null>(null);

  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  // const handleListItemClick = useCallback((id: string): void => {
  //   setLists((old) => {
  //     // ************ 2 solution for handle delete *************** //

  //     //  solution 1)) *************
  //     const clone = [...old];

  //     const newItems = clone[0].items.filter(
  //       (item: ListItemType) => item.id !== id,
  //     );

  //     const newList = { ...clone[0], items: newItems };

  //     // 3 solution for return result **********
  //     // 1))))))
  //     // clone[0] = newList;
  //     // return clone;
  //     // .....................
  //     // 2))))))))))
  //     return [newList, ...old];
  //     // .....................
  //     // 3))))))))))
  //     // return [newList, old[1], old[2]];

  //     //  solution 2)) *************
  //     // const clone = {
  //     //   ...old[0],
  //     //   items: old[0].items.filter((item) => item.id !== id),
  //     // };
  //     // return [clone, old[1], old[2]];
  //   });
  // }, []);

  const handleListItemClick = useCallback(
    (listId: string, itemId: string): void => {
      setActiveItemId(itemId);
      setActiveListId(listId);
    },
    [],
  );

  const handleRemoveButtonClick = (): void => {
    setLists((old) => {
      try {
        const activeListIndex = old.findIndex(
          (list) => list.id === activeListId,
        );

        if (activeListIndex === -1) {
          console.error("can not find the list.");
          return old;
        }

        const clone = [...old];
        const activeList = { ...clone[activeListIndex] };

        const activeItemIndex = activeList.items.findIndex(
          (item) => item.id === activeItemId,
        );

        if (activeItemIndex === -1) {
          console.error("can not find the item.");
          return old;
        }

        activeList.items.splice(activeItemIndex, 1);

        clone[activeListIndex] = activeList;

        return clone;
      } finally {
        setActiveItemId(null);
        setActiveListId(null);
      }
    });
  };
  return (
    <div className={styles.board}>
      <div className={styles.toolbar}>
        <div className={styles.title}>Board Title</div>
        <div className={styles.actions}>
          {activeListId !== null && (
            <div className={styles.spacer}>
              {lists
                .filter((list) => list.id !== activeListId)
                .map((list) => (
                  <Button key={list.id}>{list.title}</Button>
                ))}
              <Button onClick={handleRemoveButtonClick}>Remove</Button>
            </div>
          )}
          <IconButton>
            <MingcuteEdit2Line />
          </IconButton>
          <IconButton>
            <MingcuteAddLine />
          </IconButton>
        </div>
      </div>
      <ul className={styles.lists}>
        {lists.map((list) => (
          <li key={list.id}>
            <List list={list} onClick={handleListItemClick} />
          </li>
        ))}
      </ul>
    </div>
  );
}
