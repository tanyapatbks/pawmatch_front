"use client";

import { useState, FormEvent } from "react";
import styles from "./login.module.css";

export default function Login() {
  // Typing the states for email and password as strings
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Typing the handleSubmit function using FormEvent from React
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Sign in PawMatch</h1>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Sign in
        </button>
      </form>
    </div>
  );
}
