import React from 'react'
import fieldsReducer from './FieldReducer'

const FormComponent = ({
  reset,
  values,
  fields,
  buttons,
  formName,
  onSubmit,
  handleSubmit,
  showClearButton,
  submitButtonProps,
  ...props
}) => {
  const { result: filedsResult } = fields.reduce(fieldsReducer, {
    formName,
    values,
    result: []
  })

  return (
    <form onSubmit={handleSubmit(form => onSubmit(form, { reset, ...props }))}>
      {filedsResult}
      {showClearButton && buttons.clear && buttons.clear(reset)}
      {buttons &&
        buttons.submit &&
        buttons.submit({ reset, ...props, ...submitButtonProps })}
    </form>
  )
}

export default FormComponent
