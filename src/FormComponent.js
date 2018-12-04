import React from 'react'
import fieldsReducer from './FieldReducer'

const FormComponent = ({
  reset,
  values,
  fields,
  footer,
  formName,
  onSubmit,
  handleSubmit,
  initialValues,
  showClearButton,
  ...props
}) => {
  const { result: filedsResult } = fields.reduce(fieldsReducer, {
    formName,
    values: { ...initialValues, ...values },
    result: []
  })

  return (
    <form onSubmit={handleSubmit(form => onSubmit(form, { reset, ...props }))}>
      {filedsResult}
      {footer && footer({ reset, ...props })}
    </form>
  )
}

export default FormComponent
