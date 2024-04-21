import Navbar from "./components/navbar";
import React, { ReactNode } from "react";
import './globals.css';
import Script from "next/script";

interface Props {
    children?: ReactNode
    // any props that come into the component
}
const Layout = ({children}:Props) => {
  return (   
    <html >
    <body>    
      <Navbar/>
      <main className="home">{children}</main>
    
    <Script src="script.js"/>       
    </body>
    </html>  
  );
}


export default Layout