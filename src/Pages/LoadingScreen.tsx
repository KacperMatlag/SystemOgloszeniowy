const LoadingScreen: React.FC = () => {
  return (
    <div
      className="w-100 top-0 d-flex align-items-center justify-content-center"
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        zIndex: "100",
      }}
    >
      <img
        src="https://media.tenor.com/Gv1cMkqev0wAAAAC/anime-confused.gif"
        style={{ objectFit: "cover" }}
        alt=""
        className="m-auto w-100 h-100"
      />
    </div>
  );
};

export default LoadingScreen;
