import { Link } from "gatsby"
import React from "react"
import * as styles from "./nav-bar.module.css"

export function NavBar() {
  return (
    <nav className={styles.NavBar}>
      <h2>Andrico</h2>
      <div aria-hidden>•</div>
      <a href="https://andri.co">
        <p>portfolio</p>
      </a>
      <div aria-hidden>•</div>
      <Link activeClassName="activeNav" to="/">
        <p>blog</p>
      </Link>
      <div aria-hidden>•</div>
      <a href="https://andri.co/bookshelf">
        <p>bookshelf</p>
      </a>
    </nav>
  )
}
