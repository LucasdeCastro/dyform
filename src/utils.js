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

export const workflowFinder = (value, field) => item => {
  if (typeof item === "function") return item(value, field);
  return item === value[field.key];
};

export const mapFields = (baseFields, baseValidators) => field => {
  const fieldType = field.group ? FIELD_TYPE.GROUP : FIELD_TYPE.DEFUALT;

  field.validate = (field.validate || []).map(mapValidators(baseValidators));

  if (field.group) {
    field.group = field.group.map(group => {
      if (!baseFields[group.type]) {
        throw new Error(
          `The field type(${group.type}) inside the group not exist`
        );
      }

      return {
        ...group,
        component: baseFields[group.type]
      };
    });
  }

  if (!field.component) {
    if (!baseFields[field.type])
      throw new Error(`The field type(${field.type}) not exist`);
    return {
      ...field,
      fieldType,
      component: baseFields[field.type]
    };
  }

  return { ...field, fieldType };
};

export const getFieldName = ({ parentName, ...field }) => {
  if (parentName) return getFieldName({ name: parentName, ...field });
  return field.key ? `${field.name}[${field.key}]` : field.name;
};

export const reducerWorkflows = (
  fields,
  baseComponents,
  baseValidators,
  saveFieldName,
  [workflow, ...workflows]
) => {
  if (!workflow) return fields;
  const { name, values, fields: workflowFields } = workflow;

  const newFields = fields.reduce((state, field) => {
    const fieldNameMatch =
      field.fieldType === FIELD_TYPE.WORKFLOW
        ? field.key === name
        : field.name === name;

    if (field.fieldType === FIELD_TYPE.WORKFLOW) saveFieldName(field.key);
    else saveFieldName(field.name);

    if (fieldNameMatch) {
      return state.concat(field, {
        fieldType: FIELD_TYPE.WORKFLOW,
        key: name,
        values,
        fields: reducerWorkflows(
          workflowFields.map(mapFields(baseComponents, baseValidators)),
          baseComponents,
          baseValidators,
          saveFieldName,
          workflows
        )
      });
    }

    return state.concat(field);
  }, []);

  return reducerWorkflows(
    newFields,
    baseComponents,
    baseValidators,
    saveFieldName,
    workflows
  );
};
