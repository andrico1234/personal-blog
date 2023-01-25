import * as React from "react"
import { NavBar } from "./nav-bar"
import { init, trackPages } from 'insights-js'

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  React.useEffect(() => {
    init('oqTYNC_ZUpMmCrCt')
    trackPages()
  }, [])

  return (
    <div>
      <NavBar />
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <main>{children}</main>
      </div>
    </div>
  )
}

export default Layout
