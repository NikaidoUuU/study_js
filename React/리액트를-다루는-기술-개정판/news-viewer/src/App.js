import React, { useState, useCallback } from "react";
import { Route } from "react-router-dom";
import NewsPage from "./pages/NewsPage";

const App = () => <Route path="/:category?" component={NewsPage} />;

export default App;
