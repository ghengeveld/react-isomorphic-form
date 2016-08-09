import React from 'react'
import { IndexRoute, Route } from 'react-router'

import About from './components/pages/About'
import Home from './components/pages/Home'

export default (
  <Route path="/">
    <IndexRoute component={Home} />
    <Route path="about" component={About} />
  </Route>
)
