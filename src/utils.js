import { FIELD_TYPE } from './FieldReducer'

export const compose = (...fns) =>
  fns.reduceRight(
    (prev, next) => (...args) => next(prev(...args)),
    value => value
  )

export const mapValidators = baseValidators => validator => {
  if (typeof validator === 'function') return validator
  if (typeof validator === 'object') {
    if (!validator.name) throw new Error('validator must have a prop name')
    if (!validator.message) {
      throw new Error('validator must have a prop message')
    }

    if (baseValidators[validator.name]) {
      return baseValidators[validator.name](validator.message)
    }

    throw new Error(`the validator named ${validator.name} not exist`)
  }
  throw new Error('validator should be a function or object')
}

export const workflowFinder = (values, field) => predicate => {
  if (typeof predicate === 'function') {
    return predicate(values, field)
  }
  return predicate === values[field.key]
}

export const mapFields = (baseFields, baseValidators) => field => {
  const fieldType = field.group ? FIELD_TYPE.GROUP : FIELD_TYPE.DEFUALT

  field.validate = (field.validate || []).map(mapValidators(baseValidators))

  if (field.group) {
    field.group = field.group.map(group => {
      if (!baseFields[group.type]) {
        throw new Error(
          `The field type(${group.type}) inside the group not exist`
        )
      }

      return mapFields(baseFields, baseValidators)(group)
    })
  }

  if (!field.component) {
    if (!baseFields[field.type]) {
      throw new Error(`The field type(${field.type}) not exist`)
    }
    return {
      ...field,
      fieldType,
      component: baseFields[field.type]
    }
  }

  return { ...field, fieldType }
}

export const getFieldName = ({ parentName, ...field }) => {
  if (parentName) return getFieldName({ name: parentName, ...field })
  return field.key ? `${field.name}[${field.key}]` : field.name
}

export const reducerWorkflows = (
  fields,
  baseComponents,
  baseValidators,
  [workflow, ...workflows]
) => {
  if (!workflow) return fields
  const { name, values, fields: workflowFields } = workflow

  if (!name) throw new Error('workflow must have a prop name')
  if (!values) throw new Error('workflow must have a prop values')
  if (!fields) throw new Error('workflow must have a prop fields')

  const newFields = fields.reduce((state, field) => {
    const isWorkflow = field.fieldType === FIELD_TYPE.WORKFLOW
    const fieldNameMatch = !isWorkflow && field.name === name

    if (fieldNameMatch) {
      return state.concat(field, {
        fieldType: FIELD_TYPE.WORKFLOW,
        key: name,
        values,
        fields: reducerWorkflows(
          workflowFields.map(mapFields(baseComponents, baseValidators)),
          baseComponents,
          baseValidators,
          workflows
        )
      })
    }

    return state.concat(field)
  }, [])

  return reducerWorkflows(newFields, baseComponents, baseValidators, workflows)
}
