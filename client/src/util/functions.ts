import axios from "axios";

const rootUrl = "http://localhost:2021";

export function fetchWord(
  level: string,
  min?: number,
  count?: number
): Promise<any> {
  let queryString = "";
  if (min) queryString = `?min=${min}`;
  if (count) {
    queryString
      ? (queryString = queryString + `&count=${count}`)
      : (queryString = `?count=${count}`);
  }

  return axios({
    method: "get",
    url: `${rootUrl}/api/${level}${queryString}`,
  });
}
