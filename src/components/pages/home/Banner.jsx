import React from "react";
import Hero from "/hero.jpg"; // Import the image
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[100vh] flex items-center justify-center"
      style={{
        backgroundImage: `url(${Hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-80"></div>

      {/* Content */}
      <div className="relative text-center text-white px-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to PayGuard
        </h1>
        <p className="text-lg mb-6">
          Manage and verify payments securely with our Payment Management
          System. With user authentication, an admin dashboard, document
          uploads, and real-time tracking, it offers efficient and reliable
          payment solutions—all accessible online.
        </p>
        <Link to={"/payment"}>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition duration-300">
            Make Payment
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
