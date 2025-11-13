import {
  type PropsWithChildren,
  type ReactNode,
  useEffect,
  useState,
} from "react";

import { ActiveItemContext } from "@/context/active-item-context";

type Props = PropsWithChildren;

export default function ActiveItemProvider({ children }: Props): ReactNode {
  const [activeListId, setActiveListId] = useState<string | null>(null);

  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  useEffect(() => {
    const handleDocumentKeyDown = (e: KeyboardEvent): void => {
      if (e.code !== "Escape") {
        return;
      }

      //   setActiveListId(null);
      //   setActiveItemId(null);
      deactivate();
    };
    document.addEventListener("keydown", handleDocumentKeyDown);

    return (): void => {
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, []);

  const activate = (listId: string, itemId: string): void => {
    setActiveItemId(itemId);
    setActiveListId(listId);
  };
  const deactivate = (): void => {
    setActiveItemId(null);
    setActiveListId(null);
  };

  return (
    <ActiveItemContext
      value={{ activeListId, activeItemId, activate, deactivate }}
    >
      {children}
    </ActiveItemContext>
  );
}
