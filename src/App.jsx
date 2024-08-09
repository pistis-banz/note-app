import { useEffect, useState } from "react";
import Note from "./components/Note";

function App() {
  const [Notes, setNotes] = useState([]);
  let newNote = {};

  useEffect(() => {
    let savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes && savedNotes !== null && !savedNotes.length == 0) {
      console.table(JSON.parse(localStorage.getItem("notes")));
      setNotes(savedNotes);
      console.log("savednotes" + " " + console.table(Notes));
      console.log("success");
    } else {
      console.log("notes null");
      // setNotes([]);
    }
  }, []);

  // const loading = () => {
  //   const savedNotes = localStorage.getItem("notes");
  //   setNotes(savedNotes ? JSON.parse(savedNotes) : []);
  // };

  // // Enregistrement des notes dans la variable Notes
  // useEffect(() => {
  //   loading();
  // }, []);

  // // Mettre à jour le localStorage à chaque changement de Notes
  // useEffect(() => {
  //   localStorage.setItem("notes", JSON.stringify(Notes));
  // }, [Notes]);

  // // Gestion du formulaire de saisie
  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   const newNote = {
  //     id: Math.random().toString(36).substring(7),
  //     title: event.target.title.value,
  //     text: event.target.text.value,
  //   };

  //   setNotes((prevNotes) => [...prevNotes, newNote]);

  //   // Réinitialisation des champs du formulaire
  //   event.target.title.value = "";
  //   event.target.text.value = "";
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (event.target.title.value === "" || event.target.text.value === "") {
      console.log("Vous devez remplir les champs");
      return;
    } else {
      newNote = {
        id: Math.random().toString(36).substring(7),
        title: event.target.title.value,
        text: event.target.text.value,
      };
      setNotes((prevNotes) => [...prevNotes, newNote]);

      // Réinitialisation des champs du formulaire
      event.target.title.value = "";
      event.target.text.value = "";
    }
  };

  useEffect(() => {
    console.table(Notes);
    localStorage.setItem("notes", JSON.stringify(Notes));
  }, [Notes]);

  return (
    <>
      <main className="grid w-full h-screen text-white grid-cols-[320px_1fr] grid-rows-[40px_1fr_40px] bg-gray-900">
        <header className="inset-0 col-span-2 p-2 font-bold theme-color">
          <h1 className="bold">NOTE APP</h1>
        </header>
        <section className="h-full col-span-1 m-3 bg-gray-800 rounded-md shadow-md shadow-gray-800/40">
          <header className="inset-0 w-full h-9 rounded-t-md theme-color"></header>
          <form
            className="flex flex-col gap-4 p-3 m-3 border-2 border-gray-700 rounded-md"
            onSubmit={handleSubmit}
          >
            <label htmlFor="title">titre </label>
            <input
              className="p-2 bg-gray-800 border-2 border-gray-700 rounded-md outline-green-300"
              type="text"
              name="title"
              id="title"
            />
            <label htmlFor="text">texte </label>
            <textarea
              className="p-2 bg-gray-800 border-2 border-gray-700 rounded-md outline-green-300"
              name="text"
              id="text"
            />
            <input
              type="submit"
              className="px-4 py-2 rounded-md theme-color hover:bg-green-500 active:bg-green-700"
              value="sauvegarder"
            />
          </form>
        </section>
        <section className="grid h-full grid-flow-row grid-cols-3 col-span-1 gap-5 p-4 m-3 overflow-y-scroll border-2 border-gray-800 rounded-md">
          {Notes.length === 0 ? (
            <div className="text-4xl text-center">Aucune note</div>
          ) : (
            Notes.map((note) => (
              <Note key={note.id} title={note.title} text={note.text} />
            ))
          )}
        </section>
      </main>
    </>
  );
}

export default App;
