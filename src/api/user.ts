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
  name: string
}

export function getUserInfoApi() {
  return request<UserInfoResponseData>({
    url: '/manager',
    method: 'get'
  })
}
