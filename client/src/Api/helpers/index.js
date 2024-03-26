export const getQueryParamString = (obj = null) => {
  let queryString = "";
  
  if (!obj) return queryString;

  Object.entries(obj).forEach(([key, value], index, arr) => {
    if (!value.length) return;
    queryString = queryString + `${key}=${value}${index !== arr.length - 1 ? "&" : ""}`;
  });

  return queryString.length ? "?" + queryString : queryString;
}