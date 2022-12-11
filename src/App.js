import React, { useRef, useState, useEffect, useCallback } from "react";
import ReactDOM from 'react-dom';
import "./styles.css";
import { Workbook } from "@fortune-sheet/react";
import "@fortune-sheet/react/dist/index.css"
import { produce } from "immer";
import { Sheet } from "@fortune-sheet/core";



const settings =  [
{
    name: "Terminal",
    id: 0,
    status: 1,
	defaultRowHeight: 20,
	scrollLeft: 0,
	column: 25,
	row: 20,
	config: {rowlen: {"0": 50},columnlen:{"0":150,"3":130,"0":150,"6":100,"14":130,"19":130,"13":80,"10":100},colhidden: {"4": 0,"5": 0,"5": 0,"11": 0,"12": 0,"15": 0,"16": 0,"17": 0,"18": 0}},
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
		]
  },
  {
	"name": "Sheet3",
	"color": "",
	"id": "2",
	"status": 0,
	"order": 2,
	"celldata": [],
	"config": {},
  }
 ];

const App = () => {
 const [sheets, setSheets] = useState(settings);
 const workbookRef = useRef(null);
// const [error, setError] = useState(false);
// useEffect(() => {
//   const interval = setInterval(() => {
//     setSheets((prev) => {
//       return produce(prev, (draft) => {
//		   console.log("###########################");
//		   console.log(prev);
//			//prev[0]["data"][1] = prev[0]["data"][0];
//			setSheets(prev);
//       });
//     });
//   }, 1000);
//   return () => clearInterval(interval);
// }, []);

  const onChange = useCallback((prev: Sheet[]) => {
	console.log(workbookRef.current?.getCellValue(0, 0))
	console.log(Math.random());
	workbookRef.current?.setCellValue(2, 2, "=A1");
	setSheets(prev);
  }, []);
 
  
  return <div id="root"><Workbook  ref={workbookRef} data={settings} onChange={onChange} /></div>;
};

export default App;
