import React, { useEffect } from "react";
import "./NavbarDesign.css";
import gsap from "gsap";
import HomePageContent from "../Home/HomePageContent";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function Navbar() {
  useEffect(() => {
    gsap.from(".mynav", {
      opacity: 0,
      marginLeft: "-200",
      marginTop: "-200",
      duration: 1,
    });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/*">
            <HomePageContent />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Navbar;
