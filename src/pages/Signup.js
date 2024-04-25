import { useState } from "react";

const INITIAL_FORM_STATE = {
  first_name: "",
  last_name: "",
  email: "",
  user_name: "",
  password: "",
};

export default function Signup() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!formData.first_name.trim())
      errors.first_name = "First Name is Required";

    if (!formData.last_name.trim()) errors.last_name = "Last Name is Required";

    if (!formData.email.trim()) errors.email = "Invalid email";

    if (!formData.user_name.trim()) errors.user_name = "User Name is Required";

    if (!formData.password.trim()) errors.password = "Password is Required";

    return Object.keys(errors).length > 0 ? errors : null;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (validationErrors) {
      setFormErrors(validationErrors);
      return;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: null }));
  };
  console.log("formData: ", formData);
  console.log("formErrors", formErrors);

  return (
    <div className="signup-page-container">
      <div className="create-account-form">
        <h1>Create an Account</h1>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="first_name">First Name: </label>
          <input
            name="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="last_name">Last Name: </label>
          <input
            name="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="user_name">User Name: </label>
          <input
            name="user_name"
            type="text"
            value={formData.user_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="submit-container">
          <button onClick={handleSubmit}>Create Account</button>
        </div>
      </div>
    </div>
  );
}
