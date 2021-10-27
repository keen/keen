import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { transparentize } from 'polished';
import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';
import { useOnClickOutside } from '@keen.io/react-hooks';

import { getRelativeBoundingRect } from '../../utils';
import { Dropdown } from '../index';
import Portal from '../portal';

import { FilterItem, SearchFilters } from './components';
import {
  ClearFilters,
  Container,
  DropdownContent,
  EmptySearch,
  FiltersContainer,
} from './filters.styles';

const DefaultLabels = {
  search_label: 'Search filters',
  search_input_placeholder: 'Search filters',
  clear_filters: 'Clear filters',
  no_filters_found: 'No filters',
};

type Props = {
  /** Available filters */
  filters: string[];
  /** Special filters */
  specialFilters?: string[];
  /** Selected filters */
  activeFilters: string[];
  /** Update tags filters event handler */
  onUpdateFilters: (tags: string[]) => void;
  /** Clear filters event handler */
  onClearFilters: () => void;
  /** Is tags dropdown open */
  isOpen: boolean;
  /** Set tags dropdown open */
  setOpen: (isOpen: boolean) => void;
  /** Text labels used inside component */
  labels?: typeof DefaultLabels;
  /** Container in which dropdown should be rendered - can be useful when solving z-index issues */
  dropdownContainer: string;
};

const Filters: FC<Props> = ({
  activeFilters,
  onUpdateFilters,
  onClearFilters,
  filters,
  specialFilters,
  isOpen,
  setOpen,
  children,
  labels = DefaultLabels,
  dropdownContainer,
}) => {
  const containerRef = useRef(null);
  const dropdownContainerRef = useRef(null);
  const [searchMode, setSearchMode] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [dropdown, setDropdown] = useState({ x: 0, y: 0 });

  const filteredItems = useMemo(() => {
    if (searchPhrase) {
      const phrase = searchPhrase.toLowerCase();
      return filters.filter((filters) =>
        filters.toLowerCase().includes(phrase)
      );
    }
    return filters;
  }, [searchPhrase, filters]);

  useEffect(() => {
    const { left, bottom } = getRelativeBoundingRect(
      dropdownContainer,
      containerRef.current
    );

    setDropdown((state) => ({
      ...state,
      x: left,
      y: bottom,
    }));
  }, [isOpen]);

  const updateFilters = useCallback(
    (isActive: boolean, filter: string) => {
      const updatedFilters = isActive
        ? [...activeFilters, filter]
        : activeFilters.filter((t) => t !== filter);
      onUpdateFilters(updatedFilters);
    },
    [activeFilters, onUpdateFilters]
  );

  const isEmptySearch = searchPhrase && !filteredItems.length;

  useOnClickOutside(dropdownContainerRef, () => {
    if (isOpen) {
      setOpen(false);
      setSearchPhrase('');
      setSearchMode(false);
    }
  });

  return (
    <Container data-testid="filter-queries" ref={containerRef}>
      {children}
      <Portal modalContainer={'#' + dropdownContainer}>
        <div ref={dropdownContainerRef}>
          <Dropdown
            isOpen={isOpen}
            fullWidth={false}
            motion={{
              initial: { opacity: 0, top: dropdown.y, left: dropdown.x, y: 20 },
              animate: { opacity: 1, y: 2 },
              exit: { opacity: 0, y: 30 },
            }}
          >
            <DropdownContent>
              {specialFilters &&
                specialFilters.map((filter) => (
                  <FilterItem
                    id={filter}
                    key={filter}
                    label={filter}
                    isActive={activeFilters.includes(filter)}
                    onChange={(isActive) => updateFilters(isActive, filter)}
                  />
                ))}
              <SearchFilters
                isActive={searchMode}
                searchPhrase={searchPhrase}
                inputPlaceholder={labels.search_input_placeholder}
                searchLabel={labels.search_label}
                onChangePhrase={(phrase) => setSearchPhrase(phrase)}
                onClearPhrase={() => {
                  setSearchPhrase('');
                  setSearchMode(false);
                }}
                onActiveSearch={() => setSearchMode(true)}
              />
              <FiltersContainer>
                {filteredItems.map((filter) => (
                  <FilterItem
                    key={filter}
                    id={filter}
                    isActive={activeFilters.includes(filter)}
                    label={filter}
                    onChange={(isActive) => updateFilters(isActive, filter)}
                  />
                ))}
              </FiltersContainer>
              {isEmptySearch && (
                <EmptySearch>
                  <BodyText
                    variant="body3"
                    color={transparentize(0.2, colors.black[100])}
                    fontWeight={400}
                  >
                    {labels.no_filters_found}
                  </BodyText>
                </EmptySearch>
              )}
            </DropdownContent>
            <ClearFilters onClick={onClearFilters}>
              <BodyText
                variant="body2"
                color={colors.blue[200]}
                fontWeight="bold"
              >
                {labels.clear_filters}
              </BodyText>
            </ClearFilters>
          </Dropdown>
        </div>
      </Portal>
    </Container>
  );
};

export default Filters;
