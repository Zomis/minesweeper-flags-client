// create from client URL query params
// internal data structure
// convert to server request body
// convert to client URL query params

function copyArray(value) {
  return value.slice();
}

function deepCopy(value) {
  let copy = Object.assign({}, value);
  copy.players = copyArray(copy.players);
  copy.tags = copyArray(copy.tags);
  copy.withoutTags = copyArray(copy.withoutTags);
  return copy;
}

function nullIfEmpty(value) {
  if (typeof value === "undefined") {
    return null;
  }
  if (value === "") {
    return null;
  }
  if (Array.isArray(value) && value.length === 1 && value[0] === "") {
    return null;
  }
  return value;
}

function listify(value) {
  let temp = nullIfEmpty(value);
  if (temp === null) {
    return [];
  }
  if (!Array.isArray(value)) {
    return [value];
  }
  return value;
  //  return value.split(",");
}

export default {
  fromUrlParams(params) {
    return {
      resultType: nullIfEmpty(params.resultType),

      players: listify(params.players),
      plugin: nullIfEmpty(params.plugin),
      tags: listify(params.tags),
      withoutTags: listify(params.withoutTags),
      before: nullIfEmpty(params.before),
      after: nullIfEmpty(params.after),
      page: nullIfEmpty(params.page),
      pageSize: nullIfEmpty(params.pageSize)
    };
  },
  toServerRequestBody(query) {
    return {
      resultType: query.resultType,

      players: nullIfEmpty(query.players),
      plugin: query.plugin,
      tags: nullIfEmpty(query.tags),
      withoutTags: nullIfEmpty(query.withoutTags),
      before: query.before,
      after: query.after,
      page: query.page,
      pageSize: query.pageSize
    };
  },
  toRouterLink(query) {
    let clonedQuery = deepCopy(query);
    console.log(clonedQuery);
    Object.keys(clonedQuery).forEach(key => {
      if (clonedQuery[key] === null) {
        delete clonedQuery[key];
      }
    });
    let resultType = clonedQuery.resultType;
    delete clonedQuery.resultType;
    return {
      path: "/stats/" + resultType,
      query: clonedQuery
    };
  }
};
