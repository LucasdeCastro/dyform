import { FIELD_TYPE } from "./FieldReducer";

export const compose = (...fns) =>
  fns.reduceRight(
    (prev, next) => (...args) => next(prev(...args)),
    value => value
  );

export const mapValidators = baseValidators => validator => {
  if (typeof validator === "function") return validator;
  if (typeof validator === "object") {
    if (!validator.name) throw new Error("validator must have a prop name");
    if (!validator.message)
      throw new Error("validator must have a prop message");

    if (baseValidators[validator.name])
      return baseValidators[validator.name](validator.message);
    else if (!validator.message)
      throw new Error(`the validator named ${validator.name} not exist`);
  }
  throw new Error("validator should be a function or object");
};

export const workflowFinder = value => item => {
  if (typeof item === "function") return item(value);
  return item === value;
};

export const mapFields = (baseFields, baseValidators) => field => {
  const fieldType = field.group ? FIELD_TYPE.GROUP : FIELD_TYPE.DEFUALT;

  field.validate = (field.validate || []).map(mapValidators(baseValidators));

  if (field.group) {
    field.group = field.group.map(group => ({
      ...group,
      component: baseFields[group.type]
    }));
  }

  if (!field.component) {
    return {
      ...field,
      fieldType,
      component: baseFields[field.type]
    };
  }

  return { ...field, fieldType };
};

export const getFieldName = field => {
  if (field.key && field.parentName) return `${field.parentName}[${field.key}]`;
  return field.key ? `${field.name}[${field.key}]` : field.name;
};
