# dy-form

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

>

[![NPM](https://img.shields.io/npm/v/dy-form.svg)](https://www.npmjs.com/package/dy-form) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

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
  { input: CustomInputRender, checkbox: CustomCheckboxRender }, 
  { submit: button, clear: button },
  { isRequired: message => value => !!value || message }
)

export default Form;
```

That instance have two method to create a form: build and create 

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
            type: "input",
            props: { placeholder: "Nome" }
          },
          {
            name: "value",
            type: "input",
            props: { placeholder: "Valor" },
            validate: [
              { name: "onlyNumber", message: "Esse campo só pode ter números" }
            ]
          },
          {
            name: "type",
            type: "select",
            props: {
              placeholder: "Tipo",
              options: [
                { value: "Fixa", key: "F" },
                { value: "Prazo", key: "P" }
              ]
            }
          }
        ]}
        workflows={[
          {
            name: "times",
            type: "input",
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
      type: "input",
      props: { placeholder: "Nome" }
    },
    {
      name: "value",
      type: "input",
      props: { placeholder: "Valor" },
      validate: [
        { name: "onlyNumber", message: "Esse campo só pode ter números" }
      ]
    },
    {
      name: "type",
      type: "select",
      props: {
        placeholder: "Tipo",
        options: [{ value: "Fixa", key: "F" }, { value: "Prazo", key: "P" }]
      }
    }
  )
  .workflow({
    name: "type",
    values: ["P"],
    fields: [
      {
        name: "times",
        type: "input",
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

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/7875365?v=4" width="100px;"/><br /><sub><b>Lucas de Castro</b></sub>](https://github.com/LucasdeCastro)<br />[💻](https://github.com/LucasdeCastro/dyform/commits?author=LucasdeCastro "Code") [📖](https://github.com/LucasdeCastro/dyform/commits?author=LucasdeCastro "Documentation") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

MIT © [LucasdeCastro](https://github.com/LucasdeCastro)
