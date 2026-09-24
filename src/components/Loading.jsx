function Loading({ text = "Loading..." }) {
  return (
    <div className="loading-container">
      <div className="loader"></div>

      <p>{text}</p>
    </div>
  );
}

export default Loading;