import React from "react";
import MarkdownPage from "./components/MarkdownPage";
import DocutePage from "./components/DocutePage";
import { BrowserRouter as Router, Route } from "react-router-dom";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={MarkdownPage} />
        <Route exact path="/docute" component={DocutePage} />
      </div>
    </Router>
  );
};
