import { useEffect, DependencyList } from 'react';

type Options = {
  /** Action invoked during handling key */
  keyboardAction: (e: KeyboardEvent, keyCode: number) => void;
  /** Collection of handled keys */
  handledKeys: KeyboardEvent['keyCode'][];
  /** Condition used to attach event listener to document */
  addEventListenerCondition: boolean;
  /* Dependency list for attaching event listener */
  eventListenerDependencies: DependencyList;
};

export const useKeypress = ({
  addEventListenerCondition,
  eventListenerDependencies,
  handledKeys,
  keyboardAction,
}: Options) => {
  const keyboardHandler = (e: KeyboardEvent) => {
    const keyCode = e.keyCode;
    if (handledKeys.includes(keyCode)) keyboardAction(e, keyCode);
  };

  useEffect(() => {
    if (addEventListenerCondition) {
      document.addEventListener('keydown', keyboardHandler);
    }
    return () => {
      document.removeEventListener('keydown', keyboardHandler);
    };
  }, [eventListenerDependencies]);
};
