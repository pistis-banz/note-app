export default function Note({ id, title, text, handleDeleteNote }) {
  return (
    <div className="flex flex-col justify-start flex-shrink w-64 h-64 overflow-y-hidden bg-gray-800 rounded-md shadow-md shadow-gray-800/60">
      <h3 className="flex justify-between w-full p-3 border-b-2 border-gray-700 rounded-t-md theme-color">
        <div className="text-base truncate">{title}</div>
        <div>
          <i
            onClick={() => handleDeleteNote(id)}
            className="text-2xl cursor-pointer uis uis-times-circle"
          ></i>
        </div>
      </h3>
      <div className="flex-grow flex-shrink p-4">{text} </div>
    </div>
  );
}
