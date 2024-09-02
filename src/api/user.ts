import request from '@/utils/request'

export interface LoginRequestData {
  username: string
  password: string
}

export interface LoginResponseData {
  access_token: string
}

export function loginApi(data: LoginRequestData) {
  return request<LoginResponseData>({
    url: '/tokens',
    method: 'post',
    data
  })
}

export interface UserInfoResponseData {
  id: number
  name: string
}

export function getUserInfoApi() {
  return request<UserInfoResponseData>({
    url: '/manager',
    method: 'get'
  })
}

export interface UserItemResponseData {
  id: number
  name: string
}

export function getUserListApi(params?: Record<string, any>) {
  return request<Pagination<UserItemResponseData>>({
    url: '/search/managers',
    method: 'get',
    params
  })
}
