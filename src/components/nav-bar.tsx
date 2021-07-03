import React from "react"
import * as styles from "./nav-bar.module.css"

export function NavBar() {
  return (
    <nav className={styles.NavBar}>
      <h2>Andrico</h2>
      <div>•</div>
      <p>portfolio</p>
      <div>•</div>
      <p>blog</p>
    </nav>
  )
}
