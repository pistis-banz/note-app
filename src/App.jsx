import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Note from "./components/Note";

function App() {
  const [Notes, setNotes] = useState([]);
  let newNote = {};

  const printNotes = () => {
    if (Notes.length === 0) {
      return <div className="text-4xl text-center">Aucune note</div>;
    } else {
      return Notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          text={note.text}
          handleDeleteNote={handleDeleteNote}
        />
      ));
    }
  };

  useEffect(() => {
    let savedNotes = JSON.parse(localStorage.getItem("notes"));

    if (savedNotes && savedNotes !== null && !savedNotes.length == 0) {
      setNotes(savedNotes);
    } else {
      console.log("Pas de notes sauvegardées");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (event.target.title.value === "" || event.target.text.value === "") {
      return toast.error("Vous devez remplir les champs", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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

      toast.success("Notes sauvegardées", {
        position: "top-right",
        autoClose: 750,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleDeleteNote = (index) => {
    console.log("test" + " " + index);
    setNotes((curr) => curr.filter((note) => note.id !== index));

    toast.error("Note supprimée", {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    console.table(Notes);
    localStorage.setItem("notes", JSON.stringify(Notes));
    console.log("mise à jour des notes");
  }, [Notes]);

  return (
    <>
      <ToastContainer />
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
          {printNotes()}
        </section>
      </main>
    </>
  );
}

export default App;
