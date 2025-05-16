import axios, { AxiosInstance } from 'axios'
import { BASE_URL } from './apisUrls'


// Create an instance for public requests (does not require authentication)
export const publicInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
})

// Create an instance for private requests (requires authentication)
export const privateInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
})

// Add an interceptor to the private instance to automatically include the Authorization header
privateInstance.interceptors.request.use((config:any) => {
  const atoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Njc4NjNhNWM4NWYxZWNkYmMyNjk1NzUiLCJlbWFpbCI6InVwc2tpbGxpbmcubW9uaXRvcnNAZ21haWwuY29tIiwicm9sZSI6Ikluc3RydWN0b3IiLCJpYXQiOjE3NDczODgzODIsImV4cCI6MTc1MDk4ODM4Mn0.MWDxqdvmct1G10Dv2oIGk4PAiDiXHclHw83S65ZrU0U"

  // const token = localStorage.getItem(atoken)
  if (atoken) {
    config.headers.Authorization = `Bearer ${atoken}`
  }
  return config
})
