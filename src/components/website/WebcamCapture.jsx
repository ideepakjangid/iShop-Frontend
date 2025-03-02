"use client";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { FaTimes } from "react-icons/fa";

const WebcamCaptureModal = ({ isWebcamOpen, onClose, onCapture }) => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const capture = () => {
    const imgSrc = webcamRef.current.getScreenshot();
    setImage(imgSrc);
    onCapture(imgSrc); // Send to parent
    onClose(); // Close modal after capture
  };

  if (!isWebcamOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <FaTimes size={20} />
        </button>

        {/* Modal Header */}
        <h2 className="text-lg font-semibold text-center mb-4">Camera Preview</h2>

        {/* Webcam Preview */}
        <div className="border rounded-lg overflow-hidden">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            className="w-full"
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-2 mt-4">
          <button
            onClick={capture}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Capture Image
          </button>
          <button
            onClick={onClose}
            className="border border-gray-400 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebcamCaptureModal;
