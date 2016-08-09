import React from 'react'
import { IndexLink, Link } from 'react-router'

export default function Nav() {
  return (
    <nav>
      <IndexLink to="/">Home</IndexLink> | <Link to="/about">About</Link>
    </nav>
  )
}
