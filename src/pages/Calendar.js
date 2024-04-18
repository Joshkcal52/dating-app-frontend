import React, { useState, useEffect } from "react";
import "../styles/Calendar.scss";

const Calendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (event) => {
    console.log("Opening modal");
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isModalOpen && !event.target.closest(".modal-content")) {
        closeModal();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isModalOpen]);

  // Generate hours dynamically
  const hours = [];
  for (let i = 5; i <= 12; i++) {
    hours.push(
      <React.Fragment key={i}>
        <div className="hour">{i}</div>
        <button
          onClick={(event) => openModal(event)}
          className="calendar-events"
        ></button>
      </React.Fragment>
    );
  }

  return (
    <div className="calendar-wrapper">
      {hours}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            {/* Close button in the modal */}
            <div className="close" onClick={closeModal}>
              &times;
            </div>
            <div>This is your modal content.</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
