import axios from "axios";

const rootUrl = "http://localhost:2021";

// API functions
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

export function postRoom(data: any): Promise<any> {
  return axios({
    method: "post",
    url: `${rootUrl}/rooms`,
    data: data,
  });
}

export function fetchRoom(code: string): Promise<any> {
  return axios({
    method: "get",
    url: `${rootUrl}/rooms/${code}`,
  });
}

// Misc functions
export function getRandNumbers(
  // Max exclusive, min inclusive
  max: number,
  min: number = 0,
  count: number = 2
): Array<number> {
  const output = new Array<number>();
  while (output.length < count) {
    let num = Math.floor(Math.random() * (max - min) + min);
    if (output.indexOf(num) === -1) output.push(num);
  }
  return output;
}
