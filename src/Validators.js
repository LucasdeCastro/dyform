const required = message => value =>
  value || typeof value === "number" ? undefined : message;

export default {
  required
};
