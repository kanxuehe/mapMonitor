/* eslint-disable */
import request from "@/utils/request"

export async function getList() {
  return request(`/api/hate-service/hate/org/list?type=1`)
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
