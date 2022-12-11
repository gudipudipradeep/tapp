import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import {Modal, ModalBack} from "./Login";
import { CSSTransition } from 'react-transition-group';

// Main app
class Controllers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true };

    // Bindings
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemount = this.handleRemount.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      isVisible: false },
    function () {
      console.log(this.state.isVisible);
    });
    return false;
  }
  handleRemount(e) {
    this.setState({
      isVisible: true },
    function () {
      console.log(this.state.isVisible);
    });
    e.preventDefault();
  }
  render() {

    // const for React CSS transition declaration
    let component = this.state.isVisible ? /*#__PURE__*/React.createElement(Modal, { onSubmit: this.handleSubmit, key: "modal" }) : /*#__PURE__*/React.createElement(ModalController, { onClick: this.handleRemount, key: "bringitback" });

    return /*#__PURE__*/React.createElement(CSSTransition, { transitionName: "animation", transitionAppear: true, timeout: 300},
    component);

  }}
  
// Button to brind the modal back
class ModalController  extends Controllers {
  render() {
	return (
    <React.Fragment>
      
      <App />     
    </React.Fragment>
  )
  }}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <Controllers />
  </React.StrictMode>
);
//ReactDOM.render( /*#__PURE__*/React.createElement(App, null), rootElement);
export default Controllers;