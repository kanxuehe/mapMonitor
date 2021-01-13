import request from "@/utils/request"

export async function fakeAccountLogin(params) {
  return request("/api/user-service/user/login", {
    method: "POST",
    data: params,
  })
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`)
}

// 登录
export async function login(params) {
  return request("/api/user-service/user/login", {
    method: "POST",
    data: params,
  })
}
