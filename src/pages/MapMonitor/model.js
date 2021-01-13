/* eslint-disable */
import { setAuthority } from "@/utils/authority"
import {
  getList,
  industryList,
  machineList,
  warnList,
  warnShow,
} from "./service"
import { mapData, geoCoordMap, provinceIds } from "./config"
const Model = {
  namespace: "mapMonitor",
  state: {
    status: undefined,
    list: [],
    allData: [],
    industryX: [],
    industryY: [],
    machineList: [],
    serveList: [],
    facilityList: [],
    warnList: [],
    reportList: [],
    mapData: {},
    warnAll: [],
  },
  effects: {
    *getList(obj, { call, put }) {
      const response = yield call(getList, obj)
      // const response = yield call(fakeAccountLogin, payload);
      if (response.code === 200) {
        let arr = response.data.filter(item => {
          return item.orgName === "客户"
        })
        let newArr = []
        arr[0].child.map(li => {
          if (li.child && li.child.length > 0) {
            li.child.map(d => {
              newArr.push({
                areaCode: d.areaCode,
                orgName: d.orgName,
                label: d.orgName,
                count: d.count,
                provinceId: d.provinceId,
                orgId: d.orgCode,
              })
            })
          } else {
            newArr.push({
              areaCode: li.areaCode,
              orgName: li.orgName,
              count: li.count,
              label: li.orgName,
              provinceId: li.provinceId,
              orgId: li.orgCode,
            })
          }
        })
        const mapArr = []
        for (const key in mapData) {
          let count = 0
          const arr = newArr.filter(d => d.areaCode.indexOf(key) !== -1)
          mapData[key].value = arr
          arr.map(li => {
            count += li.count
          })
          if (arr && arr.length) {
            mapArr.push({
              areaCode: key,
              label: key,
              count,
              value: mapData[key].value,
            })
          }
        }
        const warnAll = mapArr.map(item => {
          const obj = {}
          obj.name = item.areaCode
          obj.value = geoCoordMap[item.areaCode]
          obj.value2 = 0
          return obj
        })
        yield put({
          type: "save",
          payload: {
            list: mapArr,
            allData: newArr, // 全部平铺数据
            mapData: mapData, // 带省份数据
            warnAll,
          },
        })
        if (obj.warnAll) {
          obj.warnAll()
        }
      }
    },
    *industryList(_, { call, put }) {
      const response = yield call(industryList)
      if (response.code === 200) {
        if (response.data.length > 5) {
          response.data.slice(0, 5)
        }
        const x = []
        const y = []
        for (const key in response.data) {
          x.push(key)
          y.push(response.data[key])
        }
        yield put({
          type: "save",
          payload: {
            industryX: x,
            industryY: y,
          },
        })
      }
    },
    *machineList(_, { call, put }) {
      const response = yield call(machineList, _)
      if (response.code === 200) {
        const serve = []
        const facility = []
        const warnData = []
        //总数
        const sum = response.data.reduce((p, n) => {
          return p + n.inWarranty + n.outWarranty
        }, 0)
        //保外数量
        const outWarranty = response.data.reduce((p, n) => {
          return p + n.outWarranty
        }, 0)
        //在保数量
        const inWarranty = response.data.reduce((p, n) => {
          return p + n.inWarranty
        }, 0)
        //离线数量
        const offline = response.data.reduce((p, n) => {
          return p + n.offline
        }, 0)
        //在线数量
        const online = response.data.reduce((p, n) => {
          return p + n.online
        }, 0)
        //告警数量
        const warn = response.data.reduce((p, n) => {
          return p + n.warn
        }, 0)
        //正常数量
        const normal = response.data.reduce((p, n) => {
          return p + n.normal
        }, 0)

        serve.push(
          {
            name: `在保 ${inWarranty}台`,
            value: inWarranty,
          },
          {
            name: `保外 ${outWarranty}台`,
            value: outWarranty,
          }
        )

        facility.push(
          {
            name: `在线 ${online}台`,
            value: online,
          },
          {
            name: `离线 ${offline}台`,
            value: offline,
          }
        )

        warnData.push(
          {
            name: `告警 ${warn}台`,
            value: warn,
          },
          {
            name: `正常 ${normal}台`,
            value: normal,
          }
        )
        response.data.forEach(item => {
          switch (item.name) {
            case "AGV":
              item.name = "智慧物流AGV系统"
              break
            case "LGV":
              item.name = "智慧导航无人叉车系统"
              break
            case "development":
              item.name = "机器人工作站"
              break
            default:
              item.name = "机器视觉工作站"
              break
          }
        })
        const data = response.data.length
          ? response.data.map(item => {
              return Object.values(item)
            })
          : []
        data.map(item => {
          item.push('<a style = "color:#FFE000">更多</a>')
        })
        yield put({
          type: "save",
          payload: {
            serveList: serve,
            facilityList: facility,
            machineList: data,
            warnList: warnData,
          },
        })
      }
    },
    *warnList(obj, { call, put }) {
      const response = yield call(warnList, obj)
      if (response.code === 200) {
        response.data.forEach(item => {
          switch (item.type) {
            case "AGV":
              item.type = "智慧物流AGV系统"
              break
            case "LGV":
              item.type = "智慧导航无人叉车系统"
              break
            case "development":
              item.type = "机器人工作站"
              break
            default:
              item.name = "机器视觉工作站"
              break
          }
        })

        const data = response.data.length
          ? response.data.map(item => {
              return Object.values(item)
            })
          : []
        yield put({
          type: "save",
          payload: {
            reportList: data,
          },
        })
      }
    },
    *warnShow(obj, { call, put }) {
      const response = yield call(warnShow)
      if (response.code === 200) {
        response.data.forEach(item => {
          for (const key in provinceIds) {
            if (item.provinceId === provinceIds[key]) {
              item.name = key
            }
          }
          for (const key in geoCoordMap) {
            if (item.name === key) {
              item.value = geoCoordMap[key]
            }
          }
          item.value2 = item.count
        })
        obj.warnAll.forEach(item => {
          response.data.map(li => {
            if (item.name === li.name) {
              item.value2 = li.value2
            }
          })
        })
        yield put({
          type: "save",
          payload: {
            warnAll: obj.warnAll,
          },
        })
      }
    },
    *changeList({ provinceId }, { call, put }) {
      if (provinceId) {
        yield put({
          type: "save",
          payload: {
            list: mapData[provinceId].value,
          },
        })
      }
    },
    *changeAll({ allData }, { put }) {
      const mapArr = []
      for (const key in mapData) {
        let count = 0
        const arr = allData.filter(d => d.areaCode.indexOf(key) !== -1)
        mapData[key].value = arr
        arr.map(li => {
          count += li.count
        })
        if (arr && arr.length) {
          mapArr.push({
            areaCode: key,
            label: key,
            count,
            value: mapData[key].value,
          })
        }
      }
      yield put({
        type: "save",
        payload: {
          list: mapArr,
        },
      })
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority)
      return { ...state, status: payload.status, type: payload.type }
    },
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
export default Model
