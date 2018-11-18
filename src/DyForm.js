import React from 'react'
import Form from './Form'
import defaultValidators from './Validators'

class DyForm {
  constructor(baseComponents, baseButtons, validators = {}) {
    this.buttons = baseButtons
    this.components = baseComponents
    this.validators = { ...validators, ...defaultValidators }
  }

  create(name, form) {
    if (form) {
      const instance = this.create(name)
      instance._names = form._names.concat()
      instance._fields = form._fields.concat()
      instance._clearButton = form._clearButton
      return instance
    }

    return new Form(name, this.components, this.buttons, this.validators)
  }

  build = ({ name, fields = [], workflows = [], inititalValues, onSubmit }) => {
    const FormX = new Form(name, this.components, this.buttons, this.validators)
    if (fields.length > 0) FormX.fields(...fields)
    if (workflows.length > 0) {
      workflows.map(workflow => FormX.workFlow(workflow))
    }

    if (inititalValues) FormX.setInitialValues(inititalValues)

    FormX.onSubmit(onSubmit)
    return <FormX.build />
  }
}

export default DyForm
