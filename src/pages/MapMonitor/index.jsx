/* eslint-disable */
import React, { Component, createRef } from "react"
import { connect } from "umi"
// import { Table } from 'antd';
import echarts from "echarts"
import { BorderBox13, ScrollBoard } from "@jiaminghi/data-view-react"
import style from "./index.less"
// import { footerRightColumns, footerLeftColumns } from './config';
import { provinceIds } from "./config"
import Map from "./components/map/index.jsx"
import headerImg from "../../assets/头部@2x.png"

class MapMonitor extends Component {
  state = {
    mockData: [],
    noticeList: [
      {
        title: "通知公告的标题这里是通知公告的标题",
        time: "2020-10-10",
      },
      {
        title: "通知公告的标题这里是通知公告的标题",
        time: "2020-10-10",
      },
      {
        title: "通知公告的标题这里是通知公告的标题",
        time: "2020-10-10",
      },
    ],
  }
  changeAll = () => {
    // const { dispatch, allData } = this.props
    // this.setState({
    //   flang: false,
    // })
    // dispatch({
    //   type: "home/changeAll",
    //   allData,
    // })
    // dispatch({
    //   type: "home/machineList",
    //   provinceId: "0",
    // })
  }
  render() {
    const { noticeList } = this.state
    return (
      <div className={style.Wrapper}>
        <div className={style.header}>
          <img src={headerImg} alt="" />
        </div>
        <div className={style.main}>
          <div className={style.mainLeft}>
            <div className={style.leftTop}>
              <p className={style.modTitle}>通知公告</p>
              <div className={style.modContent}>
                <ol>
                  {noticeList.map(item => {
                    return (
                      <li>
                        <span>
                          <i />
                          {item.title}
                        </span>
                        <span>{item.time}</span>
                      </li>
                    )
                  })}
                </ol>
              </div>
            </div>
            <div className={style.leftBottom}>
              <p className={style.modTitle}>各分公司申报排行榜</p>
              <div id="leftBottom" />
            </div>
          </div>
          <div className={style.mainCenter}>
            {/* <BorderBox13 color={["#016ED1"]}> */}
              <Map
                // list={list}
                changeAll={this.changeAll}
                // warnAll={mockData}
                // click={this.click}
                // factoryChange={this.factoryChange}
                // orgClick={this.orgClick}
                list={[]}
                warnAll={[]}
              />
            {/* </BorderBox13> */}
          </div>

          <div className={style.mainRight}>
            <div className={style.rightTop}>
              <p className={style.modTitle}>当前申报情况分析</p>
              <div id="rightTop" />
            </div>
            <div className={style.rightBottom}>
              <p className={style.modTitle}>历年申报趋势图</p>
              <div id="rightBottom" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(({ mapMonitor, login, loading }) => ({
  // list: home.list,
  // industryX: home.industryX,
  // industryY: home.industryY,
  // machineList: home.machineList,
  // serveList: home.serveList,
  // allData: home.allData,
  // facilityList: home.facilityList,
  // warnList: home.warnList,
  // mapData: home.mapData,
  // reportList: home.reportList,
  // warnAll: home.warnAll,
  // status: login.status,
  // submitting: loading.effects["home/getList"],
}))(MapMonitor)
