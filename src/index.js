import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ExpenseContext from './context/Context';
import {SpeechProvider} from "@speechly/react-client"
ReactDOM.render(
    <SpeechProvider appId="568554c5-eda6-4b84-b103-3178f8b801cc" language='en-US'>
<ExpenseContext>
<App/>
</ExpenseContext>
    </SpeechProvider>

,document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
