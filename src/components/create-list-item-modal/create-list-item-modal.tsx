import { type ComponentProps, type ReactNode } from "react";

import clsx from "clsx";

import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import TextInput from "../TextInput/TextInput";

import styles from "./create-list-item-modal.module.css";

type Props = Omit<ComponentProps<typeof Modal>, "heading" | "children">;

export default function CreateListItemModal({
  ref,
  contentClassName,
  ...otherProps
}: Props): ReactNode {
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
      <form>
        <TextInput label="Title" />
        <div className={styles.actions}>
          <Button type="button">Cancel</Button>
          <Button color="primary">Submit</Button>
        </div>
      </form>
    </Modal>
  );
}
