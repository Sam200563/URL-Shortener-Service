import React, { useState } from "react";
import { createShortUrl } from "../services/apiService";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {QRCodeCanvas} from 'qrcode.react'

const Homepage = () => {
  const [longUrl, setLongurl] = useState("");
  const [shortUrlData, setShortUrlData] = useState(null);
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showQR,setShowQR] = useState(false)
  const { token } = useAuth();
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!longUrl) {
    //   setError("please enter url");
    //   setShortUrlData(null);
    //   return;
    // }
    setIsCopied(false);
    setError("");
    setIsLoading(true);
    setShowQR(false)
    try {
      // const data = await createShortUrl.shortenUrl({longUrl})
      // setShortUrlData(data.shortUrlData)
      //setError("");
      const reponse = await createShortUrl(longUrl, token);
      setShortUrlData(reponse.data.shortUrl);

      console.log("short url created successfully", reponse);
    } catch (err) {
      console.error("Caught error:", err);
      const message = err.message;
      setError(message)

      if (
        message.includes("upgrade") ||
        message.includes("expired") ||
        message.includes("limit")
      ) {
        alert(
          "Your plan has expired or limit reached. Redirecting to upgrade..."
        );
        setTimeout(() => {
          navigation("/upgradeplan"); // make sure this matches your route
        }, 1500);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!shortUrlData) return;
    try {
      await navigator.clipboard.writeText(shortUrlData);
      setIsCopied(true);
      alert("URL Copied to clipboard");
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy URL:", error);
      alert("Failed to copy url");
    }
  };

  const handleGenerateQR = ()=>{
    setShowQR(true);
  }
  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-2">URL Shorten</h1>
      <p className="text-lg text-slate-600">
        Enter your very long url to make it short
      </p>
      <div className="mt-8 bg-white p-8 rounded-lg shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4"
        >
          <input
            className="flex-grow p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            type="url"
            name=""
            id="longUrl-input"
            placeholder="Type your long url"
            value={longUrl}
            onChange={(e) => setLongurl(e.target.value)}
            disabled={isLoading}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 disabled:bg-blue-400 w-full sm:w-auto"
          >
            {isLoading ? <Spinner size="small" /> : "Shorten"}
          </button>
        </form>
        {shortUrlData && (
          <div className="mt-6 pt-6 border-t text-left">
            <p>Your shortened URL:</p>
            <div className="flex justify-between items-center bg-slate-100 p-3 rounded-md">
              <a
                href={shortUrlData}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-blue-600 break-all"
              >
                {shortUrlData}
              </a>
              <button
                type="button"
                className="bg-slate-200 hover:bg-slate-300 px-3 py-1 rounded-md text-sm font-semibold ml-4"
                onClick={handleCopy}
              >
                {isCopied ? "Copied!" : "copy"}
              </button>
            </div>
            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md text-sm" onClick={handleGenerateQR}>Generate QR Code</button>
            {showQR && (
              <div className="mt-4 text-center">
                <QRCodeCanvas value={shortUrlData} size={128}/>
              </div>
            )}
          </div>
        )}
        {error && <p className="mt-4 text-red-500">Error:{error}</p>}
      </div>
      {/* 🌐 Platform Stats - Animated Cards */}
      <div className="mt-14 px-4 max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold text-center text-gray-800 mb-6">
          🌐 Platform Stats
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-700">
          {[
            { icon: "🔗", label: "URLs Shortened", value: "12,390" },
            { icon: "👁️", label: "Total Clicks", value: "84,000" },
            { icon: "👤", label: "Users Registered", value: "1,250" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:scale-105 transform transition duration-300 ease-in-out"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="font-bold text-lg">{item.value}</div>
              <div className="text-gray-500">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 📌 Use Cases - Icon Cards */}
      <div className="mt-16 px-4 max-w-4xl mx-auto text-center">
        <h3 className="font-semibold text-xl text-gray-800 mb-6">
          📌 Use Short.ly for:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          {[
            "Sharing links on social media",
            "Making long URLs easy to remember",
            "Tracking link clicks for marketing",
            "Generating QR codes for printed materials",
          ].map((use, i) => (
            <div
              key={i}
              className="bg-gray-50 p-5 rounded-xl border hover:shadow-lg transition duration-300 ease-in-out"
            >
              {use}
            </div>
          ))}
        </div>
      </div>

      {/* 💡 Trust Section */}
      <div className="mt-16 px-4 max-w-2xl mx-auto text-center">
        <div className="bg-blue-100 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 ease-in-out">
          <h4 className="text-lg font-semibold text-blue-800">Why Short.ly?</h4>
          <p className="text-gray-700 mt-2 text-sm">
            Short.ly is a fast, secure, and privacy-friendly link shortener
            built for modern web users. Track clicks, manage links, and grow
            your visibility — all in one place.
          </p>
        </div>
      </div>

      {/* 📎 Footer */}
      <footer className="mt-20 text-center text-xs text-gray-500 pb-8">
        © 2025 Short.ly • Crafted with 💙 by{" "}
        <span className="font-semibold">Sampada Ghadigaonkar</span>
      </footer>
    </div>
  );
};

export default Homepage;
