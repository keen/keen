import React, { forwardRef, useCallback, useRef } from 'react';

import { ListContainer, ListItem } from './dropdown-list.styles';

interface ListElement {
  label: string;
  value: any;
}

type Props<T> = {
  /** Collection of items */
  items: T[];
  /** Scroll timeout in [ms]  */
  debounce?: number;
  /** Click event handler */
  onClick: (e: React.MouseEvent<HTMLLIElement>, item: T) => void;
  /** Active item function */
  setActiveItem?: (item: T, idx: number) => boolean;
  /** Item render function */
  renderItem?: (item: T, isActive: boolean) => JSX.Element;
  /** List padding */
  padding?: string;
};

const defaultItemRender = ({ label }: { label: string }) => <>{label}</>;

const defaultSetActive = () => false;

const DropdownList = forwardRef(
  <T extends ListElement>(
    {
      items,
      onClick,
      renderItem = defaultItemRender,
      setActiveItem = defaultSetActive,
      debounce = 0,
      padding = '10px 0',
    }: Props<T>,
    ref: React.MutableRefObject<HTMLLIElement>
  ) => {
    const debounceRef = useRef(null);

    const scrollItem = useCallback(() => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (ref?.current) {
        debounceRef.current = setTimeout(() => {
          ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest',
          });
        }, debounce);
      }
    }, [ref?.current, setActiveItem]);

    return (
      <ListContainer padding={padding}>
        {items.map((item, idx) => {
          const isActive = setActiveItem(item, idx);

          if (isActive) scrollItem();

          return (
            <ListItem
              isActive={isActive}
              ref={isActive ? ref : null}
              key={idx}
              onClick={(e) => onClick(e, item)}
            >
              {renderItem(item, isActive)}
            </ListItem>
          );
        })}
      </ListContainer>
    );
  }
);

DropdownList.displayName = 'DropdownList';

export default DropdownList;
