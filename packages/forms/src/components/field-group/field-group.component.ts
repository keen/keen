import styled from 'styled-components';

type Props = {
  layout?: 'row' | 'column';
};

const FieldGroup = styled.div<Props>`
  width: 100%;
  margin-bottom: 14px;
  display: flex;
  flex-direction: ${(props) => props.layout};
`;

FieldGroup.defaultProps = {
  layout: 'column',
};

export default FieldGroup;
