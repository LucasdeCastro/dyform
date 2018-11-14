import React, { createFactory } from "react";
import { connect } from "react-redux";
import { reduxForm, formValueSelector } from "redux-form";
import FormComponent from "./FormComponent";
import { compose, mapFields, reducerWorkflows } from "./utils";

class Form {
  constructor(formName, baseComponents, baseButtons, baseValidators) {
    this._names = [];
    this._fields = [];
    this._initialValues = {};
    this._clearButton = false;

    this.name = formName;
    this.baseButtons = { ...baseButtons };
    this.baseComponents = baseComponents;
    this.baseValidators = baseValidators;

    this._onSubmit = () => {
      throw new Error("onSubmit action is not defined");
    };
  }

  addField = field => {
    if (!field.type) throw new Error("type should not be empty");
    if (!field.name) throw new Error("name should not be empty");
    if (this._names.includes(field.name))
      throw new Error("field name must be unique");

    this._names.push(field.name);
    this._fields.push(
      mapFields(this.baseComponents, this.baseValidators)(field)
    );
    return this;
  };

  fields = (...fields) => {
    fields.forEach(this.addField);
    return this;
  };

  onSubmit = handleSubmit => {
    this._onSubmit = handleSubmit;
    return this;
  };

  clearButton = fn => {
    if (fn) this.baseButtons.clear = fn;

    if (!this.baseButtons.clear) throw new Error("Clear button is not defined");

    this._clearButton = true;
    return this;
  };

  workflow = workflow => {
    this._fields = reducerWorkflows(
      this._fields,
      this.baseComponents,
      this.baseValidators,
      this._addFieldsNames,
      Array.isArray(workflow) ? workflow : [workflow]
    );
    return this;
  };

  _addFieldsNames = name => {
    if (!this._names.includes(name)) this._names.push(name);
  };

  setInitialValues = obj => {
    this._initialValues = obj;
    return this;
  };

  getFields = () => {
    return this._fields.concat();
  };

  build = () => {
    const formSelector = formValueSelector(this.name);
    const formEnhance = compose(
      BaseComponent => props =>
        createFactory(BaseComponent)({
          ...props,
          initialValues: this._initialValues
        }),
      reduxForm({ form: this.name }),
      connect(state => ({
        values: formSelector(state, ...this._names) || {}
      }))
    );

    const Builded = formEnhance(props => (
      <FormComponent
        {...props}
        formName={this.name}
        fields={this.getFields()}
        onSubmit={this._onSubmit}
        buttons={this.baseButtons}
        showClearButton={this._clearButton}
      />
    ));

    return <Builded />;
  };
}

export default Form;
