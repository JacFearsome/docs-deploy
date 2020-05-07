import React from "react";
import MarkdownPage from "./components/MarkdownPage";
import ConfigPage from "./components/ConfigPage";
import { BrowserRouter as Router, Route } from "react-router-dom";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={MarkdownPage} />
        <Route exact path="/config" component={ConfigPage} />
      </div>
    </Router>
  );
};
