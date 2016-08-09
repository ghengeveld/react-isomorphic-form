/* eslint-disable no-console */

import React from 'react'
import { Form, Input, Label, Value, Checkbox, Radio, Select, Textarea } from 'react-isomorphic-form'

import Nav from '../Nav'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = { formData: {} }
    this.beforeSubmit = this.beforeSubmit.bind(this)
    this.handleSuccess = this.handleSuccess.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  beforeSubmit(data) {
    console.log(data)
    return data
  }
  handleSuccess(response) {
    response.json().then(data => console.log(data))
  }
  handleChange(change, getFormData) {
    console.log(change)
    this.setState({ formData: getFormData() })
  }
  render() {
    return (
      <div>
        <Nav />
        <h1>Home</h1>

        <Form
          name="subscribe" action="/subscribe" method="post"
          beforeSubmit={this.beforeSubmit}
          onSuccess={this.handleSuccess}
          onChange={this.handleChange}
        >
          <p>
            <Label name="email">Email:</Label>
            <Input name="email" placeholder="you@example.com" initial="foo" />
            <Value name="email" />
          </p>
          <p>
            <Label name="range">Rating:</Label>
            <Input name="range" type="range" />
            <Value name="range" />
          </p>
          <p>
            <Label name="newsletter">
              <Checkbox name="newsletter" />
              Receive newsletter
            </Label>
            <Value name="newsletter" />
          </p>
          <p>
            <Label name="gender_male">
              <Radio name="gender" value="male" initial="male" />
              Male
            </Label>
            <Label name="gender_female">
              <Radio name="gender" value="female" initial="male" />
              Female
            </Label>
            <Value name="gender" />
          </p>
          <p>
            <Label name="fruit1">Fruit 1</Label>
            <Select name="fruit1" initial="B">
              <option value="A">Apple</option>
              <option value="B">Banana</option>
              <option value="C">Cranberry</option>
            </Select>
            <Value name="fruit1" />
          </p>
          <p>
            <Label name="fruit2">Fruit 2</Label>
            <Select name="fruit2" initial="Banana" options={['Apple', 'Banana', 'Cranberry']} />
            <Value name="fruit2" />
          </p>
          <p>
            <Label name="fruit3">Fruit 3</Label>
            <Select name="fruit3" initial="B" options={{ A: 'Apple', B: 'Banana', C: 'Cranberry' }} />
            <Value name="fruit3" />
          </p>
          <p>
            <Label name="multi">Multi</Label>
            <Select name="multi" multiple initial={['A', 'B']} options={{ A: 'Apple', B: 'Banana', C: 'Cranberry' }} />
            <Value name="multi" />
          </p>
          <p>
            <Label name="message">Message:</Label>
            <Textarea name="message" placeholder="Hello" />
            <Value name="message" />
          </p>

          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </Form>

        <pre>{JSON.stringify(this.state.formData, null, 2)}</pre>
      </div>
    )
  }
}
