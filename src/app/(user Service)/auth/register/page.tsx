// src/app/(user Service)/auth/register/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./register.module.css";

interface RegisterForm {
  name: string;
  surname: string;
  displayName: string;
  email: string;
  telephoneNumber: string;
  lineId: string;
  password: string;
  confirmPassword: string;
  profileImage?: File | null;
}

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterForm>({
    name: "",
    surname: "",
    displayName: "",
    email: "",
    telephoneNumber: "",
    lineId: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });
  const [previewImage, setPreviewImage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files) {
      const file = files[0];
      // Update form data with file
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      // Create preview URL
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewImage("");
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      profileImage: null,
    }));
    setPreviewImage("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== "confirmPassword" && key !== "profileImage") {
          submitData.append(key, formData[key as keyof RegisterForm] as string);
        }
      });
      if (formData.profileImage) {
        submitData.append("profileImage", formData.profileImage);
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: submitData,
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        router.push(
          "/auth/login?message=Registration successful! Please log in."
        );
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Create PawMatch Account</h1>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.profileImageContainer}>
          {previewImage ? (
            <div className={styles.previewContainer}>
              <Image
                src={previewImage}
                alt="Profile preview"
                width={120}
                height={120}
                className={styles.previewImage}
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className={styles.removeImageButton}
              >
                Remove
              </button>
            </div>
          ) : (
            <div className={styles.uploadPlaceholder}>
              <span>Profile Image</span>
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="profileImage" className={styles.uploadLabel}>
              {previewImage ? "Change Image" : "Upload Image"}
            </label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              onChange={handleInputChange}
              className={styles.fileInput}
            />
          </div>
        </div>

        <div className={styles.gridContainer}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">First Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="surname">Last Name *</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="displayName">Display Name *</label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="telephoneNumber">Phone Number *</label>
          <input
            type="tel"
            id="telephoneNumber"
            name="telephoneNumber"
            value={formData.telephoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="lineId">Line ID (Optional)</label>
          <input
            type="text"
            id="lineId"
            name="lineId"
            value={formData.lineId}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.gridContainer}>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>

        <div className={styles.loginContainer}>
          <p>Already have an account?</p>
          <Link href="/auth/login" className={styles.loginLink}>
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
