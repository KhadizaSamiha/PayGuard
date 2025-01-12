const Loader = () => {
  return (
    <div className="flex flex-row gap-2 items-center justify-center mt-72">
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-0.5s]"></div>
    </div>
  );
};

export default Loader;
