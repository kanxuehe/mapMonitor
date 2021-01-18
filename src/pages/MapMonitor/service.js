/* eslint-disable */
import request from "@/utils/request"
import qs from 'querystring'
export async function getNoticeList(param) {
  return request(`/prod-api/system/notice/list?${qs.stringify(param)}`)
}

export async function getSummary() {
  return request(`/prod-api/system/report/current/summary`)
}

export async function getComapny(param) {
  return request(`/prod-api/system/summary/comapny/current`)
}

export async function getZone(param) {
  return request(`/prod-api/system/summary/zone`)
}

export async function getHistory(param) {
  return request(`/prod-api/system/summary/year/history`)
}


export async function industryList() {
  return request("/api/hate-service/hate/screen/industry/list")
}

export async function machineList(obj) {
  return request(
    `/api/hate-service/hate/screen/machine/list?${
      obj.provinceId ? `provinceId=${obj.provinceId}` : ""
    }${obj.orgId ? `orgId=${obj.orgId}` : ""}`
  )
}

export async function warnList(obj) {
  return request(`/api/hate-service/hate/screen/warn/list?orgId=${obj.orgId}`)
}

export async function warnShow() {
  return request("/api/hate-service/hate/screen/count/warn")
}
//Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjM3MzRhZGQ4LTk2OTMtNGE4NC04ZDZjLTQzOGNmZjQwOTJkMyJ9.g7DOWNmzH8ZJL1djithAV5kuJXyUqm1bpWGQK092ID0iPRClHAx7rFw3y9a-wU073WnPCuB6RvhILfhsbFteCQeyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImE2ZjYxZTllLTg1ZGQtNGM4NS1iZDE3LTFjMzFkZThkOGRlOSJ9.4y5jHm6crWvdKFH-cBRlrFKr2JMrtT6RXsLbr_3eZE1z18xLlA9WrsEp1dI66zEHbATc1UNsTts4XVy4RRjjRg
//Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImE2ZjYxZTllLTg1ZGQtNGM4NS1iZDE3LTFjMzFkZThkOGRlOSJ9.4y5jHm6crWvdKFH-cBRlrFKr2JMrtT6RXsLbr_3eZE1z18xLlA9WrsEp1dI66zEHbATc1UNsTts4XVy4RRjjRg