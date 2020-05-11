import React, { FC, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import {
  Container,
  Tag,
  Text,
  IconWrapper,
  StyledInput,
} from './tag-manager.styles';

import { KeyCodes, Opacity } from './types';

type Props = {
  tags: string[];
  validator: (tagValue: string) => boolean;
  onCreate: (value: string) => void;
  onRemove: (value: string, index: number) => void;
  onError?: () => void;
  placeholder?: string;
  hasError?: boolean;
  blinkTime?: number;
};

export const TagManager: FC<Props> = ({
  tags,
  onCreate,
  onRemove,
  onError,
  validator,
  placeholder,
  hasError,
  blinkTime = 100,
}) => {
  const inputElement = useRef(null);
  const [opacity, setOpacity] = useState(1);

  return (
    <Container hasError={hasError}>
      {tags.map((tag, idx) => (
        <Tag key={idx}>
          <Text title={tag}>{tag}</Text>
          <IconWrapper onClick={() => onRemove(tag, idx)} role="button">
            <Icon
              type="close"
              fill={colors.blue['500']}
              width={10}
              height={10}
            />
          </IconWrapper>
        </Tag>
      ))}
      <motion.div animate={{ opacity }} transition={{ duration: 0.1 }}>
        <StyledInput
          ref={inputElement}
          placeholder={placeholder}
          onBlur={e => {
            const tag = e.currentTarget.value;
            if (validator(tag) && !tags.includes(tag)) {
              onCreate(tag);
              inputElement.current.value = '';
            }
          }}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (
              e.charCode === KeyCodes.COMMA ||
              e.charCode === KeyCodes.ENTER
            ) {
              e.preventDefault();
              const tag = e.currentTarget.value;
              if (validator(tag) && !tags.includes(tag)) {
                onCreate(tag);
                inputElement.current.value = '';
              } else {
                if (onError) onError();
                setOpacity(Opacity.HIDDEN);
                setTimeout(() => setOpacity(Opacity.VISIBLE), blinkTime);
              }
            }
          }}
        />
      </motion.div>
    </Container>
  );
};

export default TagManager;
