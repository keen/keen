import * as React from 'react';
import Filters from './filters';
import { Button } from '../index';

export default {
  title: 'Components /Filter List',
  parameters: {
    component: Filters,
    componentSubtitle: 'Displays queries list with filter',
  },
};

export const Basic: React.FC = () => {
  const [activeFilters, setActiveTags] = React.useState(['tag2']);
  const [filtersOpen, setFilterOpen] = React.useState(false);

  return (
    <>
      <Filters
        activeFilters={activeFilters}
        onUpdateFilters={(tags) => setActiveTags(tags)}
        onClearFilters={() => setActiveTags([])}
        filters={['tag1', 'tag2', 'tag3 with very very long text']}
        specialFilters={['Only cached queries']}
        isOpen={filtersOpen}
        setOpen={(open) => setFilterOpen(open)}
      >
        <Button
          variant="blank"
          isActive={filtersOpen}
          onClick={() => setFilterOpen(!filtersOpen)}
        >
          Filters{' '}
          {activeFilters && activeFilters.length
            ? ` (${activeFilters.length})`
            : null}
        </Button>
      </Filters>
    </>
  );
};
