//  @ts-nocheck
import axios from "axios";
import jwtDecode from "jwt-decode";

// creates and axios instance with base url
const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
});

// Add a request interceptor which adds the configuration in all the requests
axiosInstance.interceptors.request.use(
  async (config?: any) => {
    // sets the content type to json
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    console.error("Error while setting up axios request interceptor,", error);
  }
);

// Add a response interceptor which checks for error code for all the requests
axiosInstance.interceptors.response.use(undefined, async (err) => {
  // stores the original request (later used to retry the request)
  let originalRequest = err.config;

  // retries if err is 401 or 403 and if request is already not tried once
  if (
    (err?.response?.status === 403 || err?.response?.status === 401) &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true;

    // const userDetails = await getUserDetails();

    // gets new access token from refresh token and retries the request.
    const access_token = localStorage.getItem("accessToken");
    const refresh_token = localStorage.getItem("refreshToken");

    const isAccessTokenValid = true;
    if (isAccessTokenValid) {
      originalRequest.headers["Authorization"] = "Bearer " + access_token;
      return axiosInstance(originalRequest);
    } else if (refresh_token) {
      const access_token = await getNewAccessToken(userDetails.refreshToken);
      originalRequest.headers["Authorization"] = "Bearer " + access_token;
      return axiosInstance(originalRequest);
    }
  } else {
    // checkErrorCode(err);
    return Promise.reject(err);
  }
});
interface RequestParams {
  url: string;
  method?: string;
  isAuthenticated?: boolean;
  data?: any;
  header?: object;
}

const request = async ({
  url,
  method = "GET",
  isAuthenticated = false,
  data = undefined,
  header = {},
}: RequestParams) => {
  return new Promise((resolve, reject) => {
    //  sets the options which is passed to axios to make the request
    let options: any = {
      method,
      url,
    };

    // if the method is either POST, PUT or DELETE and data is present then adds data property to options
    if (
      (method === "POST" ||
        method === "PUT" ||
        method === "PATCH" ||
        method === "DELETE") &&
      data
    ) {
      options.data = data;
    }

    // if request needs to be authenticated the Authorization is added in headers.
    // if access token is not present then throws error for the same
    if (isAuthenticated) {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        // return new Error("Access token is not available.");
        alert("Please Login!! can't find accessToken");
        window.location.pathname = "/login";
      }
      // adds Authorization to headers in options
      options.headers = {
        Authorization: `Bearer ${accessToken}`,
        ...header,
      };

      // returns a promise with axios instance
      axiosInstance(options).then(resolve).catch(reject);
      // });
    } else {
      // returns a promise with axios instance
      axiosInstance(options).then(resolve).catch(reject);
    }
  }).catch((err) => {
    console.error(`Error while making ${method} request,`, {
      url,
      isAuthenticated,
      err,
    });
    return Promise.reject(err);
  });
};

export const getCurrentUnixTimestamp = () => Math.floor(Date.now() / 1000);

export const getExpirationTimeStamp = (token: string) => {
  const decodedToken = jwtDecode(token);

  const { exp } = decodedToken;
  return exp;
};

// calls the [request] function with [url]
export const getRequest = (url: string, header: object = {}) =>
  request({ url, header });

// calls the [request] function with [url] and [isAuthenticated = true]
export const getAuthenticatedRequest = (url: string, header: object = {}) =>
  request({ url, isAuthenticated: true, header });

// calls the [request] function with [url], [data], [method = 'POST'] and [isAuthenticated = false]
export const postRequest = (url: string, data: any, header: object = {}) =>
  request({ url, method: "POST", isAuthenticated: false, data, header });

// calls the [request] function with [url], [data], [method = 'POST'] and [isAuthenticated = true]
export const postAuthenticatedRequest = (
  url: string,
  data: any,
  header: object = {}
) => request({ url, method: "POST", isAuthenticated: true, data, header });

// calls the [request] function with [url], [data], [method = 'PUT'] and [isAuthenticated = false]
export const putRequest = (url: string, data: any, header: object = {}) =>
  request({ url, method: "PUT", isAuthenticated: false, data, header });

// calls the [request] function with [url], [data], [method = 'PUT'] and [isAuthenticated = true]
export const putAuthenticatedRequest = (
  url: string,
  data: any,
  header: object = {}
) => request({ url, method: "PUT", isAuthenticated: true, data, header });

// calls the [request] function with [url], [data], [method = 'PATCH'] and [isAuthenticated = false]
export const patchRequest = (url: string, data: any, header: object = {}) =>
  request({
    url,
    method: "PATCH",
    isAuthenticated: false,
    data,
    header,
  });

// calls the [request] function with [url], [data], [method = 'PATCH'] and [isAuthenticated = true]
export const patchAuthenticatedRequest = (
  url: string,
  data: any,
  header: object = {}
) => request({ url, method: "PATCH", isAuthenticated: true, data, header });

// calls the [request] function with [url], [data], [method = 'DELETE'] and [isAuthenticated = false]
export const deleteRequest = (url: string, data = null, header: object = {}) =>
  request({ url, method: "DELETE", isAuthenticated: false, data, header });

// calls the [request] function with [url], [data], [method = 'DELETE'] and [isAuthenticated = true]
export const deleteAuthenticatedRequest = (
  url: string,
  data = null,
  header: object = {}
) => request({ url, method: "DELETE", isAuthenticated: true, data, header });
