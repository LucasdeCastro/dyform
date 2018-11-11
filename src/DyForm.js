import Form from "./Form";
import defaultValidators from "./Validators";

class DyForm {
  constructor(baseComponents, baseButtons, validators = {}) {
    this.buttons = baseButtons;
    this.components = baseComponents;
    this.validators = { ...validators, ...defaultValidators };
  }

  create(name, form) {
    if (form) {
      const instance = this.create(name);
      instance._names = form._names.concat();
      instance._fields = form._fields.concat();
      instance._clearButton = form._clearButton;
      return instance;
    }

    return new Form(name, this.components, this.buttons, this.validators);
  }
}

export default DyForm;
