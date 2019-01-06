import queryString from "query-string"


export const parseQuery = (searchParam)=> queryString.parse(searchParam)
