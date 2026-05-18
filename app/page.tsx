'use client';
import React from "react";
import "./css/brand-kit.css";
import NavBar from "./components/NavBar";
import Footer from "./components/footer";
import HomePage from "./HomePage/page";

export default function Home() {
  return (
    <>
      <NavBar />
      <HomePage />
      <Footer />
    </>
  );
}
