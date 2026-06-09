// RegisterForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { Checkbox } from "../../../components/ui/Checkbox";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("parent");

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
    vehicle_number: "",
    staff_id: "",
    child1: "",
    child2: "",
    child3: "",
    child4: "",
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.full_name || formData.full_name.trim().length < 3)
      newErrors.full_name = "Full name is required";

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Valid email is required";

    if (!formData.phone_number || !/^\d{10}$/.test(formData.phone_number.replace(/\D/g, "")))
      newErrors.phone_number = "Valid 10-digit phone number required";

    if (!formData.password || formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (selectedRole === "parent") {
      if (!formData.vehicle_number)
        newErrors.vehicle_number = "Vehicle number required";

      if (!formData.child1)
        newErrors.child1 = "Child 1 name is required";
    }

    if (selectedRole === "admin") {
      if (!formData.staff_id)
        newErrors.staff_id = "Staff ID is required";
    }

    if (!formData.agreeTerms)
      newErrors.agreeTerms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: selectedRole,
          full_name: formData.full_name,
          email: formData.email,
          phone_number: formData.phone_number,
          vehicle_number: selectedRole === "parent" ? formData.vehicle_number : null,
          staff_id: selectedRole === "admin" ? formData.staff_id : null,
          password: formData.password,
          child1: formData.child1,
          child2: formData.child2 || null,
          child3: formData.child3 || null,
          child4: formData.child4 || null
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ form: data.message || "Registration failed" });
        setIsLoading(false);
        return;
      }

      alert("Registration successful — please login");
      navigate("/authentication-portal");
    } catch (err) {
      console.error("Register request failed:", err);
      setErrors({ form: "Network/server error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Role Selector */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => handleRoleChange("parent")}
          className={`flex-1 p-3 rounded-lg border ${selectedRole === "parent" ? "border-primary bg-primary/10" : "border-border"}`}
        >
          Parent / Guardian
        </button>

        <button
          type="button"
          onClick={() => handleRoleChange("admin")}
          className={`flex-1 p-3 rounded-lg border ${selectedRole === "admin" ? "border-primary bg-primary/10" : "border-border"}`}
        >
          Admin / Staff
        </button>
      </div>

      {/* Basic Fields */}
      <Input label="Full Name" placeholder="Enter your full name" name="full_name" value={formData.full_name} onChange={handleChange} error={errors.full_name} required />

      <Input label="Email Address" placeholder="Enter your email" type="email" name="email" value={formData.email} onChange={handleChange} error={errors.email} required />

      <Input label="Phone Number" placeholder="Enter your 10-digit phone number" type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} error={errors.phone_number} required />

      {/* Parent Inputs */}
      {selectedRole === "parent" && (
        <>
          <Input label="Vehicle Number" placeholder="e.g., GJ05AB1234" name="vehicle_number" value={formData.vehicle_number} onChange={handleChange} error={errors.vehicle_number} required />

          <Input label="Child 1 Name *" placeholder="First child's name" name="child1" value={formData.child1} onChange={handleChange} error={errors.child1} required />

          <Input label="Child 2 Name (optional)" placeholder="Second child's name" name="child2" value={formData.child2} onChange={handleChange} />

          <Input label="Child 3 Name (optional)" placeholder="Third child's name" name="child3" value={formData.child3} onChange={handleChange} />

          <Input label="Child 4 Name (optional)" placeholder="Fourth child's name" name="child4" value={formData.child4} onChange={handleChange} />
        </>
      )}

      {/* Admin Input */}
      {selectedRole === "admin" && (
        <Input label="Staff ID" placeholder="Enter your staff ID" name="staff_id" value={formData.staff_id} onChange={handleChange} error={errors.staff_id} required />
      )}

      {/* Password */}
      <Input label="Password" placeholder="Create a password (min 8 chars)" type="password" name="password" value={formData.password} onChange={handleChange} error={errors.password} required />

      <Input label="Confirm Password" placeholder="Re-enter your password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} required />

      <Checkbox label="I agree to the Terms & Conditions" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} error={errors.agreeTerms} />

      {errors.form && <p className="text-sm text-error">{errors.form}</p>}

      <Button type="submit" fullWidth loading={isLoading}>
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;
