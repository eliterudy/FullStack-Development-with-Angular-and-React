import axios from "axios";

export const baseURL = "http://localhost:3002/";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const Axios = axios.create({
  baseURL: baseURL,
  timeout: 20000,
  headers: headers,
});

const apiList = {
  getDishes: (params) => {
    return Axios({
      url: `/dishes`,
      method: "get",
      params,
    });
  },
  getPromotions: (params) => {
    return Axios({
      url: `/promotions`,
      method: "get",
      params,
    });
  },
  getLeaders: (params) => {
    return Axios({
      url: `/leaders`,
      method: "get",
      params,
    });
  },
  getComments: (params) => {
    return Axios({
      url: `/comments`,
      method: "get",
      params,
    });
  },
  postNewComment: (data, id) => {
    return Axios({
      url: `/comments`,
      method: "post",
      data,
    });
  },

  postFeedback: (data) => {
    return Axios({
      url: `/feedback`,
      method: "post",
      data,
    });
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Axios,
  ...apiList,
};
