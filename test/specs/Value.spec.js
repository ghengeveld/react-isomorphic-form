import React from 'react'
import { mount } from 'enzyme'

import Value from '../../src/Value'
import Form from '../../src/Form'
import Input from '../../src/Input'

function mountForm(content) {
  return mount(<Form name="myForm" action="/action" method="POST">{content}</Form>)
}

describe('Value', () => {
  it('should render a <span> element', () => {
    const wrapper = mountForm(<Value name="val" />)
    expect(wrapper.find('span').length).to.equal(1)
  })

  it('should render the initial value', () => {
    const value = mountForm(<Value name="val" initial="Init" />).find('span')
    expect(value.text()).to.equal('Init')
  })

  it('should render the value of the matching form field, replacing the initial value', () => {
    const wrapper = mountForm(
      <div>
        <Input name="greeting" />,
        <Value name="greeting" initial="Hi" />,
      </div>
    )
    wrapper.find('input').simulate('change', { target: { value: 'Hello' } })
    expect(wrapper.find('span').text()).to.equal('Hello')
  })

  it('should pass on any props', () => {
    const value = mountForm(<Value name="val" id="myVal" className="fancy" />).find('span')
    expect(value.prop('id')).to.equal('myVal')
    expect(value.prop('className')).to.equal('fancy')
  })
})
