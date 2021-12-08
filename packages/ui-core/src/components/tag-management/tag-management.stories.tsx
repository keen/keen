import React, { useState } from 'react';

import TagManagement from './tag-management.component';

export default {
  title: 'Components /Tag Management',
  parameters: {
    component: TagManagement,
    componentSubtitle: 'Displays tag manager wizard',
  },
};

export const Basic = () => {
  const [tags, setTags] = useState([]);
  const tagsPool = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7'];
  return (
    <TagManagement
      tags={tags}
      tagsPool={tagsPool}
      onAddTag={(tag) => {
        setTags((tags) => [...tags, tag]);
      }}
      onRemoveTag={(tag) => {
        setTags(() => tags.filter((tagName) => tagName !== tag));
      }}
      newTagLabel="(New tag)"
      tagsLabel="Tags"
      placeholderLabel="Insert item and confirm by Enter"
    />
  );
};
