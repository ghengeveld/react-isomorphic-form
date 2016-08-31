import React from 'react'

export default class Input extends React.Component {
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
    form.change(name, event.target.value)
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
    const { name, initial } = this.props
    form.register(name, element ? element.value : undefined, initial)
  }
  render() {
    const { initial: _, ...props } = this.props
    return (
      <input
        {...props}
        id={this.id}
        ref={this.ref}
        value={this.getValue()}
        onChange={this.onChange}
      />
    )
  }
}

Input.propTypes = {
  name: React.PropTypes.string.isRequired,
  id: React.PropTypes.string,
  type: React.PropTypes.string,
  initial: React.PropTypes.string,
  onChange: React.PropTypes.func,
}

Input.defaultProps = {
  type: 'text',
  initial: '',
  onChange: () => {},
}

Input.contextTypes = {
  form: React.PropTypes.object.isRequired,
}
