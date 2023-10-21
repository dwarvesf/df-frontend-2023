import { useState } from 'react'
import useSwr, { Key, SWRConfiguration } from 'swr'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import client from '../api'
import { GetmeResponse } from '../type/auth'

const fetchUserData = (
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<GetmeResponse>> => {
  return client.get(`/me`, options)
}
const generateSWRKey = () => [`/me`] as const

export const GetUserName = (options?: {
  swr?: SWRConfiguration<Awaited<ReturnType<typeof fetchUserData>>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  axios?: AxiosRequestConfig
}) => {
  const { swr: swrOptions, axios: axiosOptions } = options || {}

  const swrFetch = () => fetchUserData(axiosOptions)
  const swrKey = generateSWRKey()
  const { data, error, isValidating } = useSwr<
    Awaited<ReturnType<typeof swrFetch>>,
    Error
  >(swrKey, swrFetch, swrOptions)

  return {
    data,
    error,
    isLoading: isValidating,
  }
}
const initialState = {
  name: '',
}

export const useUserState = () => {
  const [user, setUser] = useState(initialState)

  const updateUser = (newUser: { name: string }) => {
    setUser({ ...user, ...newUser })
  }

  return { user, updateUser }
}
