import {
  type PropsWithChildren,
  type ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";

import { listsData } from "@/data/list-data";

import { BoardContext } from "@/context/board-countext";

import { listsReducer } from "@/reducers/lists-resucer";

import type { ListType } from "@/types/list";

function save(lists: ListType[]): void {
  localStorage.setItem("lists", JSON.stringify(lists));
}

function load(): ListType[] {
  const item = localStorage.getItem("lists");
  if (!item) {
    return listsData;
  }

  return JSON.parse(item);
}

type Props = PropsWithChildren;

export default function BoardProvider({ children }: Props): ReactNode {
  // const [lists, setLists] = useState<ListType[]>(load);

  const [lists, dispatch] = useReducer(listsReducer, load());

  useEffect(() => {
    save(lists);
  }, [lists]);

  const create = (): void => {
    dispatch({ type: "created" });
  };

  const move = (fromListId: string, itemId: string, toListId: string): void => {
    dispatch({ type: "moved", fromListId, itemId, toListId });
  };

  const remove = (listId: string, itemId: string): void => {
    dispatch({ type: "removed", listId, itemId });
  };

  return (
    <BoardContext value={{ lists, create, move, remove }}>
      {children}
    </BoardContext>
  );
}
