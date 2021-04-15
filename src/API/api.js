import * as axios from "axios";

const instance = axios.create({
  baseURL: 'https://api.nytimes.com/svc/mostpopular/v2/',
})

// public app api
const api = 'Tvm22n5kU6IGckaqCMhDBJXRuj2nLIIt'

export const getTopViewedArcticles = () => {
  return instance.get(`viewed/1.json?api-key=${api}`)
    .then(response => {
      return response
    })
}

export const getTopSharedArticles = () => {
  return instance.get(`shared/1/facebook.json?api-key=${api}`)
    .then(response => {
      return response
    })
}