import React from 'react'

export default function Label(props, context) {
  const { name, children, ...rest } = props
  const { form } = context
  return <label {...rest} htmlFor={form.getId(name)}>{children}</label>
}

Label.propTypes = {
  name: React.PropTypes.string.isRequired,
  children: React.PropTypes.node,
}

Label.contextTypes = {
  form: React.PropTypes.object.isRequired,
}
