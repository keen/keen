import React, { FC, useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Icon } from '@keen.io/icons';
import { Image, Tooltip } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import ExpiryDate from './expiry-date';
import {
  FieldItem,
  Socket,
  Separator,
  TooltipMotion,
  TooltipContent,
  CreditCardInfo,
} from './credit-card.styles';

import FieldGroup from '../field-group';
import PCIField from '../pci-field';

import { validationErrors } from './validators';
import { defaultLabels, defaultIdentifiers } from './config';

import { CreditCardFields } from './types';

const tooltipMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

type Props = {
  /** Credit card errors */
  errors?: string[];
  /** Fields labels */
  labels?: Record<CreditCardFields, string>;
  /** Fields identifiers */
  fieldsIds?: Record<CreditCardFields, string>;
};

export const CreditCard: FC<Props> = ({
  errors = [],
  labels = defaultLabels,
  fieldsIds = defaultIdentifiers,
}) => {
  const [tooltip, setTooltip] = useState({
    visible: false,
  });

  const getError = useCallback(
    (fieldName: CreditCardFields) => {
      if (errors.includes(fieldName)) {
        return validationErrors[fieldName];
      }
    },
    [errors]
  );

  const getFieldMeta = useCallback(
    (fieldName: CreditCardFields) => ({
      label: labels[fieldName],
      id: fieldsIds[fieldName],
      error: getError(fieldName),
    }),
    [labels, fieldsIds, getError]
  );

  return (
    <>
      <FieldGroup>
        <PCIField {...getFieldMeta(CreditCardFields.CARD_NUMBER)} />
      </FieldGroup>
      <FieldGroup layout="row">
        <FieldItem>
          <ExpiryDate
            iframeMonthId={fieldsIds[CreditCardFields.MONTH]}
            iframeYearId={fieldsIds[CreditCardFields.YEAR]}
            label={labels[CreditCardFields.MONTH]}
            error={
              getError(CreditCardFields.MONTH) ||
              getError(CreditCardFields.YEAR)
            }
          />
        </FieldItem>
        <Separator />
        <FieldItem>
          <PCIField {...getFieldMeta(CreditCardFields.CVV)}>
            <Socket
              onMouseEnter={() => setTooltip({ visible: true })}
              onMouseLeave={() => setTooltip({ visible: false })}
            >
              <Icon
                type="info"
                width={16}
                height={16}
                fill={colors.blue['500']}
              />
              <AnimatePresence>
                {tooltip.visible && (
                  <TooltipMotion {...tooltipMotion}>
                    <Tooltip arrowDirection="bottom">
                      <TooltipContent>
                        <CreditCardInfo>
                          <Image name="visa.png" alt="Visa" />
                          <div>3 digits on the back of your card</div>
                        </CreditCardInfo>
                        <CreditCardInfo>
                          <Image
                            name="american-express.png"
                            alt="American Express"
                          />
                          <div>4 digits on the front of your card</div>
                        </CreditCardInfo>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipMotion>
                )}
              </AnimatePresence>
            </Socket>
          </PCIField>
        </FieldItem>
      </FieldGroup>
      <FieldGroup layout="row">
        <FieldItem>
          <PCIField {...getFieldMeta(CreditCardFields.FIRST_NAME)} />
        </FieldItem>
        <Separator />
        <FieldItem>
          <PCIField {...getFieldMeta(CreditCardFields.LAST_NAME)} />
        </FieldItem>
      </FieldGroup>
    </>
  );
};

export default CreditCard;
