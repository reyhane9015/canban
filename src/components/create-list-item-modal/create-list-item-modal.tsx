import {
  type ComponentProps,
  type FormEvent,
  type ReactNode,
  use,
} from "react";

import { toast } from "react-toastify";

import clsx from "clsx";

import { BoardContext } from "@/context/board-context";

import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import TextInput from "../TextInput/TextInput";

import styles from "./create-list-item-modal.module.css";

type Props = Omit<ComponentProps<typeof Modal>, "heading" | "children"> & {
  listId: string;
};

export default function CreateListItemModal({
  ref,
  contentClassName,
  listId,
  ...otherProps
}: Props): ReactNode {
  const { create } = use(BoardContext);

  const handleCancelButtonClick = (): void => {
    ref.current?.close();
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const id = globalThis.crypto.randomUUID();
    const title = formData.get("title") as string;

    create(listId, { id, title });
    toast.success("item created successfully");
    e.currentTarget.reset();
    ref.current?.close();
  };
  return (
    <Modal
      ref={ref}
      contentClassName={clsx(
        styles["create-list-item-modal"],
        contentClassName,
      )}
      heading="Create new item"
      {...otherProps}
    >
      <form onSubmit={handleFormSubmit}>
        <TextInput label="Title" name="title" type="text" />
        <div className={styles.actions}>
          <Button type="reset" onClick={handleCancelButtonClick}>
            Cancel
          </Button>
          <Button color="primary">Submit</Button>
        </div>
      </form>
    </Modal>
  );
}
