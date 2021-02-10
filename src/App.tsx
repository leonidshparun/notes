import List from "layout/list";
import Navigation from "layout/navigation";
import Note from "layout/note";
import React from "react";
import "./App.css";

function App() {
  return (
    <main className="bg-blue-300 h-screen flex flex-grow flex-row box-border">
      <Navigation />
      <List />
      <Note />
    </main>
  );
}

export default App;
