/* eslint-disable */
import React, { useEffect, useState } from "react"
import { connect } from "umi"
import echarts from "echarts"
import "echarts/map/js/china"
import "echarts/map/js/province/zhejiang"
import { geoCoordMap, mapData } from "../../config"
import style from "./index.less"
const Map = props => {
  const a = mapData.features.map(item => ({
    name: item.properties.name,
    value: item.properties.center,
  }))
  console.log(a)
  function draw() {
    const myChart = echarts.init(document.getElementById("map-chart"))
    const option = {
      // grid: [
      //   // 指定坐标轴位置，大小
      //   {
      //     x: "68%",
      //     y: "7%",
      //     width: "30%",
      //     height: "50%",
      //   },
      // ],
      geo: {
        map: "",
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
      },
      tooltip: {
        show: true,
        trigger: "item",
        backgroundColor: 'rgba(0,0,0,0)',
        formatter: value => `<div class=${style.mapTooltip}>
        <div class=${style.mapTooltipTitle}>${value.name}</div>
        <div><span class=${style.mapTooltipTotal}>项目总数：</span><span class=${style.mapTooltipUnit}>102</span></div>
        <div><span class=${style.mapTooltipTotal}>金额总数：</span><span class=${style.mapTooltipUnit}>1502145.88</span></div>

        </div>`,
      },
      series: [
        {
          type: "map",
          mapType: "HZ",
          aspectScale: 0.75,
          // layoutCenter: ["35%", "50%"], // 地图位置
          layoutSize: "100%",
          zoom: 1, // 当前视角的缩放比例
          // roam: true, //是否开启平游或缩放
          // scaleLimit: {
          //   // 滚轮缩放的极限控制
          //   min: 1,
          //   max: 2,
          // },
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
          symbolSize: 6, //点的大小
          showEffectOn: "render",
          rippleEffect: {
            period: 2,
            scale: 5,
            brushType: "fill",
          },
          hoverAnimation: true,
          data: [
            { name: "", value: [590, 360] },
            { name: "", value: [595, 380] },
            { name: "", value: [640, 330] },
            { name: "", value: [585, 320] },
            { name: "", value: [560, 370] },
            { name: "", value: [590, 330] },
            { name: "萧山区", value: [680, 340] },
            { name: "余杭区", value: [520, 300] },
            { name: "富阳市", value: [490, 450] },
            { name: "临安市", value: [340, 360] },
            { name: "桐庐县", value: [400, 480] },
            { name: "淳安县", value: [240, 550] },
            { name: "建德市", value: [400, 600] },
          ],
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
      ],
      visualMap: {
        min: 800,
        max: 50000,
        text: ["High", "Low"],
        realtime: false,
        calculable: true,
        show: false,
        inRange: {
          color: ["rgba(252, 255, 0, .6)", "yellow", "orangered"],
        },
      },
    }
    echarts.registerMap("HZ", mapData)
    myChart.setOption(option)
  }
  useEffect(() => {
    draw()
  })

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div id="map-chart" style={{ width: "100%", height: "100%" }} />
    </div>
  )
}
export default connect(({ map, login, loading }) => ({
  status: login.status,
  submitting: loading.effects["map/getList"],
}))(Map)
