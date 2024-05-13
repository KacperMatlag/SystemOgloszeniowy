import React from "react";
import "../CSS/PagesCSS/NotFound.css";
import { useNavigate } from "react-router-dom";
const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex align-items-center justify-content-center flex-column notFoundContainer">
      <h4>404</h4>
      <p>Zasób którego szukasz najprawdopodobniej nie istnieje</p>
      <button
        className="btn btn-primary backBtn"
        onClick={() => {
          navigate("/");
        }}
      >
        Wróć na stronę głowną
      </button>
    </div>
  );
};
export default NotFound;
