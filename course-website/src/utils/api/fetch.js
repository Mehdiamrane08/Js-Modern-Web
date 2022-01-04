// Helper function to call our API
// using authorization bearer token scheme
import { acquireTokenSilent } from "../auths/authPopup";
import { loginRequest } from "../auths/authConfig";

export default async function callAPI(endpoint, method = "get", token, data) {
  let headers = new Headers();
  let options = {};
  options.method = method;

  if (token) {
    const bearer = `Bearer ${token}`;
    headers.append("Authorization", bearer);   
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  if (
    method.toLowerCase() === "post" ||
    method.toLowerCase() === "patch" ||
    method.toLowerCase() === "put"
  )
    headers.append("Content-Type", "application/json");
  options.headers = headers;
  //console.log("request made to API at: " + new Date().toString(),"Endpoint:", endpoint, "Options:", options);
  try {
    const response = await fetch(endpoint, options);

    if (!response.ok) {
      let fullErrorMessage =
        " Error code : " +
        response.status +
        " : " +
        response.statusText +
        "/nMessage : ";
      const textResponse = await response.text();
      fullErrorMessage += textResponse;
      console.error("fetch() error", fullErrorMessage);
      // deal with token expiration
      if (fullErrorMessage.search("expired") > -1) {
        console.log("issue");
        return await onTokenExpiration();
      }
      throw new Error(fullErrorMessage);
    }
    return await response.json();
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
}

/*
export default  async function callAPI(endpoint, method = "get", token, data) {
  let headers = new Headers();
  let options = {};
  options.method = method;

  if (token) {
    const bearer = `Bearer ${token}`;
    headers.append("Authorization", bearer);
    //console.log("token:",token);
  }

  if (data) {
    options.body = data;
  }

  if (method.toLowerCase() === "post")
    headers.append("Content-Type", "application/json");

  options.headers = headers;

  //console.log("request made to API at: " + new Date().toString(),"Endpoint:", endpoint, "Options:", options);

  fetch(endpoint, options)
    .then((response) => {
      if (!response.ok) {
        let fullErrorMessage =
          " Error code : " +
          response.status +
          " : " +
          response.statusText +
          "/nMessage : ";
        return response.text().then((errorMessage) => {
          fullErrorMessage += errorMessage;
          console.error("fetch()", fullErrorMessage);
          // deal with token expiration
          if(fullErrorMessage.search("expired")>-1){
            console.log("issue");
            onTokenExpiration();
          }
          throw new Error(fullErrorMessage);
        });
      }
      return response.json();
    })
    .then((jsonData) => {console.log("data", jsonData); return jsonData})
    .catch((error) => error);
}*/

const onTokenExpiration = () => {
  return acquireTokenSilent();
};
