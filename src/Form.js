import React, { createFactory } from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import FormComponent from './FormComponent'
import { compose, mapFields, reducerWorkflows } from './utils'

class Form {
  constructor(formName, baseComponents, baseButtons, baseValidators) {
    this._names = []
    this._fields = []
    this._initialValues = {}
    this._submitButtonProps = {}
    this._clearButton = false

    this.name = formName
    this.baseButtons = { ...baseButtons }
    this.baseComponents = baseComponents
    this.baseValidators = baseValidators

    this._onSubmit = () => {
      throw new Error('onSubmit action is not defined')
    }
  }

  _saveFieldName = name => {
    if (!this._names.includes(name)) {
      return this._names.push(name)
    }
    throw new Error(`field name(${name}) must be unique`)
  }

  addField = field => {
    if (!field.type) throw new Error('type should not be empty')
    if (!field.name) throw new Error('name should not be empty')
    this._saveFieldName(field.name)

    if (field.group) {
      field.group.forEach(
        fieldGroup => fieldGroup.name && this._saveFieldName(fieldGroup.name)
      )
    }

    this._fields.push(
      mapFields(this.baseComponents, this.baseValidators)(field)
    )
    return this
  }

  fields = (...fields) => {
    fields.forEach(this.addField)
    return this
  }

  onSubmit = handleSubmit => {
    this._onSubmit = handleSubmit
    return this
  }

  clearButton = fn => {
    if (fn) this.baseButtons.clear = fn

    if (!this.baseButtons.clear) throw new Error('Clear button is not defined')

    this._clearButton = true
    return this
  }

  workflow = workflow => {
    const workflowArr = Array.isArray(workflow) ? workflow : [workflow]
    workflowArr
      .reduce((acc, wok) => {
        const result = wok.fields.filter(wokFiel => !!wokFiel.group)
        return result.length > 0 ? acc.concat(result) : acc
      }, [])
      .map(
        fieldGroup => fieldGroup.name && this._saveFieldName(fieldGroup.name)
      )

    this._fields = reducerWorkflows(
      this._fields,
      this.baseComponents,
      this.baseValidators,
      workflowArr
    )
    return this
  }

  setInitialValues = obj => {
    this._initialValues = obj
    return this
  }

  getFields = () => {
    return this._fields.concat()
  }

  setSubmitButtonProps = props => {
    this._submitButtonProps = props
    return this
  }

  build = ({
    onSubmit = this._onSubmit,
    initialValues = this._initialValues
  }) => {
    const BuildInstance = this._build
    if (this._build) return <BuildInstance />

    const formSelector = formValueSelector(this.name)
    const formEnhance = compose(
      BaseComponent => props =>
        createFactory(BaseComponent)({
          ...props,
          initialValues
        }),
      reduxForm({ form: this.name }),
      connect(state => ({
        values: formSelector(state, ...this._names) || {}
      }))
    )

    this._build = formEnhance(props => (
      <FormComponent
        {...props}
        formName={this.name}
        fields={this.getFields()}
        onSubmit={onSubmit}
        buttons={this.baseButtons}
        showClearButton={this._clearButton}
        submitButtonProps={this._submitButtonProps}
      />
    ))

    const NewBuildInstance = this._build
    return <NewBuildInstance />
  }
}

export default Form
