# dy-form

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

>

[![NPM](https://img.shields.io/npm/v/dy-form.svg)](https://www.npmjs.com/package/dy-form) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

DyForm is an abstraction for dynamically creating forms or just another way to user some features of redux-form.

## Install

```bash
npm install --save dy-form
```

#### or

```bash
yarn add dy-form
```

## Usage

First create an instance of DyForm

```jsx

import DyForm from "dy-form";
import { CustomInputRender } from "./components"

const Form = new DyForm(
  { CustomInputRender }, 
  { submit: CustomButton, clear: CustomButton },
  { isRequired: message => value => !!value || message }
)

export default Form;
```

That instance has two methods to create a form: **build** and **create** 

#### Example with the build method

```jsx
import React, { Component } from "react";
import Form from "./Form"

class Example extends Component {
  render() {
    return (
      <Form.build
        name={"example_form"}
        fields={[
          {
            name: "name",
            type: "CustomInputRender",
            props: { placeholder: "Nome" }
          },
          {
            name: "value",
            type: "CustomInputRender",
            props: { placeholder: "Valor" },
            validate: [
              { name: "onlyNumber", message: "Esse campo só pode ter números" }
            ]
          }
        ]}
        workflows={[
          {
            name: "times",
            type: "CustomInputRender",
            props: {
              placeholder: "Em quantas vezes?"
            },
            validate: [
              { name: "onlyNumber", message: "Esse campo só pode ter números" }
            ]
          }
        ]}
        onSubmit={form => console.log("SUBMIT FORM", form)}
      />
    );
  }
}
```

#### Example with create method

```javascript
const Example = Form.create("Example")
  .fields(
    {
      name: "name",
      type: "CustomInputRender",
      props: { placeholder: "Nome" }
    },
    {
      name: "value",
      type: "CustomInputRender",
      props: { placeholder: "Valor" },
      validate: [
        { name: "onlyNumber", message: "Esse campo só pode ter números" }
      ]
    }
  )
  .workflow({
    name: "type",
    values: ["P"],
    fields: [
      {
        name: "times",
        type: "CustomInputRender",
        props: {
          placeholder: "Em quantas vezes?"
        },
        validate: [
          { name: "onlyNumber", message: "Esse campo só pode ter números" }
        ]
      }
    ]
  })
  .setSubmitButtonProps({ label: "Add novo gasto" });
```

```javascript
// Render
<Example.build onSubmit={form => console.log("SUBMIT FORM", FORM)} />
```


### DyForm

The class DyForm receive three params: 
  * First is an object with the components
  * Second is an object with the buttons
  * Third is an object with the validators

```javascript
  new DyForm(
    { CustomInputRender }, 
    { submit: CustomButton, clear: CustomButton },
    { isRequired: message => value => !!value || message }
  )
```

Example of component

```jsx
export const CustomInputRender = ({ input, meta: { error }, placeholder }) => (
  <div>
    <label>{placeholder}</label>
    <input {...input} />
    {error && <strong>{error}</strong>}
  </div>
);

export const CustomButton = ({ label, isSubmit = true, pristine, submitting }) => (
    <Button disabled={pristine || submitting} type={isSubmit ? "submit" : "Button"}>
      {label}
    </Button>
  )
}
```

### Field

Field is a map with some properties that will be used to create an instance of a component.

Property | Required | Type | Example | Note
--- | --- | --- | --- | ---
name | true | string | |
type | true | string | | The type property is who will define which component will be used as template
validate | false | Array | ``` [{ name: "required", message: "required" }] ``` | validator should be an object or function
group | false | Array | | Group is an array of fields with an optional property key and when that property has a value the fields values will be storage as key value

## Methods

#### <a id='fields'></a>[`fields(...fieldsList)`](#fields)

Recives a list of fields
##### Arguments

_(List)_: List of field map

##### Returns

_(Form)_: Form instance

#### <a id='workflows'></a>[`workflows(...workflowList)`](#workflows)

Receives a list of workflow

##### Returns

_(Form)_: Form instance

#### <a id='build'></a>[`build(props)`](#build)

```jsx
  
  render() {
    return (
      <h3>My Form</h3>
      <Example.build />
    ) 
  }

```

##### Arguments

_(Object)_: Object with props like initialValues and onSubmit function

##### Returns

_(React Component)_: Component form with redux-form

#### <a id='onSubmit'></a>[`onSubmit(submitFunction)`](#onSubmit)

Set submit function

##### Arguments

_(Function)_: Function called when form submit

##### Returns

_(Form)_: Form instance

#### <a id='clearButton'></a>[`clearButton(buttonComponent?)`](#clearButton)

##### Arguments

_(Function)_: That function should return a react component

##### Returns

_(Form)_: Form instance

#### <a id='setInitialValues'></a>[`setInitialValues(intialvalues)`](#setInitialValues)

The values with which to initialize your form in componentWillMount().

##### Arguments

_(Object)_: The values should be in the form { field1: 'value1', field2: 'value2' }

##### Returns

_(Form)_: Form instance

#### <a id='setSubmitButtonProps'></a>[`setSubmitButtonProps(props)`](#setSubmitButtonProps)

This method allow to pass props to submit button

##### Arguments

_(Object)_: This object will be passed as props to submit button.

##### Returns

_(Form)_: Form instance

#### <a id='persist'></a>[`persist(flag)`](#persist)

Whether or not to automatically destroy your form's state in the Redux store when your component is unmounted. Defaults to false.

##### Arguments

_(boolean)_ [optional]

##### Returns

_(Form)_: Form instance

#### <a id='reinitialize'></a>[`reinitialize(flag)`](#reinitialize)

When set to true, the form will reinitialize every time the initialValues prop changes. Defaults to false. If the keepDirtyOnReinitialize option is also set, the form will retain the value of dirty fields when reinitializing.

##### Arguments

_(boolean)_[optional]: that value enable or disable the reinitialize 

##### Returns

_(Form)_: Form instance

#### <a id='getFields'></a>[`getFields`](#getFields)

Returns a list of fields map

##### Returns

_(Array)_: Return the current list of fields


## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/7875365?v=4" width="100px;"/><br /><sub><b>Lucas de Castro</b></sub>](https://github.com/LucasdeCastro)<br />[💻](https://github.com/LucasdeCastro/dyform/commits?author=LucasdeCastro "Code") [📖](https://github.com/LucasdeCastro/dyform/commits?author=LucasdeCastro "Documentation") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

MIT © [LucasdeCastro](https://github.com/LucasdeCastro)
