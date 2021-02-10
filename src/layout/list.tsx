import React from "react";

const List = () => (
  <section className="bg-blue-500 w-80 flex flex-col">
    <header className="px-4 flex flex-row items-center justify-between h-10 bg-yellow-400">
      <button>toggle nav</button>
      <p>All notes</p>
      <button>add note</button>
    </header>

    <div className="h-10 flex items-center bg-gray-500 px-4">Search</div>

    <ul>
      <li className="bg-green-500 h-24 max-h-40 p-2 flex flex-row items-start">
        <button>pin</button>
        <div className="ml-2">
          <h3>Heading</h3>
          <p>Details</p>
        </div>
      </li>

      <li className="bg-green-500 bg-opacity-60 h-24 max-h-40 p-2 flex flex-row items-start">
        <button>pin</button>
        <div className="ml-2">
          <h3>Heading 2</h3>
          <p>Details 2</p>
        </div>
      </li>
    </ul>

    <footer className="flex mt-auto bg-red-300">Sort by: Created Newest</footer>
  </section>
);

export default List;
