import React, { FC, useRef, useEffect } from 'react';
import { transparentize } from 'polished';
import { Icon } from '@keen.io/icons';
import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';

import Input from '../../../input';

import {
  Container,
  Label,
  InputContainer,
  PlaceholderContainer,
} from './search-filters.styles';

type Props = {
  /** Search mode indicator */
  isActive: boolean;
  /** Active search mode handler */
  onActiveSearch: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Change search phrase event handler */
  onChangePhrase: (phrase: string) => void;
  /** Clear phrase event handler */
  onClearPhrase: () => void;
  /** Search phrase */
  searchPhrase: string;
  /** Input placeholder */
  inputPlaceholder: string;
  /** Search label */
  searchLabel: string;
};

const SearchFilters: FC<Props> = ({
  isActive,
  searchPhrase,
  searchLabel,
  inputPlaceholder,
  onClearPhrase,
  onChangePhrase,
  onActiveSearch,
}) => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  return (
    <Container>
      <InputContainer isActive={isActive}>
        <Input
          ref={inputRef}
          variant="solid"
          placeholder={inputPlaceholder}
          onChange={(e) => onChangePhrase(e.currentTarget.value)}
          value={searchPhrase}
          renderSuffix={() => (
            <div data-testid="clear-search" onClick={onClearPhrase}>
              <Icon
                type="close"
                width={10}
                height={10}
                fill={colors.gray[500]}
              />
            </div>
          )}
        />
      </InputContainer>
      <PlaceholderContainer isActive={isActive} onClick={onActiveSearch}>
        <Label>
          <BodyText variant="body2" color={colors.black[100]} fontWeight="bold">
            {searchLabel}
          </BodyText>
        </Label>
        <Icon type="search" fill={transparentize(0.5, colors.black[100])} />
      </PlaceholderContainer>
    </Container>
  );
};

export default SearchFilters;
