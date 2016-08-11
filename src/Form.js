import React from 'react'

export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.getId = this.getId.bind(this)
    this.getValue = this.getValue.bind(this)
    this.getFormData = this.getFormData.bind(this)
    this.register = this.register.bind(this)
    this.change = this.change.bind(this)
    this.submit = this.submit.bind(this)
    this.reset = this.reset.bind(this)
  }
  getChildContext() {
    return {
      form: {
        getId: this.getId,
        getValue: this.getValue,
        register: this.register,
        change: this.change,
      },
    }
  }
  getId(...names) {
    return [this.props.name, ...names].join('_')
  }
  getValue(name) {
    return this.state[name] ? this.state[name].value : undefined
  }
  getFormData() {
    return Object.keys(this.state).reduce((acc, key) => {
      Object.assign(acc, { [key]: this.state[key].value })
      return acc
    }, {})
  }
  register(fieldName, value, initial = value) {
    const { onInit = () => {} } = this.props
    const defineOnce = (currentValue, newValue) => (currentValue === undefined ? newValue : currentValue)
    this.setState(state => (state[fieldName] ? ({
      [fieldName]: {
        ...state[fieldName],
        initial: defineOnce(state[fieldName].initial, initial),
        value: defineOnce(state[fieldName].value, value),
      },
    }) : ({
      [fieldName]: { initial, value },
    })),
      () => onInit({ fieldName, value, initial }, this.getFormData)
    )
  }
  change(fieldName, newValue) {
    const { onChange = () => {} } = this.props
    const { value: oldValue, initial: initialValue } = this.state[fieldName]
    this.setState(
      state => ({ [fieldName]: { ...state[fieldName], value: newValue } }),
      () => onChange({ fieldName, newValue, oldValue, initialValue }, this.getFormData)
    )
  }
  submit(event) {
    if (typeof window.fetch !== 'function') return
    event.preventDefault()

    const { action, method, beforeSubmit, onSuccess, onFailure } = this.props
    const formdata = beforeSubmit ? beforeSubmit(this.getFormData()) : this.getFormData()

    if (formdata) {
      window.fetch(action, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata),
      }).then(response => {
        if (response.ok) {
          this.reset()
          if (onSuccess) {
            onSuccess(response)
          }
        } else if (onFailure) {
          onFailure(response)
        }
      })
    }
  }
  reset() {
    Object.keys(this.state).forEach(key => {
      this.setState(state => ({ [key]: { ...state[key], value: state[key].initial } }))
    })
  }
  render() {
    const {
      children,
      onInit: _,
      onChange: __,
      beforeSubmit: ___,
      onSuccess: ____,
      onFailure: _____,
      ...props,
    } = this.props
    return <form {...props} onSubmit={this.submit} onReset={this.reset}>{children}</form>
  }
}

Form.propTypes = {
  name: React.PropTypes.string.isRequired,
  action: React.PropTypes.string.isRequired,
  method: React.PropTypes.string.isRequired,
  children: React.PropTypes.node,
  onInit: React.PropTypes.func,
  onChange: React.PropTypes.func,
  beforeSubmit: React.PropTypes.func,
  onSuccess: React.PropTypes.func,
  onFailure: React.PropTypes.func,
}

Form.childContextTypes = {
  form: React.PropTypes.object.isRequired,
}
