export default function getQuery(query) {
  if (query) {
    const queryString = query.split("?")[1];
    if (queryString.length > 0) {
      const queries = queryString.split("&");
      const queriesObj = {};
      queries.forEach((query) => {
        const keyValue = query.split("=");

        queriesObj[keyValue[0]] = keyValue[1];
      });

      return queriesObj;
    }
  }

  return {};
}
