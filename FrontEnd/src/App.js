import React from "react";
import NavbarClt from "./Client/components/NavBarClient";

import Home from "./HomePage/Home";

function App() {
  localStorage.removeItem("authenticatedUser");
  document.cookie="jwt"+'=; Max-Age=-99999999;';
  return (
       <>
         <Home/>
    
      </>
  );
}

export default App;
