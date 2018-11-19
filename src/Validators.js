const required = message => (value, _, { pristine, submitting }) => {
  if (!pristine && !submitting) {
    return value || typeof value === 'number' ? undefined : message
  }
  return false
}

export default {
  required
}
