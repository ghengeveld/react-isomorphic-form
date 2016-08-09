import React from 'react'

export default class Select extends React.Component {
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
    form.change(name, this.getSelection(event.target))
    onChange(event)
  }
  getValue() {
    const { form } = this.context
    const { name, initial } = this.props
    const value = form.getValue(name)
    return value === undefined ? initial : value
  }
  getSelection(element) {
    const { multiple } = this.props
    return multiple ? Array.prototype.filter.call(element.options, o => o.selected).map(o => o.value) : element.value
  }
  ref(element) {
    const { form } = this.context
    const { name, initial, ref } = this.props
    form.register(name, element ? this.getSelection(element) : undefined, initial)
    ref(element)
  }
  renderOptions(options) {
    return Array.isArray(options)
      ? options.map(option => <option key={option} value={option}>{option}</option>)
      : Object.keys(options).map(key => <option key={key} value={key}>{options[key]}</option>)
  }
  render() {
    const { multiple, options, children, initial: _, ...props } = this.props
    return (
      <select
        {...props}
        multiple={multiple}
        id={this.id}
        ref={this.ref}
        value={this.getValue()}
        onChange={this.onChange}
      >
        {options ? this.renderOptions(options) : children}
      </select>
    )
  }
}

Select.propTypes = {
  name: React.PropTypes.string.isRequired,
  id: React.PropTypes.string,
  multiple: React.PropTypes.bool,
  initial: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array]),
  options: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
  children: React.PropTypes.node,
  ref: React.PropTypes.func,
  onChange: React.PropTypes.func,
}

Select.defaultProps = {
  multiple: false,
  ref: () => {},
  onChange: () => {},
}

Select.contextTypes = {
  form: React.PropTypes.object.isRequired,
}
