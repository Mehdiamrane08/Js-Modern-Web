// Helper function to call our API

export default async function callAPI(endpoint, method = "get", token, data) {
  let headers = new Headers();
  let options = {};
  options.method = method;

  if (token) {    
    headers.append("Authorization", token);   
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
  try {
    const response = await fetch(endpoint, options);

    if (!response.ok) {      
      const error = await response.text(); // get the textual error message
      throw new Error(error);
    }
    return await response.json();
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
}


