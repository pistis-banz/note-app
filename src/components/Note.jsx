export default function Note({ title, text }) {
  return (
    <div className="flex flex-col justify-start max-w-sm bg-gray-800 rounded-md shadow-md shadow-gray-800/60">
      <h3 className="flex justify-between w-full p-3 border-b-2 border-gray-700 rounded-t-md theme-color">
        <div>{title}</div>
        <div>
          <i className="text-2xl uis uis-times-circle"></i>
        </div>
      </h3>
      <div className="p-4">{text} </div>
    </div>
  );
}
