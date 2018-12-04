import React, { createFactory } from 'react'
import { Field } from 'redux-form'
import { workflowFinder, getFieldName } from './utils'

export const FIELD_TYPE = {
  WORKFLOW: 'workflow',
  GROUP: 'group',
  DEFUALT: 'default'
}

const fieldsReducer = (state, props) => {
  const { formName, values = {}, result } = state
  const { fieldType, group, parentName, ...item } = props

  switch (fieldType) {
    case FIELD_TYPE.GROUP:
      return {
        ...state,
        result: result.concat(
          createFactory(item.component)({
            ...item,
            ...item.props,
            key: `${formName}-container-group-${item.name}`,
            fields: group.map(
              ({ name, ...field }) =>
                fieldsReducer(
                  { ...state, result: [] },
                  { ...field, parentName: item.name }
                ).result
            )
          })
        )
      }
    case FIELD_TYPE.WORKFLOW:
      if (item.values.find(workflowFinder(values, item))) {
        return {
          ...state,
          result: result.concat(
            item.fields.map(
              field => fieldsReducer({ ...state, result: [] }, field).result
            )
          )
        }
      } else {
        return state
      }
    case FIELD_TYPE.DEFUALT:
    default:
      return {
        ...state,
        result: result.concat(
          <Field
            {...item}
            key={`${formName}-field-${item.name}`}
            name={getFieldName(props)}
          />
        )
      }
  }
}

export default fieldsReducer
