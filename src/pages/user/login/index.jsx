import { Alert } from "antd"
import React, { useState } from "react"
import { connect } from "umi"
import LoginForm from "./components/Login"
import styles from "./style.less"

const { UserName, Password, Submit } = LoginForm

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
)

const Login = props => {
  const { userLogin = {}, submitting } = props
  const { status, type: loginType } = userLogin
  const [type, setType] = useState("account")

  const handleSubmit = values => {
    const { dispatch } = props
    dispatch({
      type: "userAndlogin/login",
      payload: values,
    })
  }

  return (
    <div className={styles.main}>
      <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        {status === "error" && loginType === "account" && !submitting && (
          <LoginMessage content="账户或密码错误（admin/ant.design）" />
        )}
        <UserName
          name="member"
          placeholder="请输入公司名!"
          rules={[
            {
              required: true,
              message: "请输入公司名!",
            },
          ]}
        />
        <UserName
          name="username"
          placeholder="请输入用户名!"
          rules={[
            {
              required: true,
              message: "请输入用户名!",
            },
          ]}
        />
        <Password
          name="password"
          placeholder="请输入密码！"
          rules={[
            {
              required: true,
              message: "请输入密码！",
            },
          ]}
        />

        <Submit loading={submitting}>登录</Submit>
      </LoginForm>
    </div>
  )
}

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects["login/login"],
}))(Login)
