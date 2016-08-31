import React from 'react'

export default class Radio extends React.Component {
  constructor(props, context) {
    super(props)
    const { form } = context
    this.id = props.id || form.getId(props.name, props.value)
    this.onChange = this.onChange.bind(this)
    this.getValue = this.getValue.bind(this)
    this.getChecked = this.getChecked.bind(this)
    this.ref = this.ref.bind(this)
  }
  onChange(event) {
    const { form } = this.context
    const { name, value, onChange } = this.props
    if (event.target.checked) form.change(name, value)
    onChange(event)
  }
  getValue() {
    const { form } = this.context
    const { name, initial } = this.props
    const value = form.getValue(name)
    return value === undefined ? initial : value
  }
  getChecked() {
    return this.getValue() === this.props.value
  }
  ref(element) {
    const { form } = this.context
    const { name, initial } = this.props
    form.register(name, element && element.checked ? element.value : undefined, initial)
  }
  render() {
    const { initial: _, ...props } = this.props
    return (
      <input
        {...props}
        type="radio"
        id={this.id}
        ref={this.ref}
        checked={this.getChecked()}
        onChange={this.onChange}
      />
    )
  }
}

Radio.propTypes = {
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  id: React.PropTypes.string,
  initial: React.PropTypes.string,
  onChange: React.PropTypes.func,
}

Radio.defaultProps = {
  onChange: () => {},
}

Radio.contextTypes = {
  form: React.PropTypes.object.isRequired,
}
