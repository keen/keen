/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';

import { Accordion } from './accordion.component';

export default {
  title: 'Components / Accordion',
  parameters: {
    component: Accordion,
    componentSubtitle: 'Displays customized accordion',
  },
};

export const basic = () => {
  const [isOpen, setOpen] = React.useState(true);

  return (
    <>
      <Accordion
        title="Accordion 1"
        isOpen={isOpen}
        onChange={(open) => setOpen(open)}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam nam
        repellat error quam enim architecto nisi dolor doloremque voluptatibus
        vel quod ad doloribus sint quo, id perspiciatis nesciunt obcaecati ex?
      </Accordion>
      <Accordion
        title="Accordion 2 with extra long title that should be truncated for some viewport width"
        isOpen
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam nam
        repellat error quam enim architecto nisi dolor doloremque voluptatibus
        vel quod ad doloribus sint quo, id perspiciatis nesciunt obcaecati ex?
      </Accordion>
      <Accordion
        title="Accordion 3 with scrollable content"
        maxHeight={100}
        isOpen
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam nam
          repellat error quam enim architecto nisi dolor doloremque voluptatibus
          vel quod ad doloribus sint quo, id perspiciatis nesciunt obcaecati ex?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam nam
          repellat error quam enim architecto nisi dolor doloremque voluptatibus
          vel quod ad doloribus sint quo, id perspiciatis nesciunt obcaecati ex?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam nam
          repellat error quam enim architecto nisi dolor doloremque voluptatibus
          vel quod ad doloribus sint quo, id perspiciatis nesciunt obcaecati ex?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam nam
          repellat error quam enim architecto nisi dolor doloremque voluptatibus
          vel quod ad doloribus sint quo, id perspiciatis nesciunt obcaecati ex?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam nam
          repellat error quam enim architecto nisi dolor doloremque voluptatibus
          vel quod ad doloribus sint quo, id perspiciatis nesciunt obcaecati ex?
        </p>
      </Accordion>
    </>
  );
};
