import React, { createFactory } from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import FormComponent from './FormComponent'
import { compose, mapFields, reducerWorkflows } from './utils'

class Form {
  constructor(formName, baseComponents, baseValidators) {
    this._names = []
    this._fields = []
    this._footer = null
    this._persist = false
    this._initialValues = {}
    this._clearButton = false
    this._reinitialize = false

    this.name = formName
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

  workflows = (...workflow) => {
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

  persist(persist = true) {
    this._persist = persist
    return this
  }

  reinitialize(reinitialize) {
    this._reinitialize = reinitialize
    return this
  }

  setFooter(footer) {
    this._footer = footer
  }

  build = ({
    onSubmit = this._onSubmit,
    initialValues = this._initialValues
  }) => {
    if (!this._footer) {
      throw new Error('Footer is required and should be a react component')
    }

    const BuildInstance = this._build
    if (this._build) {
      return <BuildInstance onSubmit={onSubmit} initialValues={initialValues} />
    }

    const formSelector = formValueSelector(this.name)
    const formEnhance = compose(
      BaseComponent => props =>
        createFactory(BaseComponent)({
          initialValues,
          ...props
        }),
      reduxForm({
        form: this.name,
        destroyOnUnmount: this._persist,
        enableReinitialize: this._reinitialize
      }),
      connect(state => ({
        values: formSelector(state, ...this._names) || {}
      }))
    )

    this._build = formEnhance(props => (
      <FormComponent
        formName={this.name}
        fields={this.getFields()}
        onSubmit={onSubmit}
        footer={this._footer}
        showClearButton={this._clearButton}
        {...props}
      />
    ))

    const NewBuildInstance = this._build
    return <NewBuildInstance />
  }
}

export default Form
