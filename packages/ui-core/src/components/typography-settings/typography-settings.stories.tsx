import React, { useState } from 'react';
import {
  EditorState,
  RichUtils,
  convertFromRaw,
  RawDraftContentState,
} from 'draft-js';

import { styles } from './customStyles';
import { TextAlignment } from './types';

import TypographySettings from './typography-settings.component';

export default {
  title: 'Components / Typography Settings',
  parameters: {
    component: TypographySettings,
    componentSubtitle: 'Displays customized typography settings',
  },
};

const initialTextAlignment = 'left';
const initialContent: RawDraftContentState = { blocks: [], entityMap: {} };

export const Basic = () => {
  const [textAlignment, setTextAlignment] = useState<TextAlignment>(
    initialTextAlignment
  );
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromRaw(initialContent))
  );

  console.log(editorState);

  return (
    <TypographySettings
      editorState={editorState}
      textAlignment={textAlignment}
      onUpdateInlineStyleAttribute={(inlineStyleType) => {
        const updatedEditorState = RichUtils.toggleInlineStyle(
          editorState,
          inlineStyleType
        );
        setEditorState(updatedEditorState);
      }}
      onUpdateColor={(color) => {
        const updatedEditorState = styles.color.toggle(editorState, color);
        setEditorState(updatedEditorState);
      }}
      onUpdateTextAlignment={(alignment) => setTextAlignment(alignment)}
      onUpdateFontSize={(fontSize) => {
        const updatedEditorState = styles.fontSize.toggle(
          editorState,
          `${fontSize}px`
        );
        setEditorState(updatedEditorState);
      }}
    />
  );
};

Basic.story = {
  parameters: {
    docs: {
      storyDesciption: 'Typogprahy settings',
    },
  },
};
