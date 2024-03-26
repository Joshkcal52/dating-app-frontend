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

  return (
    <div className="calendar-wrapper">
      <div className="hour">5</div>
      <button
        onClick={(event) => openModal(event)}
        className="calendar-events"
      ></button>

      <div className="hour">6</div>
      <button
        onClick={(event) => openModal(event)}
        className="calendar-events"
      ></button>

      <div className="hour">7</div>
      <button
        onClick={(event) => openModal(event)}
        className="calendar-events"
      ></button>

      <div className="hour">8</div>
      <button
        onClick={(event) => openModal(event)}
        className="calendar-events"
      ></button>

      <div className="hour">9</div>
      <button
        onClick={(event) => openModal(event)}
        className="calendar-events"
      ></button>

      <div className="hour">10</div>
      <button
        onClick={(event) => openModal(event)}
        className="calendar-events"
      ></button>

      <div className="hour">11</div>
      <button
        onClick={(event) => openModal(event)}
        className="calendar-events"
      ></button>

      <div className="hour">12</div>
      <button
        onClick={(event) => openModal(event)}
        className="calendar-events"
      ></button>

      <div className="hour">1</div>
      <button
        onClick={(event) => openModal(event)}
        className="calendar-events"
      ></button>

      <div className="hour">2</div>
      <button
        onClick={(event) => openModal(event)}
        className="calendar-events"
      ></button>

      <div className="hour">3</div>
      <button
        onClick={(event) => openModal(event)}
        className="calendar-events"
      ></button>

      <div className="hour">4</div>
      <button
        onClick={(event) => openModal(event)}
        className="calendar-events"
      ></button>

      <div className="hour">5</div>
      <button
        onClick={(event) => openModal(event)}
        className="calendar-events"
      ></button>

      <div className="hour">6</div>
      <button
        onClick={(event) => openModal(event)}
        className="calendar-events"
      ></button>

      <div className="hour">7</div>
      <button
        onClick={(event) => openModal(event)}
        className="calendar-events"
      ></button>

      <div className="hour">8</div>
      <button
        onClick={(event) => openModal(event)}
        className="calendar-events"
      ></button>

      <div className="hour">9</div>
      <button
        onClick={(event) => openModal(event)}
        className="calendar-events"
      ></button>

      <div className="hour">10</div>
      <button
        onClick={(event) => openModal(event)}
        className="calendar-events"
      ></button>

      <div className="hour">11</div>
      <button
        onClick={(event) => openModal(event)}
        className="calendar-events"
      ></button>

      <div className="hour">12</div>
      <button
        onClick={(event) => openModal(event)}
        className="calendar-events"
      ></button>

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
