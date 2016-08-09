import babelify from 'babelify'
import browserify from 'browserify'
import path from 'path'

import bodyParser from 'body-parser'
import express from 'express'
import React from 'react'
import { match, RouterContext } from 'react-router'

import routes from './routes'
import Head from './components/document/Head'
import Body from './components/document/Body'
import { renderDocument, renderAppHtml } from './utils/rendering'

const app = express()
const server = app.listen(8000, () => {
  console.log(`Listening on port ${server.address().port}`) // eslint-disable-line no-console
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/app.js', (req, res) => {
  browserify(path.join(__dirname, 'client.js'), { debug: true })
    .transform(babelify)
    .bundle()
    .pipe(res)
})

app.post('/subscribe', (req, res) => {
  if (req.body.email) {
    if (req.accepts('json')) {
      res.status(200).type('json').send(JSON.stringify(req.body))
    } else {
      res.sendStatus(200)
    }
  } else {
    res.sendStatus(400)
  }
})

app.use((req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      return res.status(500).send(error.message)
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    }

    if (renderProps) {
      return res.status(200).send(renderDocument(
        <html lang="en">
          <Head title="Home" />
          <Body scripts={['app.js']}>
            <div id="root" dangerouslySetInnerHTML={renderAppHtml(<RouterContext {...renderProps} />)} />
          </Body>
        </html>
      ))
    }

    return res.status(404).send('Not found')
  })
})
