import express from "express";
import path from "path";
import { StaticRouter } from "react-router-dom";
import React from "react";
import { renderToString } from "react-dom/server";
import Layout from "./components/Layout";

const app = express();

// serves static files to the client
app.use( express.static( path.resolve( __dirname, "../dist" ) ) );

// at all routes

app.get( "/*", ( req, res ) => {
    const context = { };
    const jsx = (
        <StaticRouter context={ context } location={ req.url }>
            <Layout />
        </StaticRouter>
    );
    const reactDom = renderToString( jsx );

    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end( htmlTemplate( reactDom ) );
} );

app.listen( 2048 );

function htmlTemplate( reactDom ) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>React SSR</title>
        </head>
        
        <body>
            <div id="app">${ reactDom }</div>
            <script src="./app.bundle.js"></script>
        </body>
        </html>
    `;
}

// app.get( "/*", ( req, res ) => {
//     // layout is just a single page with a h1 tag as welcome to React SSR
//     const jsx = ( <Layout /> );
//     // this is converted to a string https://reactjs.org/docs/react-dom-server.html#rendertostring
//     // this method generates HTML on the server
//     const reactDom = renderToString( jsx );

//     // you have to write the headers (settings for the information you are sending)
//     // all we are doing is generating the final html code that will be used on the server
//     // so when this is sent to the client it just needs to use the sent HTML
//     res.writeHead( 200, { "Content-Type": "text/html" } );
//     // put the JSX code into the HTML template and send it to the client.
//     res.end( htmlTemplate( reactDom ) );
// } );
