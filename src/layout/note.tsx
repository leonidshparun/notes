import React from "react";

const Note = () => <section className="bg-red-400 flex flex-col flex-grow">
    <header className="flex items-center p-4 h-10 bg-purple-600">
        <button className="p-1">Toggle sidebar</button>
        
        <button className="ml-auto p-1">Insert checklist</button>
        <button className="p-1">Trash</button>
        <button className="p-1">Info</button>
    </header>
    <article>
        Note
    </article>
    <footer className="mt-auto bg-green-400">
        Tags
    </footer>
</section>;

export default Note;
