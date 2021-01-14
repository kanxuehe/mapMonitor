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
      {
        title: "通知公告的标题这里是通知公告的标题",
        time: "2020-10-10",
      },
      {
        title: "通知公告的标题这里是通知公告的标题",
        time: "2020-10-10",
      },
    ],
    rightTopList: [
      {
        title: "已申报项目数",
        time: 680,
      },
      {
        title: "已申报金额",
        time: "88888888.88元",
      },
      {
        title: "已申报的公司数",
        time: 168,
      },
      {
        title: "未申报公司数",
        time: 88,
      },
      {
        title: "待审核数",
        time: 25,
      },
      {
        title: "申报已通过数",
        time: 259,
      },
      {
        title: "申报未通过数",
        time: 21,
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
  draw = () => {
    const myChart = echarts.init(document.getElementById("thrend-chart"))
    const option = {
      xAxis: {
        type: "category",
        data: [
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
        ],
        axisLine: {
          lineStyle: {
            color: "#7B7B7B",
          },
        },
        axisLabel: {
          rotate: 45,
          color: "#68D8FE",
          fontSize: 17,
          lineHeight: 17,
          fontFamily: "Source Han Sans CN",
          fontWeight: 400,
        },
      },
      grid: {
        top: 98,
        left: 16,
        right: 30,
        containLabel: true,
      },
      legend: {
        type: "plain",
        align: "right",
        top: 60,
        right: 30,
        formatter: function (name) {
          console.log(name)
          return name
        },
        data: [
          {
            name: "总金额",
            textStyle: {
              color: "#FFD200",
            },
          },
          {
            name: "总项目数",
            textStyle: {
              color: "#68D8FE",
            },
          },
        ],
      },
      color: ["#FFD200", "#68D8FE"],
      yAxis: {
        type: "value",

        axisLine: {
          lineStyle: {
            color: "#7B7B7B",
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#68D8FE",
          fontSize: 17,
          lineHeight: 17,
          fontFamily: "Source Han Sans CN",
          fontWeight: 400,
        },
      },
      series: [
        {
          name: "总金额",
          data: [820, 932, 901, 934, 1290, 1330, 1320, 1111, 1400],
          type: "line",
          symbol: "none",
        },
        {
          name: "总项目数",
          data: [221, 331, 341, 194, 129, 133, 120, 222, 333],
          type: "line",
          symbol: "none",
        },
      ],
    }

    myChart.setOption(option)
  }
  drawLeftBottom = () => {
    const myChart = echarts.init(document.getElementById("top-bottom-chart"))
    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
          label: {
            show: true,
          },
        },
      },
      grid: {
        top: 90,
        left: 20,
        right: 30,
        bottom: 50,
        containLabel: true,
      },
      legend: {
        data: ["金额", "公司数量"],
        top: 40,
        right: 20,
        textStyle: {
          color: "rgba(250,250,250,0.6)",
          fontSize: 16,
        },
      },
      xAxis: {
        type: "category",
        data: [
          "A分公司",
          "B分公司",
          "C分公司",
          "D分公司",
          "E分公司",
          "F分公司",
        ],
        axisLine: {
          show: true, //隐藏X轴轴线
          lineStyle: {
            color: "#26D9FF",
            width: 2,
          },
        },
        axisTick: {
          show: true, //隐藏X轴刻度
        },
        axisLabel: {
          show: true,
          rotate: 45,
          textStyle: {
            color: "rgba(250,250,250,0.6)", //X轴文字颜色
            fontSize: 16,
          },
        },
        // splitArea: {
        //   show: true,
        //   areaStyle: {
        //     color: ["rgba(250,250,250,0.1)", "rgba(250,250,250,0)"],
        //   },
        // },
      },
      yAxis: [
        {
          type: "value",
          nameTextStyle: {
            color: "#ebf8ac",
            fontSize: 16,
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: true,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#26D9FF",
              width: 2,
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "rgba(250,250,250,0.6)",
              fontSize: 16,
            },
          },
        },
        {
          type: "value",
          nameTextStyle: {
            color: "#ebf8ac",
            fontSize: 16,
          },
          position: "right",
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "rgba(250,250,250,0.6)",
              fontSize: 16,
            },
          },
        },
      ],
      series: [
        {
          name: "金额",
          type: "line",
          yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
          smooth: true, //平滑曲线显示
          showAllSymbol: true, //显示所有图形。
          symbol: "circle", //标记的图形为实心圆
          symbolSize: 6, //标记的大小
          itemStyle: {
            //折线拐点标志的样式
            color: "#1045A0",
            borderColor: "#3D7EEB",
            width: 2,
            shadowColor: "#3D7EEB",
            shadowBlur: 4,
          },
          lineStyle: {
            color: "#3D7EEB",
            width: 2,
            shadowColor: "#3D7EEB",
            shadowBlur: 4,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(61,126,235, 0.5)",
              },
              {
                offset: 1,
                color: "rgba(61,126,235, 0)",
              },
            ]),
          },
          data: [4.2, 3.5, 2.9, 7.8, 5, 3],
        },
        {
          name: "公司数量",
          type: "bar",
          barWidth: 15,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(61,126,235, 1)",
                },
                {
                  offset: 1,
                  color: "rgba(61,126,235, 0)",
                },
              ]),
              borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(160,196,225, 1)",
                },
                {
                  offset: 1,
                  color: "rgba(61,126,235, 1)",
                },
              ]),
              borderWidth: 2,
            },
          },
          data: [4, 3, 2, 8, 3, 5],
        },
      ],
    }
    myChart.setOption(option)
  }
  componentDidMount() {
    this.draw()
    this.drawLeftBottom()
  }
  render() {
    const { noticeList, rightTopList } = this.state
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
              <div id="top-bottom-chart" />
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
              <div className={style.modContent}>
                <ul className={style.rightTopUl}>
                  {rightTopList.map(item => {
                    return (
                      <li>
                        <span>{item.title}</span>
                        <span>{item.time}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
            <div className={style.rightBottom}>
              <p className={style.modTitle}>历年申报趋势图</p>
              <div id="thrend-chart" />
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
