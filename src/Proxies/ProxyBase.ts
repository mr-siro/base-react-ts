import axios from 'axios'

import registerCancelTokenAxios from './RegisterCancelTokenAxios'
import { config } from '@src/Config'
import { store } from '@src/App/Store'
import { logout } from '@src/App/Features/Auth'

const privateKeys = ['accessToken']
const formatObjectWithEmptyValue = (
  params: Record<string, any> = {},
  isRemovePrivateKeys?: boolean,
) => {
  if (typeof FormData !== 'undefined' && params instanceof FormData) {
    params.delete('accessToken')
    return params
  } else {
    return Object.keys(params).reduce(
      (obj, key) =>
        (isRemovePrivateKeys ? !privateKeys.includes(key) : true) &&
        ((!Array.isArray(params[key]) &&
          params[key] !== null &&
          params[key] !== undefined &&
          params[key] !== '') ||
          (Array.isArray(params[key]) && params[key].length > 0))
          ? { ...obj, [key]: params[key] }
          : obj,
      {},
    )
  }
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('unauthorized!')
      store.dispatch(logout());
    }

    return Promise.reject(error)
  },
)

axios.interceptors.request.use(async function (config) {
  return config
})

export default class ProxyBase {
  baseServiceUrl = ''

  constructor() {
    this.baseServiceUrl = config.baseServiceUrl;
  }

  async get(
    path: string,
    data: Record<string, any>,
    type?: string,
    disableCancelToken = false,
    appendCancelToken = '',
    replaceCancelToken = '',
  ) {
    const url = this.baseServiceUrl + path
    const cancelTokenName = formatCancelTokenName(
      url,
      appendCancelToken,
      replaceCancelToken,
      disableCancelToken,
    )
    const params = formatObjectWithEmptyValue(data, true)

    let source: any = null
    if (!disableCancelToken) {
      registerCancelTokenAxios.delete(cancelTokenName)
      source = registerCancelTokenAxios.register(cancelTokenName)
    }

    const config: Record<string, any> = {
      params,
      timeout: 35000,
    }

    if (source && !disableCancelToken) {
      config.cancelToken = source.token
    }

    if (type === 'download') {
      config.responseType = 'blob'
    }

    await configAccessToken(data)

    return axios.get(url, config).then((data) => {
      if (!disableCancelToken) {
        registerCancelTokenAxios.delete(cancelTokenName)
      }
      return data
    })
  }

  async post(
    path: string,
    data: Record<string, any>,
    type?: string,
    config: Record<string, any> = {},
    disableCancelToken: boolean = false,
    appendCancelToken: string = '',
    replaceCancelToken: string = '',
  ) {
    const url = this.baseServiceUrl + path
    const cancelTokenName = formatCancelTokenName(
      url,
      appendCancelToken,
      replaceCancelToken,
      disableCancelToken,
    )
    let source: any = null

    if (!disableCancelToken) {
      registerCancelTokenAxios.delete(cancelTokenName)
      source = registerCancelTokenAxios.register(cancelTokenName)
    }

    if (source && !disableCancelToken) {
      config.cancelToken = source.token
    }

    if (type === 'download') {
      config.responseType = 'blob'
    }

    config.headers = config.headers || { 'content-type': 'application/json' }

    await configAccessToken(data)

    const params = formatObjectWithEmptyValue(data, true)

    return axios
      .post(`${this.baseServiceUrl}${path}`, params, config)
      .then((data) => {
        if (!disableCancelToken) {
          registerCancelTokenAxios.delete(cancelTokenName)
        }
        return data
      })
  }

  async put(
    path: string,
    data: Record<string, any>,
    config: Record<string, any> = {},
    disableCancelToken: boolean = false,
    appendCancelToken: string = '',
    replaceCancelToken: string = '',
  ) {
    const url = this.baseServiceUrl + path
    const cancelTokenName = formatCancelTokenName(
      url,
      appendCancelToken,
      replaceCancelToken,
      disableCancelToken,
    )
    let source: any = null

    if (!disableCancelToken) {
      registerCancelTokenAxios.delete(cancelTokenName)
      source = registerCancelTokenAxios.register(cancelTokenName)
    }

    if (source && !disableCancelToken) {
      config.cancelToken = source.token
    }

    await configAccessToken()

    const params = formatObjectWithEmptyValue(data, true)

    return axios
      .put(`${this.baseServiceUrl}${path}`, params, config)
      .then((data) => {
        if (!disableCancelToken) {
          registerCancelTokenAxios.delete(cancelTokenName)
        }
        return data
      })
  }

  async delete(
    path: string,
    params: Record<string, any>,
    config: Record<string, any> = {},
  ) {
    config.data = { ...params }

    await configAccessToken()

    return axios.delete(`${this.baseServiceUrl}${path}`, config)
  }
}

const formatCancelTokenName = (
  url: string,
  appendCancelToken: string,
  replaceCancelToken: string,
  disableCancelToken: boolean,
) => {
  if (disableCancelToken) {
    return url
  }

  if (replaceCancelToken) {
    return replaceCancelToken
  }

  return url + appendCancelToken
}

const configAccessToken = async (data?: Record<string, any>) => {
  try {
    const { auth } = store.getState()

    const token =
      data?.accessToken ||
      (data instanceof FormData ? data?.get('accessToken') : '') ||
     auth?.accessToken

    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    }
  } catch (error) {
    console.log(error)
  }
}
