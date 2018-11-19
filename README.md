# dy-form

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

```jsx
import React, { Component } from 'react'

import DyForm from 'dy-form'

class Example extends Component {
  render () {
    return (
      <DyForm.build
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
              options: [{ value: "Fixa", key: "F" }, { value: "Prazo", key: "P" }]
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
    )
  }
}
```

## With chaining

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

<!-- ALL-CONTRIBUTORS-LIST: START - Do not remove or modify this section -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

MIT © [LucasdeCastro](https://github.com/LucasdeCastro)
