import React from 'react'

export default class Textarea extends React.Component {
  constructor(props, context) {
    super(props)
    const { form } = context
    this.id = props.id || form.getId(props.name)
    this.getValue = this.getValue.bind(this)
    this.ref = this.ref.bind(this)
    this.onChange = this.onChange.bind(this)
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
    const { name, initial, ref } = this.props
    form.register(name, element ? element.value : undefined, initial)
    ref(element)
  }
  render() {
    const { initial: _, ...props } = this.props
    return (
      <textarea
        {...props}
        id={this.id}
        ref={this.ref}
        value={this.getValue()}
        onChange={this.onChange}
      />
    )
  }
}

Textarea.propTypes = {
  name: React.PropTypes.string.isRequired,
  id: React.PropTypes.string,
  initial: React.PropTypes.string,
  ref: React.PropTypes.func,
  onChange: React.PropTypes.func,
}

Textarea.defaultProps = {
  initial: '',
  ref: () => {},
  onChange: () => {},
}

Textarea.contextTypes = {
  form: React.PropTypes.object.isRequired,
}
