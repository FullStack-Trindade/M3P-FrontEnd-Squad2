
import PropTypes from 'prop-types'
import StyledForm from './Form.style';

export default function FormComponent ({title}){  
  return (
    <StyledForm>
        <h1>{title}</h1>
    
    </StyledForm>
  );
}

FormComponent.propTypes ={
title: PropTypes.string,
}