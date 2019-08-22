import React from "react";
import ReactDOM from "react-dom";

import Layout from "./components/Layout";

const app = document.getElementById( "app" );
// this will attach any event handlers we had in our react app
ReactDOM.hydrate( <Layout />, app );
