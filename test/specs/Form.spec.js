import React from 'react'
import { mount } from 'enzyme'

import Form from '../../src/Form'
import Input from '../../src/Input'

describe('Form', () => {
  it('should render a <form> element', () => {
    const wrapper = mount(<Form name="myForm" action="/action" method="POST" />)
    expect(wrapper.find('form').length).to.equal(1)
  })

  it('should render children', () => {
    const form = mount(<Form name="myForm" action="/action" method="POST">Hello</Form>).find('form')
    expect(form.text()).to.equal('Hello')
  })

  it('should pass on any props', () => {
    const form = mount(<Form name="myForm" action="/action" method="POST" className="fancy" />).find('form')
    expect(form.prop('name')).to.equal('myForm')
    expect(form.prop('action')).to.equal('/action')
    expect(form.prop('method')).to.equal('POST')
    expect(form.prop('className')).to.equal('fancy')
  })

  it('should initialize its internal state based on its children', () => {
    const wrapper = mount(
      <Form name="myForm" action="/action" method="POST">
        <Input name="val1" />
        <Input name="val2" initial="Hi" />
      </Form>
    )
    expect(wrapper.state()).to.deep.equal({
      val1: {
        initial: '',
        value: '',
      },
      val2: {
        initial: 'Hi',
        value: 'Hi',
      },
    })
  })

  describe('when entering data', () => {
    it('should update its internal state', () => {
      const wrapper = mount(
        <Form name="myForm" action="/action" method="POST">
          <Input name="val" initial="Hi" />
        </Form>
      )
      wrapper.find('input').simulate('change', { target: { value: 'Hello' } })
      expect(wrapper.state('val')).to.deep.equal({
        initial: 'Hi',
        value: 'Hello',
      })
    })

    it('should trigger the onChange handler', () => {
      const onChange = sinon.spy()
      const wrapper = mount(
        <Form name="myForm" action="/action" method="POST" onChange={onChange}>
          <Input name="val" />
        </Form>
      )
      wrapper.find('input').simulate('change', { target: { value: 'Hi' } })
      wrapper.find('input').simulate('change', { target: { value: 'Hello' } })
      expect(wrapper.state('val')).to.deep.equal({
        initial: '',
        value: 'Hello',
      })
      expect(onChange).to.have.been.calledWith(
        sinon.match({ fieldName: 'val', newValue: 'Hello', oldValue: 'Hi', initialValue: '' }),
        sinon.match.func
      )
    })
  })
})
