import { type ReactNode } from "react";

import Board from "@/components/Board/Board";

import BoardProvider from "@/providers/BoardProvider";

import styles from "./BoardPage.module.css";

export default function BoardPage(): ReactNode {
  return (
    <div className={styles["board-page"]}>
      <BoardProvider>
        <Board />
      </BoardProvider>
    </div>
  );
}
