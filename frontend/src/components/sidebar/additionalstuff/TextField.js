import React from 'react';
import { ErrorMessage, useField } from 'formik';
import VisibilityIcon from '@material-ui/icons/Visibility';
export const TextField = ({ label,value , ...props}) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2">
      <label htmlFor={field.name}>{label}</label>
      <div style={{display:"flex" , justifyContent :"space-between"}}>

      <input value={props.value}
        className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
        {...field} {...props}
        />
        </div>
      <ErrorMessage  name={field.name} />
    </div>
  )


}