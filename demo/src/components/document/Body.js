import React from 'react'

export default function Body(props) {
  const { children, scripts, ...rest } = props
  return (
    <body {...rest}>
      {children}
      {scripts && scripts.map(script => <script key={script} src={script} />)}
    </body>
  )
}

Body.propTypes = {
  children: React.PropTypes.node.isRequired,
  scripts: React.PropTypes.array,
}
