import React from "react";
import DyForm from "./DyForm";
import ReactDOM from "react-dom";
import logger from "redux-logger";
import { Provider } from "react-redux";
import { reducer as formReducer } from "redux-form";
import { createStore, combineReducers, applyMiddleware } from "redux";

// CREATE STORE
const rootReducer = combineReducers({
  form: formReducer
});
const store = createStore(rootReducer, applyMiddleware(logger));

// TEMPLATE COMPONENTS
const renderInput = ({ input, meta, ...field }) => (
  <div style={{ margin: "10px 0px" }}>
    <strong>{field.placeholder}</strong>
    <br />
    <input
      style={{
        padding: "6px 12px",
        border: "1px solid #CCC",
        borderRadius: "3px"
      }}
      {...input}
      {...field}
      type={"text"}
    />
    <div>
      {meta.touched &&
        meta.error && <span className="error">{meta.error}</span>}
    </div>
  </div>
);

const radiobutton = ({ input, label, meta, checkboxs, ...field }) => (
  <div style={{ margin: "10px 0px" }}>
    <div>
      <label>{label}</label>
      <input {...input} {...field} type={"radio"} />
    </div>
  </div>
);

const checkbox = ({ input, label, meta, checkboxs, ...field }) => (
  <div style={{ margin: "10px 0px" }}>
    <div>
      <label>{label}</label>
      <input {...input} {...field} type={"checkbox"} />
    </div>
  </div>
);

const container = props => (
  <div>
    <strong>{props.placeholder}</strong>
    {props.fields}
  </div>
);

// FORM
const FormTemplate = new DyForm(
  { input: renderInput, radio: radiobutton, checkbox, container },
  { submit: () => <button type={"submit"}>Save</button> },
  {
    passwordEqual: messages => (_, props) => {
      const form = typeof props.password === "object" ? props.password : props;

      if (!form.password) return messages.emptyPassword;
      if (!form.confirm) return messages.emptyCofirm;
      if (form.confirm !== form.password) return messages.passwordNotEqual;
      return true;
    }
  }
);

const Password = FormTemplate.create("password")
  .fields(
    {
      name: "password",
      type: "input",
      placeholder: "Senha"
    },
    {
      name: "confirm",
      type: "input",
      placeholder: "Confirma senha",
      validate: [
        {
          name: "passwordEqual",
          message: {
            emptyPassword: "O campo senha não pode ser vazio",
            emptyCofirm: "A confirmacão da senha não pode ser vazio",
            passwordNotEqual: "As senhas não conferem"
          }
        }
      ]
    }
  )
  .onSubmit(form => console.log("ON SUBMIT PASSWORD", form));

const Profile = FormTemplate.create("profile")
  .fields(
    {
      name: "birthday",
      type: "input",
      validate: [
        { name: "required", message: "A data de nascimento é obrigatoria" }
      ],
      props: {
        placeholder: "Data de nascimento"
      }
    },
    {
      name: "email",
      type: "input",
      props: {
        placeholder: "E-mail"
      },
      validate: [{ name: "required", message: "O E-mail é obrigatoria" }]
    },
    {
      name: "gender",
      type: "container",
      group: [
        { type: "radio", label: "Masculino", value: "M" },
        { type: "radio", label: "Feminino", value: "F" }
      ],
      props: {
        placeholder: "Genero"
      },
      validate: [{ name: "required", message: "Genero é obrigatoria" }]
    },
    {
      name: "like",
      type: "container",
      group: [
        {
          key: "doritos",
          type: "checkbox",
          label: "doritos",
          value: "doritos"
        },
        {
          key: "ruffles",
          type: "checkbox",
          label: "ruffles",
          value: "ruffles"
        },
        {
          key: "pringles",
          type: "checkbox",
          label: "pringles",
          value: "pringles"
        }
      ],
      props: {
        placeholder: "Gosto"
      },
      validate: [{ name: "required", message: "O gosto é obrigatoria" }]
    }
  )
  .clearButton(click => <button onClick={click}>clear</button>)
  .workFlow({
    name: "gender",
    values: ["M"],
    fields: [
      {
        name: "password",
        type: "container",
        group: Password.getFields().map(field => ({
          ...field,
          key: field.name
        }))
      }
    ]
  })
  .setInitialValues({ email: "lucascastro102@gmail.com", gender: "M" })
  .onSubmit(form => console.log("ON SUBMIT FORM TOWN", form));

const App = () => (
  <Provider store={store}>
    <div>
      <h3>My FORM</h3>
      <Profile.build />
      <h3>Password</h3>
      <Password.build />

      <FormTemplate.component
        name={"form"}
        fields={[
          {
            name: "email",
            type: "input",
            props: {
              placeholder: "E-mail"
            },
            validate: [{ name: "required", message: "O E-mail é obrigatoria" }]
          }
        ]}
        onSubmit={e => console.log("E", e)}
      />
    </div>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
