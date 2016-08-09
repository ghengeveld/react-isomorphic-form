import ReactDOMServer from 'react-dom/server'

export function renderDocument(reactHtmlElement) {
  return `<!doctype html>${ReactDOMServer.renderToStaticMarkup(reactHtmlElement)}`
}

export function renderAppHtml(reactAppElement) {
  return {
    __html: ReactDOMServer.renderToString(reactAppElement),
  }
}
