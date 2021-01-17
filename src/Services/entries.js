import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/entries' 
const baseUrl = '/api/entries' // since we are a running a build verson of the front-end in the back-end, they both function in the same address, we can define the url as relative
// NOTE: since we are using a relative adress, if we are running the front-end and back-end separately (during testing of front end), 
// we need to define a proxy in package.json. In this way the front-end will redirect all of the below requests to the adress defined in the proxy.
// To enable the use of the proxy, add the line ["proxy": "http://localhost:3001"] to package.json (inside the primary brackets)


const getAll = () => {
  const request = axios.get(baseUrl)
  
  return request.then(response => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)

  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)

  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)

  return request.then(response => response.data)
}

export default { getAll, create, update, remove }