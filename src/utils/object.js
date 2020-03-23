export function test(obj) {
  return obj;
}

export function removeUndefinedFields(obj) {
  Object.keys(obj).forEach(key =>
    obj[key] === undefined ? delete obj[key] : {}
  );

  return obj;
}
