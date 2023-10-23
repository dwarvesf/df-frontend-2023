import axios from 'axios'
import { getCredentials } from '../token/TokenContext'

const client = axios.create({
  baseURL: 'https://develop-api.bookstore.dwarvesf.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

client.interceptors.request.use(
  (request) => {
    request.headers.Authorization = `Bearer ${getCredentials()}`

    console.log('Start Request', request)
    return request
  },
  (error) => {
    console.log('REQUEST ERROR', error)
    return Promise.reject(error)
  },
)

client.interceptors.response.use(
  (response) => {
    console.log('Response', response)
    return response
  },
  (error) => {
    console.log('RESPONSE ERROR', error)
    const message = error.response?.data?.message
    const rejectionError = new Error(message)
    return Promise.reject(rejectionError)
  },
)
export default client
