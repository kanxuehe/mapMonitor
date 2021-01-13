import { message } from "antd"
import { login } from "./service"

const Model = {
  namespace: "userAndlogin",

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call }) {
      const response = yield call(login, payload)
      // yield put({
      //   type: 'changeLoginStatus',
      //   payload: response,
      // });
      // Login successfully
      if (response.errCode === 0) {
        const { token } = response.data
        localStorage.setItem("user", JSON.stringify(response.data))
        localStorage.setItem("token", `Bearer ${token}`)
        window.location.href = "/home"
      } else {
        message.error(response.msg)
      }
      // window.location.href = redirect || '/truck/panoramic';
      // yield put(routerRedux.replace(redirect || '/'));
    },
  },
}

export default Model
