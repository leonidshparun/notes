import React from "react";

const Navigation = () => (
  <nav className="bg-green-500 w-60 flex flex-col pt-10">
    <ul className="bg-yellow-300">
      <li className="p-2  h-10">All Notes</li>
      <li className="p-2  h-10">Trash</li>
      <li className="p-2  h-10">Settings</li>
    </ul>

    <div className="">
      <p className="p-2">Tags</p>
      <ul className="">
        <li className="p-2">tag</li>
        <li className="p-2">tag2</li>
      </ul>
    </div>

    <footer className="flex mt-auto bg-indigo-500">links</footer>
  </nav>
);

export default Navigation;
