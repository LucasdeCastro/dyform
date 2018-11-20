# dy-form

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

>

[![NPM](https://img.shields.io/npm/v/dy-form.svg)](https://www.npmjs.com/package/dy-form) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

DyForm is an abstraction for dynamically creating forms. redux and redux-form was used to manage the state of the forms.

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
import { CustomInputRender, CustomCheckboxRender } from "./components"

const Form = new DyForm(
  { CustomInputRender }, 
  { submit: button, clear: button },
  { isRequired: message => value => !!value || message }
)

export default Form;
```

That instance has two methods to create a form: build and create 

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
const Expenses = Form.create("expenses")
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
<Expenses.build onSubmit={form => console.log("SUBMIT FORM", FORM)} />
```


### DyForm

The class DyForm receive three params: 
  * First is an object with the components
  * Second is an object with the buttons
  * Third is an object with the validators

```javascript
  new DyForm(
    { CustomInputRender }, 
    { submit: button, clear: button },
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
```

### Field

Field is a map with some properties that will be used to create an instance of a component.

The type property is who will define which component will be used

Field recives as properties a name(riquired), type(riquired), validate

```javascript
{
  name: "name",
  type: "CustomInputRender",
  validate: [
    { name: "onlyNumber", message: "Esse campo só pode ter números" }
  ],
  props: { placeholder: "Nome" }
}
```

Field also has a prop group which is an array of fields

When Field map has a property group the component it will receive as prop a list of fields, if fields inside group property has a key the values will be storage as key value, like a checkboxlist

```javascript
{
  name: "chips",
  type: "container",
  group: [
    { name: "doritos", key: "D", type: "checkbox" },
    { name: "ruffles", key: "R", type: "checkbox" }
  ]
}
```

When the group components don't have a key prop the value will be stored only the last selected value. like a radio button

```javascript
{
  name: "favorite",
  type: "container",
  group: [
    { name: "doritos", type: "checkbox" },
    { name: "ruffles", type: "checkbox" }
  ]
}
```

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/7875365?v=4" width="100px;"/><br /><sub><b>Lucas de Castro</b></sub>](https://github.com/LucasdeCastro)<br />[💻](https://github.com/LucasdeCastro/dyform/commits?author=LucasdeCastro "Code") [📖](https://github.com/LucasdeCastro/dyform/commits?author=LucasdeCastro "Documentation") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

MIT © [LucasdeCastro](https://github.com/LucasdeCastro)
