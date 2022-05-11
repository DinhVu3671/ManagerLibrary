import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import dotenv from "dotenv";
import { Auth0Provider } from "@auth0/auth0-react";


dotenv.config();
function App() {
  return (
    <div>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirectUri="http://localhost:3000/admin"
      >
      <div>
        <Navbar />
      </div>
      </Auth0Provider>
    </div>
  );
}

export default App;
