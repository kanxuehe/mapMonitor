/* eslint-disable */
import loading from "../../assets/loading.gif"

const PageLoading = () => (
  <div
    style={{
      display: "flex",
      width: "100%",
      height: "100%",
      alignItems: "center",
      position: "fixed",
      zIndex: 9999,
      justifyContent: "center",
      backgroundColor: "#000000",
    }}
  >
    <img
      style={{
        width: "15%",
      }}
      src={loading}
      alt=""
    />
  </div>
)
export default PageLoading
