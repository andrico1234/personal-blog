import { Link } from "gatsby"
import React from "react"
import * as styles from "./nav-bar.module.css"

export function NavBar() {
  return (
    <nav className={styles.NavBar}>
      <h2>Andrico</h2>
      <div>•</div>
      <a href="https://andri.co">
        <p>portfolio</p>
      </a>
      <div>•</div>
      <Link activeClassName="activeNav" to="/">
        <p>blog</p>
      </Link>
    </nav>
  )
}
