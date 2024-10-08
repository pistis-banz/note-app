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

  // Récupération des notes sauvegardées dans le localStorage

  useEffect(() => {
    let savedNotes = JSON.parse(localStorage.getItem("notes"));

    if (savedNotes && savedNotes !== null && !savedNotes.length == 0) {
      setNotes(savedNotes);
    }
  }, []);

  // Gestion du formulaire de création de notes
  const handleSubmit = (event) => {
    event.preventDefault();

    if (event.target.title.value === "" || event.target.text.value === "") {
      // Affichage d'un message d'erreur si les champs ne sont pas remplis
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
        // Création d'un identifiant unique pour chaque note
        id: Math.random().toString(36).substring(7),
        title: event.target.title.value,
        text: event.target.text.value,
      };
      // Ajout de la note à la liste des notes
      setNotes((prevNotes) => [...prevNotes, newNote]);

      // Réinitialisation des champs du formulaire
      event.target.title.value = "";
      event.target.text.value = "";

      // Affichage d'un message de succès lorsque la note est créée
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

  // Gestion du bouton de suppression de notes
  const handleDeleteNote = (index) => {
    // Suppression de la note à partir de l'indentifiant spécifié
    setNotes((curr) => curr.filter((note) => note.id !== index));

    // Affichage d'un message lorsque la note est supprimée
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

  // Mise à jour des notes dans le localStorage lorsque les notes sont modifiées
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(Notes));
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
        <section className="flex flex-row flex-wrap content-between justify-center gap-5 p-4 m-3 overflow-y-scroll border-2 border-gray-800 rounded-md items-between">
          {printNotes()}
        </section>
      </main>
    </>
  );
}

export default App;
