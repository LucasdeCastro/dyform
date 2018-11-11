import React from "react";
import fieldsReducer from "./FieldReducer";

class FormComponent extends React.Component {
  render() {
    const {
      reset,
      values,
      fields,
      buttons,
      formName,
      onSubmit,
      handleSubmit,
      showClearButton
    } = this.props;

    const { result: filedsResult } = fields.reduce(fieldsReducer, {
      formName,
      values,
      result: []
    });

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        {filedsResult}
        {showClearButton && buttons.clear && buttons.clear(reset)}
        {buttons && buttons.submit && buttons.submit()}
      </form>
    );
  }
}

export default FormComponent;
