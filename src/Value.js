import React from 'react'

export default function Value(props, context) {
  const { name, initial, ...rest } = props
  const { form } = context
  const value = form.getValue(name)
  return <span {...rest} dangerouslySetInnerHTML={html(value === undefined ? initial : value)} />
}

Value.propTypes = {
  name: React.PropTypes.string.isRequired,
  initial: React.PropTypes.any,
}

Value.contextTypes = {
  form: React.PropTypes.object.isRequired,
}

function html(value) {
  if (typeof value === 'boolean') {
    return { __html: value.toString() }
  }
  if (typeof value === 'string') {
    return { __html: value.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2') }
  }
  if (value && value.toString) {
    return { __html: value.toString() }
  }
  return { __html: '' }
}
