# Demo app for react-isomorphic-form

This is an example app using react-isomorphic-form with React Router. It
demonstrates how react-isomorphic-form can render server-side and be enhanced
client-side.

The client-side JavaScript is intentionally slow to load (it's recompiled on
each request) in order to demonstrate the form's functionality while loading.
You should be able to input data while the page is still loading, and the form
should retain those values when JavaScript kicks in.<sup id="a1">[1](#f1)</sup>

<sup id="f1">[1](#a1)</sup> Due to an issue in React, this doesn't work for
textareas.
