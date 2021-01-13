/* eslint-disable */
import React, { useEffect, useState } from "react"
import { connect } from "umi"
import echarts from "echarts"
import "echarts/map/js/china"
import { geoCoordMap, mapData } from "../../config"
import style from "./index.less"

const Map = props => {
  const [selectKey, setSelectKey] = useState("")
  const [selectType, setSelectType] = useState("")
  const [flang, setFlang] = useState(false)
  const [xData, setXData] = useState()
  const [yData, setYData] = useState()
  const [ceDAta, setCeDAta] = useState([])
  const changeAll = () => {
    setFlang(false)
    setSelectType("")
    setSelectKey("")
    props.changeAll()
  }
  useEffect(() => {
    setXData(
      props.list.map(item => (item.value ? item.value.length : item.count))
    )
    setYData(props.list.map(item => item.label))
  }, [props])
  useEffect(() => {
    setCeDAta(props.warnAll)
    draw()
  }, [props.warnAll])
  useEffect(() => {
    draw()
  }, [ceDAta])
  useEffect(() => {
    draw()
  }, [xData, yData])
  useEffect(() => {
    if (selectType === "map") {
      props.click(selectKey)
      setFlang(true)
    }
    if (selectType === "list") {
      const obj = props.list.find(d => d.label === selectKey)
      if (!obj) return
      if (obj && !obj.provinceId) {
        props.click(selectKey)
        setFlang(true)
      } else {
        props.orgClick(obj)
        setFlang(true)
      }
    }
  }, [selectType, selectKey])

  const draw = () => {
    const myChart = echarts.init(document.getElementById("map-chart"))
    myChart.on("click", params => {
      if (params.componentSubType === "bar") {
        setSelectType("list")
        if (mapData[params.name] !== undefined) {
          setSelectKey(params.name)
        } else {
          props.factoryChange(params.name, selectKey)
        }
      }
      if (params.componentSubType === "map") {
        setSelectType("map")
        setSelectKey(params.name)
      }
    })
    console.log(props.warnAll,11)
    const option = {
      xAxis: {
        show: false,
      },
      yAxis: [
        {
          type: "category",
          inverse: true,
          zlevel: 5,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          data: yData,
        },
      ],

      grid: [
        // 指定坐标轴位置，大小
        {
          x: "68%",
          y: "7%",
          width: "30%",
          height: "50%",
        },
      ],
      geo: {
        map: "china",
        aspectScale: 0.85,
        layoutCenter: ["35%", "50%"], // 地图位置
        layoutSize: "100%",
        itemStyle: {
          normal: {
            shadowColor: "#276fce",
            shadowOffsetX: 0,
            shadowOffsetY: 15,
            opacity: 0.5,
          },
          emphasis: {
            areaColor: "#276fce",
          },
        },
        regions: [
          {
            name: "南海诸岛",
            itemStyle: {
              areaColor: "rgba(0, 10, 52, 1)",

              borderColor: "rgba(0, 10, 52, 1)",
              normal: {
                opacity: 0,
                label: {
                  show: false,
                  color: "#009cc9",
                },
              },
            },
            label: {
              show: false,
              color: "#FFFFFF",
              fontSize: 12,
            },
          },
        ],
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          type: "map",
          mapType: "china",
          tooltip: {
            show: false,
            trigger: "item",
            formatter: value => `${value.name}: 告警数量${value.data.value2}`,
          },
          aspectScale: 0.85,
          layoutCenter: ["35%", "50%"], // 地图位置
          layoutSize: "100%",
          zoom: 1, // 当前视角的缩放比例
          // roam: true, //是否开启平游或缩放
          scaleLimit: {
            // 滚轮缩放的极限控制
            min: 1,
            max: 2,
          },
          itemStyle: {
            normal: {
              areaColor: "#0c274b",
              borderColor: "#1cccff",
              borderWidth: 1.5,
            },
            emphasis: {
              areaColor: "#02102b",
              label: {
                color: "#fff",
              },
            },
          },
        },
        {
          type: "effectScatter",
          coordinateSystem: "geo",
          z: 12,
          tooltip: {
            trigger: "item",
            formatter: value =>
              `${value.name}: 告警数量${
                value.data.value2 ? value.data.value2 : 0
              }`,
          },
          symbolSize: 7,
          showEffectOn: "render",
          rippleEffect: {
            period: 2,
            scale: 5,
            brushType: "fill",
          },
          hoverAnimation: true,
          data: props.warnAll,
          label: {
            normal: {
              show: true,
              textStyle: {
                color: "#fff",
              },
              padding: [0, 0, -50, 0],
              formatter(item) {
                return item.name
              },
            },
            emphasis: {
              show: false,
              textStyle: {
                show: false,
                color: "#fff",
              },
            },
          },

          itemStyle: {
            normal: {
              show: true,
              color(params) {
                if (params.data.value2 > 5) {
                  return "#d04132"
                }
                if (params.data.value2 >= 1) {
                  return "#eec511"
                }
                if (!params.data.value2) {
                  return "#17b885"
                }
              },
              shadowBlur: 10,
              shadowColor: "#333",
            },
            emphasis: {
              areaColor: "#f00",
            },
          },
        },
        {
          type: "bar",
          xAxisIndex: 0, // 指定折线图数据显示到：grid坐标系：0
          yAxisIndex: 0,
          showSymbol: false,
          zlevel: 5,
          itemStyle: {
            normal: {
              barBorderRadius: 30,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: "rgb(57,89,255,1)",
                },
                {
                  offset: 1,
                  color: "rgb(46,200,207,1)",
                },
              ]),
            },
          },
          barWidth: 10,
          //   xAxis: {
          //     type: 'value',
          //     scale: true,
          //     position: 'top',
          //     splitNumber: 1,
          //     boundaryGap: false,
          //     splitLine: {
          //         show: false
          //     },
          //     axisLine: {
          //         show: false
          //     },
          //     axisTick: {
          //         show: false
          //     },
          //     axisLabel: {
          //       margin: 2,
          //       textStyle: {
          //           color: '#aaa'
          //       }
          //     }
          // },
          data: xData, // 折线图y轴数据赋值
        },
        // 关系图数据
      ],
      //   visualMap: [{
      //     dimension: 0,
      //     left: 50,
      //     top: 420,
      //     itemWidth: 10,
      //     text: ['告警', '正常'],
      //     textStyle: {
      //       color: '#ddd'
      //     },
      //     inRange: {
      //       color: ['#70D300', '#70D300', 'orangered', 'red']
      //     }
      // }],
    }
    myChart.setOption(option)
  }
  useEffect(() => {
    draw()
  }, [])

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className={style.Title}>
        {selectKey ? selectKey : "全国"}用户分布图
      </div>
      <div
        className={flang ? style.Bottom : style.noButtom}
        onClick={changeAll}
      >
        全国
      </div>
      <div id="map-chart" style={{ width: "100%", height: "100%" }} />
      <div className={style.gradientBox}>
        <span>告警</span>
        <div className={style.gradient}></div>
        <span>正常</span>
      </div>
    </div>
  )
}
export default connect(({ map, login, loading }) => ({
  status: login.status,
  submitting: loading.effects["map/getList"],
}))(Map)
