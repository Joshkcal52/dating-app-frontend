import { useState } from "react";
import Cookies from "js-cookie";

export default function NewUserForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleFieldUpdate = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let authToken = Cookies.get("auth_token");
    try {
      const response = await fetch("http://127.0.0.1:8086/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: authToken,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Create new user failed");
      }

      console.log("Create new user successful");
    } catch (error) {
      console.error("Create new user failed:", error.message);
    }
  };

  return (
    <div className="new-user-form-container">
      <div className="page-title">New User Form</div>
      <form onSubmit={handleSubmit}>
        <div className="new-user-form">
          <label htmlFor="new-user-first-name">First Name</label>
          <input
            id="new-user-first-name"
            name="first_name"
            value={formData.first_name}
            type="text"
            className="user-first-name"
            onChange={handleFieldUpdate}
          />

          <label htmlFor="new-user-last-name">Last Name</label>
          <input
            id="new-user-last-name"
            name="last_name"
            value={formData.last_name}
            type="text"
            className="user-last-name"
            onChange={handleFieldUpdate}
          />

          <label htmlFor="new-user-email">Email</label>
          <input
            id="new-user-email"
            name="email"
            value={formData.email}
            type="text"
            className="user-email"
            onChange={handleFieldUpdate}
          />

          <label htmlFor="new-user-password">Password</label>
          <input
            id="new-user-password"
            name="password"
            value={formData.password}
            type="text"
            className="user-password"
            onChange={handleFieldUpdate}
          />

          <label htmlFor="new-user-role">Role</label>
          <input
            id="new-user-role"
            name="role"
            value={formData.role}
            type="text"
            className="user-role"
            onChange={handleFieldUpdate}
          />

          <button type="submit">Add this user!</button>
        </div>
      </form>
    </div>
  );
}
