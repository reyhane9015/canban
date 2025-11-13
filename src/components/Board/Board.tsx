import { type ReactNode, use, useContext } from "react";

import { toast } from "react-toastify";

import IconButton from "@/components/IconButton/IconButton.tsx";

import { ActiveItemContext } from "@/context/active-item-context";
import { BoardContext } from "@/context/board-context";

import MingcuteAddLine from "@/icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "@/icons/MingcuteEdit2Line.tsx";

import Button from "../Button/Button";
import List from "../List/List";

import styles from "./Board.module.css";

export default function Board(): ReactNode {
  const { lists, move } = useContext(BoardContext);

  const { activeListId, activeItemId, deactivate } = use(ActiveItemContext);

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

  // ##################################### //

  // const handleCreateButtonClick = (): void => {
  //   create();
  //   toast.success("item created successfully");
  // };

  // ##################################### //

  const handleMoveButtonClick = (toListId: string): void => {
    if (activeListId && activeItemId) {
      move(activeListId, activeItemId, toListId);
      toast.success("item moved successfully");
    }
    deactivate();
  };
  // const handleListItemRemove = (listId: string, itemId: string): void => {
  //   remove(listId, itemId);
  //   setActiveItemId(null);
  //   setActiveListId(null);
  // };

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
                  <Button
                    key={list.id}
                    onClick={() => handleMoveButtonClick(list.id)}
                  >
                    {list.title}
                  </Button>
                ))}
              {/* <Button onClick={handleListIt emRemove}>Remove</Button> */}
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
            <List list={list} />
          </li>
        ))}
      </ul>
    </div>
  );
}
