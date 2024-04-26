import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "../styles/Contacts.scss";

export default function Contacts() {
  const user_id = Cookies.get("user_id");
  const [contactData, setContactData] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalClosed, setModalClosed] = useState(false);
  const [addContactData, setAddContactData] = useState({
    user_id: user_id,
    first_name: "",
    last_name: "",
    notes: "",
    phone_number: "",
  });

  useEffect(() => {
    fetch("http://localhost:8089/contacts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Error while fetching data");
        }
      })
      .then((data) => {
        if (data) {
          console.log("data: ", data.contacts);
          setContactData(data.contacts);
        }
      })
      .catch((error) => console.error(error));
  }, [modalClosed]);

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedContact(null);
    setIsModalOpen(false);
    setModalClosed(!modalClosed);
    setIsAddModalOpen(false);
  };

  const handleAdd = (payload) => {
    console.log("payload: ", payload);
    payload.user_id = user_id;

    fetch(`http://localhost:8089/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("Contact added successfully");
          setModalClosed(!modalClosed);
        } else {
          console.log("Error adding contact");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleSave = () => {
    if (selectedContact) {
      selectedContact.user_id = user_id;

      fetch(`http://localhost:8089/contact/${selectedContact.contact_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedContact),
      })
        .then((res) => {
          if (res.status === 200) {
            console.log("Contact updated successfully");
            setModalClosed(!modalClosed);
          } else {
            console.log("Error updating contact");
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const handleDelete = (contact) => {
    fetch(`http://localhost:8089/contact/delete/${contact.contact_id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("Contact deleted successfully");
          setModalClosed(!modalClosed);
        } else {
          console.log("Error deleting contact");
        }
      })
      .catch((error) => console.error(error));
  };

  const renderContacts = () => {
    return contactData?.map((contact) => (
      <div className="contact" key={contact.contact_id}>
        <div className="contact-details">
          <div className="contact-title">
            {contact.first_name} {contact.last_name}
          </div>
          <div className="contact-notes">Notes: {contact.notes}</div>
          <div className="phone-number">Phone: {contact.phone_number}</div>
        </div>
        <button onClick={() => handleEdit(contact)}>Edit</button>
        <button onClick={() => handleDelete(contact)}>Delete</button>
      </div>
    ));
  };

  return (
    <div className="contact-wrapper">
      <button
        className="add-contact-btn"
        onClick={() => setIsAddModalOpen(true)}
      >
        Add Contact
      </button>
      {renderContacts()}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <p>First Name:</p>
            <input
              type="text"
              value={selectedContact.first_name}
              onChange={(e) =>
                setSelectedContact({
                  ...selectedContact,
                  first_name: e.target.value,
                })
              }
            />
            <p>Last Name:</p>
            <input
              type="text"
              value={selectedContact.last_name}
              onChange={(e) =>
                setSelectedContact({
                  ...selectedContact,
                  last_name: e.target.value,
                })
              }
            />
            <p>Notes:</p>
            <input
              type="text"
              value={selectedContact.notes}
              onChange={(e) =>
                setSelectedContact({
                  ...selectedContact,
                  notes: e.target.value,
                })
              }
            />
            <p>Phone Number:</p>
            <input
              type="text"
              value={selectedContact.phone_number}
              onChange={(e) =>
                setSelectedContact({
                  ...selectedContact,
                  phone_number: e.target.value,
                })
              }
            />
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <p>First Name:</p>
            <input
              type="text"
              onChange={(e) =>
                setAddContactData({
                  ...addContactData,
                  first_name: e.target.value,
                })
              }
            />
            <p>Last Name:</p>
            <input
              type="text"
              onChange={(e) =>
                setAddContactData({
                  ...addContactData,
                  last_name: e.target.value,
                })
              }
            />
            <p>Notes:</p>
            <input
              type="text"
              onChange={(e) =>
                setAddContactData({ ...addContactData, notes: e.target.value })
              }
            />
            <p>Phone Number:</p>
            <input
              type="text"
              onChange={(e) =>
                setAddContactData({
                  ...addContactData,
                  phone_number: e.target.value,
                })
              }
            />
            <button onClick={() => handleAdd(addContactData)}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}
