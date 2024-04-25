import React, { useState, useEffect } from "react";
import "../styles/Contacts.scss";

export default function Contacts() {
  const [contactData, setContactData] = useState([]);

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
  }, []);

  const renderContacts = () => {
    return contactData?.map((contact) => (
      <div className="contact" key={contact.contact_id}>
        <br />
        <div className="contact-details">
          <div className="contact-title">
            {contact.first_name} {contact.last_name}
          </div>
          <div className="contact-notes">Notes: {contact.notes}</div>
          <div className="phone-number">Phone: {contact.phone_number}</div>
          <br />
        </div>
      </div>
    ));
  };

  return (
    <div className="contact-wrapper">
      {renderContacts()}
    </div>
  );
}
