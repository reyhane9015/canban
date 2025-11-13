import { type ReactNode, useRef } from "react";

// import Board from "@/components/Board/Board";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";

import ActiveItemProvider from "@/providers/ActiveItemProvider";
import BoardProvider from "@/providers/BoardProvider";

import styles from "./BoardPage.module.css";

export default function BoardPage(): ReactNode {
  const ref = useRef<HTMLDialogElement>(null);
  const handleOpenButtonClick = (): void => {
    ref.current?.showModal();
  };

  return (
    <BoardProvider>
      <ActiveItemProvider>
        <div className={styles["board-page"]}>
          {/* <Board /> */}

          <Button color="primary" onClick={handleOpenButtonClick}>
            Open
          </Button>
          <Modal ref={ref} heading="head">
            children of modal
          </Modal>
        </div>
      </ActiveItemProvider>
    </BoardProvider>
  );
}
