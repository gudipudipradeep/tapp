import React, { useRef, useState, useEffect, useCallback } from "react";
import ReactDOM from 'react-dom';
import "./styles.css";
import { Workbook } from "@fortune-sheet/react";
import "@fortune-sheet/react/dist/index.css"
import { produce } from "immer";
import { Sheet, Op, colors } from "@fortune-sheet/core";
import axios from 'axios';

const tappUrl = "https://api.shoonya.com/NorenWClientTP/";
const settings =  [
{
    name: "Terminal",
    id: 0,
    status: 1,
	defaultRowHeight: 20,
	scrollLeft: 0,
	addRows: 1,
	config: {rowlen: {"0": 50},columnlen:{"0":150,"3":130,"0":150,"6":100,"14":130,"19":130,"13":80,"10":100},colhidden: {"4": 0,"5": 0,"5": 0,"11": 0,"12": 0,"15": 0,"16": 0,"17": 0,"18": 0,"20": 0,"21": 0}},
    celldata: [ {"r": 0,"c": 0,"v": {ct: {fa: "General", t: "g"},m:"Nameofthescript",v:"Name of the script","bg": "#858a7e","ht":"0"},},
			{"r": 0,"c": 1,"v": {ct: {fa: "General", t: "g"},m:"BuyRate",v:"Buy Rate","bg": "#00ff00","ht":"0"},},
			{"r": 0,"c": 2,"v": {ct: {fa: "General", t: "g"},m:"Quantity",v:"Quantity","bg": "#00ff00","ht":"0"},},
			{"r": 0,"c": 3,"v": {ct: {fa: "General", t: "g"},m:"TotalPurchaseValue",v:"Total Purchase Value","bg": "#00ff00","ht":"0"},},
			{"r": 0,"c": 4,"v": {ct: {fa: "General", t: "g"},m:"Brokerage",v:"Brokerage","bg": "#fff000","ht":"0"},},
			{"r": 0,"c": 5,"v": {ct: {fa: "General", t: "g"},m:"Service Tax on Brokerage",v:"Service Tax on Brokerage","bg": "#fff000","ht":"0"},},
			{"r": 0,"c": 6,"v": {ct: {fa: "General", t: "g"},m:"Purchase Value",v:"Purchase Value","bg": "#00ff00","ht":"0"},},
			{"r": 0,"c": 7,"v": {ct: {fa: "General", t: "g"},m:"Price",v:"Price","bg": "#ffa500","ht":"0"},},
			{"r": 0,"c": 8,"v": {ct: {fa: "General", t: "g"},m:"SaleRate",v:"Sale Rate","bg": "#ff0000","ht":"0"},},
			{"r": 0,"c": 9,"v": {ct: {fa: "General", t: "g"},m:"SaleQty",v:"Sale Qty","bg": "#ff0000","ht":"0"},},
			{"r": 0,"c": 10,"v": {ct: {fa: "General", t: "g"},m:"GrossSaleValue",v:"Gross Sale Value","bg": "#ff0000","ht":"0"},},
			{"r": 0,"c": 11,"v": {ct: {fa: "General", t: "g"},m:"Brokerage",v:"Brokerage","bg": "#fff000","ht":"0"},},
			{"r": 0,"c": 12,"v": {ct: {fa: "General", t: "g"},m:"ServiceTaxonBrokerage",v:"Service Tax on Brokerage","bg": "#fff000","ht":"0"},},
			{"r": 0,"c": 13,"v": {ct: {fa: "General", t: "g"},m:"SaleValue",v:"Sale Value","bg": "#ff0000","ht":"0"},},
			{"r": 0,"c": 14,"v": {ct: {fa: "General", t: "g"},m:"GrossProfit/Loss",v:"Gross Profit/Loss","bg": "#0096ff","ht":"0"},},
			{"r": 0,"c": 15,"v": {ct: {fa: "General", t: "g"},m:"STT",v:"STT","bg": "#fff000","ht":"0"},},
			{"r": 0,"c": 16,"v": {ct: {fa: "General", t: "g"},m:"StampDutyCharges",v:"Stamp Duty Charges","bg": "#fff000","ht":"0"},},
			{"r": 0,"c": 17,"v": {ct: {fa: "General", t: "g"},m:"TransactionCharges",v:"Transaction Charges","bg": "#fff000","ht":"0"},},
			{"r": 0,"c": 18,"v": {ct: {fa: "General", t: "g"},m:"ServiceTax",v:"Service Tax","bg": "#fff000","ht":"0"},},
			{"r": 0,"c": 19,"v": {ct: {fa: "General", t: "g"},m:"NetProfit/Loss",v:"Net Profit/Loss","bg": "#0096ff","ht":"0"},},
			{"r": 0,"c": 20,"v": {ct: {fa: "General", t: "g"},m:"BUYOrderID",v:"BUY Order ID","bg": "#FFFF00","ht":"0"},},
			{"r": 0,"c": 21,"v": {ct: {fa: "General", t: "g"},m:"SELLOrderID",v:"BUY Order ID","bg": "#FFFF00","ht":"0"},},
		]
  },
  {
	"name": "Calculation",
	"color": "",
	"id": "2",
	"status": 0,
	"order": 2,
	"celldata": [],
	"config": {},
  },
  {
	"name": "General",
	"color": "",
	"id": "3",
	"status": 0,
	"order": 2,
	"celldata": [],
	"config": {},
  }
 ];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.workbookRef = React.createRef();;
    this.lastSelection = React.createRef();
    this.wsRef = React.createRef();
	this.onChange = this.onChange.bind(this);
	this.onOp = this.onOp.bind(this);
	this.state = {data: settings};
	this.session_data = JSON.parse(sessionStorage.getItem('session', null));
  }	
//  const session_data = JSON.parse(sessionStorage.getItem('session', null));
//  axios.post(tappUrl+"PositionBook", 'jData='+JSON.stringify({"uid":session_data["uid"], "actid": session_data["actid"]})+'&jKey='+session_data["susertoken"])
//  .then((res) => {
//	for (let i = 0; i < res.length; i++) {
//	  settings[0]["celldata"].push({"r": i+1,"c": 0,"v": {ct: {fa: "General", t: "g"},m:"Nameofthescript",v:res[i]["tsym"],"ht":"0"},});
//	}
//  }).catch((err) => {
//	console.error(err);
//	return true; 
//  });


// console.log("***********************************");
// const [data, setData] = useState(settings);
// const workbookRef = useRef(null);
// const lastSelection = useRef();
// const [error, setError] = useState(false);
// useEffect(() => {
//  const interval = setInterval(() => {
//    setData((prev) => {
//      return produce(prev, (draft) => {
//		   console.log("###########################");
//		   //console.log(draft[0]["data"]);
//		   //prev[0]["data"][1] = prev[0]["data"][0];
//      });
//    });
//  }, 1000);
//  return () => clearInterval(interval);
// }, []);
//
// 
  async componentDidMount() {  
	console.log("componentDidMountcomponentDidMount");
  };
  
  async componentDidUpdate(prevProps) {
	console.log("componentDidUpdatecomponentDidUpdate");
  }; 
  
  async onOp(op: Op[]){
    console.log(JSON.stringify({ req: "op", data: op }));
  };

  async onChange(prev: Sheet[]){
 	this.setState({ data: prev});
  }
  
  render() {
	return (<div id="root"><Workbook  data={this.state.data} row={10} column={22} addRows={10} ref={this.workbookRef} onChange={this.onChange} onOp={this.onOp}/></div>);
  } 
}

export default App;
