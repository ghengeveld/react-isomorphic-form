import React from 'react'

export default function Head(props) {
  const { title, children, stylesheets, scripts } = props
  return (
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      {children}
      {stylesheets && stylesheets.map(stylesheet => <link rel="stylesheet" href={stylesheet} key={stylesheet} />)}
      {scripts && scripts.map(script => <script src={script} key={script} />)}
    </head>
  )
}

Head.propTypes = {
  title: React.PropTypes.string.isRequired,
  children: React.PropTypes.node,
  stylesheets: React.PropTypes.array,
  scripts: React.PropTypes.array,
}
