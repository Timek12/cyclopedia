import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header";
import CycloPediaClassPage from "./CyclOpediaClassPage";
import CycloPediaFuncPage from "./CyclOpediaFuncPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <Header />
    <div className="row text-white">
      <div className="col-6">
        <span className="h1 text-warning text-center">Class Component</span>
        <CycloPediaClassPage />
      </div>
      <div className="col-6">
        <span className="h1 text-warning text-center">Func Component</span>
        <CycloPediaFuncPage />
      </div>
    </div>
  </div>
);
