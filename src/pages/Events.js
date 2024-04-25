import React, { useState, useEffect } from "react";

import Cookies from "js-cookie";

import "../styles/Events.scss";

export default function Event() {
  const user_id = Cookies.get("user_id");
  const [eventData, setEventData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalClosed, setModalClosed] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [addEventData, setAddEventData] = useState({
    user_id: user_id,
    title: "",
    start_datetime: "",
    end_datetime: "",
    description: "",
    category_id: "",
  });

  console.log("user_id: ", user_id);
  useEffect(() => {
    fetch("http://localhost:8089/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return console.log("Error while fetching data");
        }
      })
      .then((data) => {
        if (data) {
          console.log("data: ", data.events);
          setEventData(data.events);
        }
      })
      .catch((error) => console.error(error));
  }, [modalClosed]);

  useEffect(() => {
    fetch("http://localhost:8089/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return console.log("Error while fetching data");
        }
      })
      .then((data) => {
        if (data) {
          setCategoryId(data?.categories[0]?.category_id);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  console.log("category_id: ", categoryId);
  const handleEdit = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
    setModalClosed(!modalClosed);
    setIsAddModalOpen(false);
  };

  const handleAdd = (payload) => {
    console.log("payload: ", payload);
    fetch(`http://localhost:8089/event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };

  const handleSave = () => {
    if (selectedEvent) {
      fetch(`http://localhost:8089/event/${selectedEvent.event_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedEvent),
      })
        .then((res) => {
          if (res.status === 200) {
            console.log("Event updated successfully");
          } else {
            console.log("Error updating event");
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const handleDelete = () => {
    if (selectedEvent) {
      const eventId = selectedEvent.event_id;
      fetch(`http://localhost:8089/event/delete/${eventId}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.status === 200) {
            console.log("Event deleted successfully");
            setSelectedEvent(null);
            setIsModalOpen(false);
          } else {
            console.log("Error deleting event");
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const renderEvents = () => {
    return eventData?.map((event) => (
      <div className="event" key={event.event_id}>
        <div className="event-details">
          <div className="event-detail">Event: {event.title}</div>
          <div className="event-detail">Description: {event.description}</div>
          <div className="event-detail">Start Time: {event.start_datetime}</div>
          <div className="event-detail">End Time: {event.end_datetime}</div>
        </div>
        <button onClick={() => handleEdit(event)}>Edit</button>
      </div>
    ));
  };
  console.log(categoryId);

  return (
    <div className="event-wrapper">
      <button className="add-event-btn" onClick={() => setIsAddModalOpen(true)}>
        Add Event
      </button>
      {renderEvents()}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <p>Title:</p>
            <input
              type="text"
              value={selectedEvent.title}
              onChange={(e) =>
                setSelectedEvent({ ...selectedEvent, title: e.target.value })
              }
            />
            <p>Start time:</p>
            <input
              type="text"
              value={selectedEvent.start_datetime}
              onChange={(e) =>
                setSelectedEvent({
                  ...selectedEvent,
                  start_datetime: e.target.value,
                })
              }
            />
            <p>End time:</p>
            <input
              type="text"
              value={selectedEvent.end_datetime}
              onChange={(e) =>
                setSelectedEvent({
                  ...selectedEvent,
                  end_datetime: e.target.value,
                })
              }
            />
            <p>Description:</p>
            <input
              type="text"
              value={selectedEvent.description}
              onChange={(e) =>
                setSelectedEvent({
                  ...selectedEvent,
                  description: e.target.value,
                })
              }
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <p>Title:</p>
            <input
              type="text"
              onChange={(e) =>
                setAddEventData({ ...addEventData, title: e.target.value })
              }
            />
            <p>Start time:</p>
            <input
              type="text"
              onChange={(e) =>
                setAddEventData({
                  ...addEventData,
                  start_datetime: e.target.value,
                })
              }
            />
            <p>End time:</p>
            <input
              type="text"
              onChange={(e) =>
                setAddEventData({
                  ...addEventData,
                  end_datetime: e.target.value,
                })
              }
            />
            <p>Description:</p>
            <input
              type="text"
              onChange={(e) =>
                setAddEventData({
                  ...addEventData,
                  description: e.target.value,
                  category_id: categoryId,
                })
              }
            />
            <button onClick={() => handleAdd(addEventData)}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}
