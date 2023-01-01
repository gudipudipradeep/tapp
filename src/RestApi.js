import React from "react";
import ReactDOM from "react-dom/client";
import axios from 'axios';

const endpoint= "https://api.shoonya.com/NorenWClientTP";
const routes = {
    'authorize': '/QuickAuth',
    'logout': '/Logout',
    'forgot_password': '/ForgotPassword',
    'watchlist_names': '/MWList',
    'watchlist': '/MarketWatch',
    'watchlist_add': '/AddMultiScripsToMW',
    'watchlist_delete': '/DeleteMultiMWScrips',
    'placeorder': '/PlaceOrder',
    'modifyorder': '/ModifyOrder',
    'cancelorder': '/CancelOrder',
    'exitorder': '/ExitSNOOrder',
    'orderbook': '/OrderBook',
    'tradebook': '/TradeBook',          
    'singleorderhistory': '/SingleOrdHist',
    'searchscrip': '/SearchScrip',
    'TPSeries' : '/TPSeries',     
    'optionchain' : '/GetOptionChain',     
    'holdings' : '/Holdings',
    'limits' : '/Limits',
    'positions': '/PositionBook',
    'scripinfo': '/GetSecurityInfo',
    'getquotes': '/GetQuotes',
  };
 
const product_type = {"C":{"buy":"cfbuyavgprc","sell":"cfsellavgprc"}}
  
class RestApi extends React.Component {
  constructor(props){
    super(props);
	let session_data = JSON.parse(sessionStorage.getItem('session', null));
	this.__susertoken = session_data["susertoken"];
    this.__username   = session_data["uid"];
    this.__accountid  = session_data["actid"];
	this.post_request = this.post_request.bind(this);
	this.get_positions = this.get_positions.bind(this);

  }
  
  render() {
	return null;
  } 
  
  post_request(route, params, usertoken = ""){
        let url = RestApi.endpoint + RestApi.routes[route];        
        let payload = 'jData=' + JSON.stringify(params);
        payload = payload + '&jKey=${this.__susertoken}';
        return axios.post(url, payload);        
  }
  
  get_positions(){
      let values          = {};
      values["uid"]       = this.__username;
      values["actid"]     = this.__accountid; 
      let reply = post_request("positions", values, this.__susertoken);
//{"r": 0,"c": 0,"v":{ct: {fa: "General", t: "g"}, m:"Nameofthescript",v:"Name of the script"}},

//{"r": 0,"c": 1,"v":{ct: {fa: "General", t: "n"}, m:"Nameofthescript",v:10}},
//{"r": 0,"c": 2,"v":{ct: {fa: "General", t: "n"}, m:"Nameofthescript",v:10}},
//{"r": 0,"c": 3,"v":{ct: {fa: "General", t: "n"}, m:"Nameofthescript",f: "=B2:C2"}},

//{"r": 0,"c": 8,"v":{ct: {fa: "General", t: "n"}, m:"Nameofthescript",v:10}},
//{"r": 0,"c": 9,"v":{ct: {fa: "General", t: "n"}, m:"Nameofthescript",v:10}},
//{"r": 0,"c": 10,"v":{ct: {fa: "General", t: "g"}, m:"Nameofthescript",f: "=I2*J2"}},
      return reply;
  }
}