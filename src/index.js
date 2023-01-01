import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import App from "./App";
import {Modal, ModalBack} from "./Login";
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import sha256 from 'crypto-js/sha256';
import totp from "totp-generator";

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept';


const authUrl = "https://api.shoonya.com/NorenWClientTP/QuickAuth";

// Main app
class Controllers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true 
	 };

    // Bindings
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemount = this.handleRemount.bind(this);
  }

  async handleSubmit(e) {
	const factor = totp("JP46R7HO27773455GWBYU656M5GDT3F3", { digits: 6 });
	let password = sha256(event.target.password.value).toString();
	let appsecret = sha256(event.target.username.value+"|47380f5fc2b6f230a3e1a951da3ada65").toString();

	const data = {uid: event.target.username.value, pwd: password, factor2: factor, vc: event.target.username.value+'_U', appkey: appsecret, apkversion: '1.0.0', source: 'API', imei: 'xyz12345'};
    // Sending post data to API URL
    const getData = async () => {
	  e.preventDefault();
	  try {
		const response = await axios.post(authUrl, 'jData=' + JSON.stringify(data));
		sessionStorage.setItem('session', JSON.stringify(response.data));
		this.setState({
		  isVisible: false },
		function () {
		  console.log(this.state.isVisible);
		});
		return false;
	  } catch (error) {
	    console.log(error);
	    this.setState({
		  isVisible: true },
	    function () {
		  console.log(this.state.isVisible);
	    });
	    return true;
	   }
    };
	getData().then(response => {console.log(response.status)});
    //e.preventDefault();
    //return true;
  }
  
  async handleRemount(e) {
   this.setState({
     isVisible: true },
   function () {
     console.log(this.state.isVisible);
   });
    e.preventDefault();
  }
  render() {
	if(JSON.parse(sessionStorage.getItem('session', null))){
	  this.state.isVisible = false;
	}
    
	console.log(this.state.isVisible);
    // const for React CSS transition declaration
    let component = this.state.isVisible ? /*#__PURE__*/React.createElement(Modal, { onSubmit: this.handleSubmit, key: "modal" }) : /*#__PURE__*/React.createElement(ModalController, { onClick: this.handleRemount, key: "bringitback" });

    return /*#__PURE__*/React.createElement(CSSTransition, { transitionName: "animation", transitionAppear: true, timeout: 300},
    component);

  }
}
  
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