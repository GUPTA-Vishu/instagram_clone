import React, { useContext } from "react";
import "./Modal.css";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

const Modal = () => {
  const { setModalOpen } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {
    // Perform logout functionality
    // For now, just closing the modal and navigating to sign-in page
    setModalOpen(false);
    localStorage.clear();
    navigate("/signin"); // Navigate to the sign-in page
  };

  return (
    <div className="modal">
      <div className="modalHeader">
        <h5 className="heading">Are you sure you want to logout</h5>
        <button className="cross-button" onClick={handleCloseModal}>
          X
        </button>
      </div>
      <div className="modalActions">
        <button className="logoutBtn" onClick={handleLogout}>
          Logout
        </button>
        <button className="cancelBtn" onClick={handleCloseModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
