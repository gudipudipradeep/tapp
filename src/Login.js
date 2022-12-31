import React from "react";
import "./style.css";

//const ReactCSSTG = React.addons.CSSTransitionGroup;

// Modal
class Modal extends React.Component {
  constructor() {
    super();
  }
  render() {
    return /*#__PURE__*/React.createElement("div", { className: "Modal" }, /*#__PURE__*/
    React.createElement(Logo, null), /*#__PURE__*/
    React.createElement("form", { onSubmit: this.props.onSubmit, method: 'post'}, /*#__PURE__*/
    React.createElement(Input, { type: "text", name: "username", placeholder: "username" }), /*#__PURE__*/
    React.createElement(Input, { type: "password", name: "password", placeholder: "password" }), /*#__PURE__*/
    React.createElement("button", null, "Sign In")), /*#__PURE__*/

    React.createElement("div", { className: "social-signin" }, /*#__PURE__*/
    React.createElement("button", { className: "fb", onClick: this.props.onClick }, /*#__PURE__*/React.createElement("i", { className: "fa fa-facebook", "aria-hidden": "true" })), /*#__PURE__*/
    React.createElement("button", { className: "tw", onClick: this.props.onClick }, /*#__PURE__*/React.createElement("i", { className: "fa fa-twitter", "aria-hidden": "true" }))), /*#__PURE__*/

    React.createElement("a", { href: "#" }, "Lost your password ?"));

  }}


// Generic input field
class Input extends React.Component {
  constructor() {
    super();
  }
  render() {
    return /*#__PURE__*/React.createElement("div", { className: "Input" }, /*#__PURE__*/
    React.createElement("input", { type: this.props.type, name: this.props.name, placeholder: this.props.placeholder, required: true, autoComplete: "false" }), /*#__PURE__*/
    React.createElement("label", { htmlFor: this.props.name }));

  }}



// Fake logo
class Logo extends React.Component {
  constructor() {
    super();
  }
  render() {
    return /*#__PURE__*/React.createElement("div", { className: "logo" }, /*#__PURE__*/
    React.createElement("i", { className: "fa fa-bug", "aria-hidden": "true" }), /*#__PURE__*/
    React.createElement("span", null, " awesome logo "));

  }}

class ModalBack  extends React.Component { 
  constructor() {
    super();
  }
  render() {
	return React.createElement("button", { className: "bringitback", onClick: this.props.onClick, key: this.props.className }, "Brind the modal back !");
 }} 


export { Modal, ModalBack };