import styled from 'styled-components';
import { Form } from 'react-bootstrap';

const StyledForm = styled(Form)`
  display:flex;
  max-width: 850px;
  max-height: 750px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.6s; 

  &:hover {
    box-shadow: 0px 0px 5px rgba(0, 0, 257, 0.4);
  }
`;

export default StyledForm;
