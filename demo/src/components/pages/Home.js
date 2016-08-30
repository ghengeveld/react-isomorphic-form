/* eslint-disable no-console */

import React from 'react'
import {
  Form,
  Input,
  Label,
  Value,
  Checkbox,
  Radio,
  Select,
  Textarea,
} from '../../../../src'

import Nav from '../Nav'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = { formData: {}, responseData: undefined }
    this.beforeSubmit = this.beforeSubmit.bind(this)
    this.handleSuccess = this.handleSuccess.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  beforeSubmit(data) {
    console.log(data)
    return data
  }
  handleSuccess(response) {
    response.json().then(data => this.setState({ responseData: data }))
  }
  handleChange(change, getFormData) {
    this.setState({ formData: getFormData() })
  }
  render() {
    return (
      <div>
        <Nav />
        <h1>Home</h1>

        <div className="row">
          <div className="col-xs-8">
            <Form
              name="subscribe" action="/subscribe" method="post"
              onInit={this.handleChange}
              onChange={this.handleChange}
              beforeSubmit={this.beforeSubmit}
              onSuccess={this.handleSuccess}
            >
              <div className="form-group">
                <Label name="email" className="control-label">Email:</Label>
                <Input name="email" placeholder="you@example.com" initial="foo" className="form-control" />
                <Value name="email" className="help-block" />
              </div>
              <div className="form-group">
                <Label name="range" className="control-label">Rating:</Label>
                <Input name="range" type="range" />
                <Value name="range" className="help-block" />
              </div>
              <div className="form-group">
                <Label name="newsletter">
                  <Checkbox name="newsletter" /> Receive newsletter
                </Label>
                <Value name="newsletter" className="help-block" />
              </div>
              <div className="form-group">
                <Label name="gender_male">
                  <Radio name="gender" value="male" initial="male" /> Male
                </Label>
                <Label name="gender_female">
                  <Radio name="gender" value="female" initial="male" /> Female
                </Label>
                <Value name="gender" className="help-block" />
              </div>
              <div className="form-group">
                <Label name="fruit1" className="control-label">Fruit 1</Label>
                <Select name="fruit1" initial="B" className="form-control">
                  <option value="A">Apple</option>
                  <option value="B">Banana</option>
                  <option value="C">Cranberry</option>
                </Select>
                <Value name="fruit1" className="help-block" />
              </div>
              <div className="form-group">
                <Label name="fruit2" className="control-label">Fruit 2</Label>
                <Select
                  name="fruit2" className="form-control" initial="Banana"
                  options={['Apple', 'Banana', 'Cranberry']}
                />
                <Value name="fruit2" className="help-block" />
              </div>
              <div className="form-group">
                <Label name="fruit3" className="control-label">Fruit 3</Label>
                <Select
                  name="fruit3" className="form-control" initial="B"
                  options={{ A: 'Apple', B: 'Banana', C: 'Cranberry' }}
                />
                <Value name="fruit3" className="help-block" />
              </div>
              <div className="form-group">
                <Label name="multi" className="control-label">Multi</Label>
                <Select
                  name="multi" className="form-control" multiple initial={['A', 'B']}
                  options={{ A: 'Apple', B: 'Banana', C: 'Cranberry' }}
                />
                <Value name="multi" className="help-block" />
              </div>
              <div className="form-group">
                <Label name="message" className="control-label">Message:</Label>
                <Textarea name="message" className="form-control" placeholder="Hello" />
                <Value name="message" className="help-block" />
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>
              <button type="reset" className="btn btn-link">Reset</button>
            </Form>
          </div>
          <div className="col-xs-4">
            <h4>Form data:</h4>
            <pre>{JSON.stringify(this.state.formData, null, 2)}</pre>
            <h4>Response data:</h4>
            <pre>{JSON.stringify(this.state.responseData, null, 2)}</pre>
          </div>
        </div>
      </div>
    )
  }
}
