import { type ReactNode, useCallback, useState } from "react";

import { listsData } from "@/data/list-data";

import IconButton from "@/components/IconButton/IconButton.tsx";

import MingcuteAddLine from "@/icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "@/icons/MingcuteEdit2Line.tsx";

import type { ListType } from "@/types/list";
import type { ListItemType } from "@/types/list-item";

import List from "../List/List";

import styles from "./Board.module.css";

export default function Board(): ReactNode {
  const [lists, setLists] = useState<ListType[]>(listsData);

  const handleListItemClick = useCallback((id: string): void => {
    setLists((old) => {
      // ************ 2 solution for handle delete *************** //

      //  solution 1)) *************
      const clone = [...old];

      const newItems = clone[0].items.filter(
        (item: ListItemType) => item.id !== id,
      );

      const newList = { ...clone[0], items: newItems };

      // 3 solution for return result **********
      // 1))))))
      // clone[0] = newList;
      // return clone;
      // .....................
      // 2))))))))))
      return [newList, ...old];
      // .....................
      // 3))))))))))
      // return [newList, old[1], old[2]];

      //  solution 2)) *************
      // const clone = {
      //   ...old[0],
      //   items: old[0].items.filter((item) => item.id !== id),
      // };
      // return [clone, old[1], old[2]];
    });
  }, []);

  return (
    <div className={styles.board}>
      <div className={styles.toolbar}>
        <div className={styles.title}>Board Title</div>
        <div className={styles.actions}>
          <IconButton>
            <MingcuteEdit2Line />
          </IconButton>
          <IconButton>
            <MingcuteAddLine />
          </IconButton>
        </div>
      </div>
      <ul className={styles.lists}>
        <li>
          <List list={lists[0]} onClick={handleListItemClick} />
        </li>
        <li>{/* <List list={lists[1]} onClick={handleListItemClick} /> */}</li>
        <li>{/* <List list={lists[2]} onClick={handleListItemClick} /> */}</li>
      </ul>
    </div>
  );
}
