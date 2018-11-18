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
  ...rest
}) => {
  const { result: filedsResult } = fields.reduce(fieldsReducer, {
    formName,
    values,
    result: []
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {filedsResult}
      {showClearButton && buttons.clear && buttons.clear(reset)}
      {buttons && buttons.submit && buttons.submit(submitButtonProps)}
    </form>
  )
}

export default FormComponent
