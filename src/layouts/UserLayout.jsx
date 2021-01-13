/* eslint-disable */
import {
  DefaultFooter,
  getMenuData,
  getPageTitle,
} from "@ant-design/pro-layout"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { Link, SelectLang, useIntl, connect } from "umi"
import React from "react"
import logo from "../assets/logo.png"
import styles from "./UserLayout.less"

const copyright = <div>2020 哈特机器人智能管理系统</div>

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props
  const { routes = [] } = route
  const {
    children,
    location = {
      pathname: "",
    },
  } = props
  const { formatMessage } = useIntl()
  const { breadcrumb } = getMenuData(routes)
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  })
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}></span>
            </div>
          </div>
          {children}
        </div>
        <DefaultFooter
          className={styles.footerTitle}
          links={[]}
          copyright={copyright}
        />
      </div>
    </HelmetProvider>
  )
}

export default connect(({ settings }) => ({ ...settings }))(UserLayout)
