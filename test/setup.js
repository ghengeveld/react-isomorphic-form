import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import dirtyChai from 'dirty-chai'
import jsdom from 'jsdom'
import jsxChai from 'jsx-chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(chaiEnzyme())
chai.use(dirtyChai)
chai.use(jsxChai)
chai.use(sinonChai)

chai.config.includeStack = true

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
const win = doc.defaultView
const nav = { userAgent: 'node.js' }

Object.keys(win).forEach(key => {
  if (typeof global[key] === undefined) {
    global[key] = win[key]
  }
})

global.document = doc
global.window = win
global.navigator = nav
global.expect = chai.expect
global.sinon = sinon
