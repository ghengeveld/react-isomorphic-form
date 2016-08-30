# react-isomorphic-form

[![npm version][npm shield]][npm url]
[![Build status][travis shield]][travis url]

`react-isomorphic-form` is a set of React components that allow you to easily
create isomorphic forms in React. An isomorphic form is initially rendered on
the server (with ReactDOMServer.renderToString), providing full functionality
even when JavaScript is not (yet) loaded on the client. Once JavaScript is
loaded, the form is enhanced to provide richer interactivity.
`react-isomorphic-form` works well with React Router, which also supports
isomorphism (e.g. its Link component does).

> **Don't you mean "universal"?**
>
> Yes and no. The components provided by `react-isomorphic-form` are universal
> in the sense that their source code is suitable to be executed both client-
> and server-side. However that is not the goal of this project. The goal is to
> provide a seamless transition from server-rendered HTML to client-rendered
> DOM without losing state, which is [what we call isomorphism][isomorphism].

[npm shield]: https://img.shields.io/npm/v/react-isomorphic-form.svg
[npm url]: https://www.npmjs.com/package/react-isomorphic-form
[travis shield]: https://travis-ci.org/ghengeveld/react-isomorphic-form.svg?branch=master
[travis url]: https://travis-ci.org/ghengeveld/react-isomorphic-form
[isomorphism]: https://medium.com/@ghengeveld/isomorphism-vs-universal-javascript-4b47fb481beb

## Installation

```shell
npm install --save react-isomorphic-form
```

## How it works

Forms created with `react-isomorphic-form` use native HTML form behavior by
default. This means they will work even without client-side JavaScript. When
JavaScript is loaded, `react-isomorphic-form` will replace this behavior with
an asynchronous request using the fetch API and send data as JSON.
`react-isomorphic-form` also makes sure any input that was done before JavaScript
kicked in is not lost, which is important especially on a slow (mobile)
connection. Here's how the process works:

1. The server renders regular HTML form elements that will work even without
   client-side JavaScript.
2. When client-side JavaScript kicks in, `react-isomorphic-form` initializes
   its internal state, making sure any data entered thus far (while JavaScript
   was loading) is retained. From now on, we're dealing with controlled React
   components.
3. Form reset and submit events are handled by `react-isomorphic-form.` Client-
   side form submissions are done asynchronously.

The fetch API is not natively supported in all browsers. If the browser does
not support fetch, `react-isomorphic-form` will fall back to a regular HTML
form submission (including page transition). You can avoid this by providing a
polyfill.

## Example

Check out the [demo app](demo) for a more elaborate example using React Router.

```js
import { Form, Input, Label } from 'react-isomorphic-form'

<Form name="subscribe" action="/subscribe" method="post">
  <div>
    <Label name="email">Your email address:</Label>
    <Input name="email" type="email" placeholder="you@example.com" initial={email} />
  </div>
  <button type="submit">Subscribe</button>
</Form>
```

`react-isomorphic-form` provides a set of React components, each of which is a
thin wrapper around a native HTML form (input) element. Any custom props
provided to a component are passed on to the underlying HTML element, so you
can provide your own styling and other attributes (e.g. placeholder).

We start our form with the `Form` component. `Form` requires a `name`, `action`
and `method` and renders a `<form>` element with the same attributes. `action`
should be a valid endpoint as it will be used to submit the form.

`Label` renders a `<label>` as you would expect, but you don't have to provide
the `htmlFor` attribute. This will automatically be generated based on the
`name` prop and the `name` of the containing Form. In the example above, the
label will point to 'subscribe_email' and the Input will receive an id with
that value.

`Input` renders an `<input>` element. As with all components, you can provide
custom props and they will be passed on to the underlying HTML element. You can
even provide `ref` and `onChange` and they will behave as normal. `Input` can
also take an `initial` value, which will be used server-side to set the value
and client-side to reset the form.

## Components

There's three types of components in react-isomorphic-form: container, inputs
and helpers:

Container:
- `Form`: wrapper for `<form>`, maintains full state and handles submit/reset

Inputs:
- `Input`: wrapper for `<input>`
- `Select`: wrapper for `<select>`
- `Checkbox`: wrapper for `<input type="checkbox">`
- `Radio`: wrapper for `<input type="radio">`
- `Textarea`: wrapper for `<textarea>`

Helpers:
- `Label`: wrapper for `<label>`, binds to related input
- `Value`: wrapper for `<span>`, prints current value of a field
