import React, { FC, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';
import { useTooltip } from '@keen.io/react-hooks';

import Tooltip from '../tooltip';
import { TabsContainer, Tab } from './tabs.styles';

import { KEYBOARD_KEYS } from '../../constants';

type Props = {
  /** Tabs configuration */
  tabs: { label: string; id: string }[];
  /** Active Tab */
  activeTab?: string;
  /** Click event handler */
  onClick?: (tabId: string) => void;
};

const TOOLTIP_MOTION = {
  transition: { duration: 0.3, delay: 0.5 },
  exit: { opacity: 0 },
};

const Tabs: FC<Props> = ({ tabs, activeTab, onClick }) => {
  const [overflowedTabs, setOverflowedTabs] = useState<number[]>([]);
  const [tooltipLabel, setTooltipLabel] = useState<string>();
  const containerRef = useRef(null);

  const {
    tooltipVisible,
    tooltipPosition,
    updateTooltipPosition,
    hideTooltip,
  } = useTooltip(containerRef);

  useEffect(() => {
    if (containerRef.current) {
      const textNodes: HTMLParagraphElement[] = Array.from(
        containerRef.current.getElementsByTagName('p')
      );

      textNodes.forEach((node, idx) => {
        const scrollWidth = node.scrollWidth;
        const offsetWidth = node.offsetWidth;

        if (scrollWidth > offsetWidth)
          setOverflowedTabs((state) => [...state, idx]);
      });
    }
  }, [containerRef]);

  return (
    <TabsContainer role="tablist" ref={containerRef}>
      <AnimatePresence>
        {tooltipVisible && tooltipLabel && (
          <motion.div
            {...TOOLTIP_MOTION}
            initial={{ opacity: 0, x: tooltipPosition.x, y: tooltipPosition.y }}
            animate={{
              x: tooltipPosition.x,
              y: tooltipPosition.y,
              opacity: 1,
            }}
            style={{
              position: 'absolute',
              pointerEvents: 'none',
            }}
          >
            <Tooltip mode="light" hasArrow={false}>
              <BodyText
                variant="body3"
                fontWeight={400}
                color={colors.black[500]}
              >
                {tooltipLabel}
              </BodyText>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
      {tabs.map(({ label, id }, idx) => (
        <Tab
          role="tab"
          key={id}
          onClick={() => onClick(id)}
          onKeyDown={(e) => {
            if (e.keyCode === KEYBOARD_KEYS.ENTER) {
              onClick(id);
            }
          }}
          isActive={id === activeTab}
          tabIndex={0}
          onMouseEnter={(e) => {
            if (overflowedTabs.includes(idx)) {
              updateTooltipPosition(e);
              setTooltipLabel(label);
            }
          }}
          onMouseLeave={() => {
            hideTooltip();
          }}
        >
          <BodyText
            variant="body2"
            fontWeight="bold"
            color={colors.green[500]}
            enableTextEllipsis
          >
            {label}
          </BodyText>
        </Tab>
      ))}
    </TabsContainer>
  );
};

export default Tabs;
