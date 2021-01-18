/* eslint-disable */
import { setAuthority } from "@/utils/authority"
import {
  getNoticeList,
  getSummary,
  getComapny,
  getZone,
  getHistory,
} from "./service"
import { mapData, geoCoordMap, provinceIds } from "./config"
const Model = {
  namespace: "mapMonitor",
  state: {
    noticeList:[],
    historyList:[],
    summaryList:[]
  },
  effects: {
    *getNoticeList({payload}, { call, put }) {
      const response = yield call(getNoticeList, payload)
      const {rows = []} = response;
      yield put({
        type: "save",
        payload: {
          noticeList: rows,
        },
      })
    },
    *getSummary({payload}, { call, put }) {
      const response = yield call(getSummary, payload)
      console.log(response,'response') 
      const {data = {}} = response;
      const arr = [
        {
          title: "已申报项目数",
          time: data.reportedCount,
        },
        {
          title: "已申报金额",
          time: data.reportedAmount,
        },
        {
          title: "已申报的公司数",
          time: data.reportedCompanyCount,
        },
        {
          title: "未申报公司数",
          time: data.unReportedCompanyCount,
        },
        {
          title: "待审核数",
          time: data.preAuditCount,
        },
        {
          title: "申报已通过数",
          time: data.auditedCount,
        },
        {
          title: "申报未通过数",
          time: data.unAuditedCount,
        },
      ]
      yield put({
        type: "save",
        payload: {
          summaryList: arr,
        },
      })
    },
    *getComapny({payload}, { call, put }) {
      const response = yield call(getComapny, payload)
      console.log(response,'response') 
      // const {rows = []} = response;
      // yield put({
      //   type: "save",
      //   payload: {
      //     noticeList: rows,
      //   },
      // })
    },

    *getZone({payload}, { call, put }) {
      const response = yield call(getZone, payload)
      console.log(response,'response') 
      // const {rows = []} = response;
      // yield put({
      //   type: "save",
      //   payload: {
      //     noticeList: rows,
      //   },
      // })
    },
    *getHistory({payload}, { call, put }) {
      const response = yield call(getHistory, payload)
      console.log(response,'response') 
      const {data = []} = response;
      yield put({
        type: "save",
        payload: {
          historyList: data,
        },
      })
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
export default Model
