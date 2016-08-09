import React from 'react'

export default class Checkbox extends React.Component {
  constructor(props, context) {
    super(props)
    const { form } = context
    this.id = props.id || form.getId(props.name)
    this.onChange = this.onChange.bind(this)
    this.getValue = this.getValue.bind(this)
    this.ref = this.ref.bind(this)
  }
  onChange(event) {
    const { form } = this.context
    const { name, onChange } = this.props
    form.change(name, event.target.checked)
    onChange(event)
  }
  getValue() {
    const { form } = this.context
    const { name, initial } = this.props
    const value = form.getValue(name)
    return value === undefined ? initial : value
  }
  ref(element) {
    const { form } = this.context
    const { name, initial, ref } = this.props
    form.register(name, element ? element.checked : undefined, initial)
    ref(element)
  }
  render() {
    const { initial: _, ...props } = this.props
    return (
      <input
        {...props}
        type="checkbox"
        id={this.id}
        ref={this.ref}
        checked={this.getValue()}
        onChange={this.onChange}
      />
    )
  }
}

Checkbox.propTypes = {
  name: React.PropTypes.string.isRequired,
  id: React.PropTypes.string,
  initial: React.PropTypes.bool,
  ref: React.PropTypes.func,
  onChange: React.PropTypes.func,
}

Checkbox.defaultProps = {
  initial: false,
  ref: () => {},
  onChange: () => {},
}

Checkbox.contextTypes = {
  form: React.PropTypes.object.isRequired,
}
