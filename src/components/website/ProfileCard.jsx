"use client";
import { useEffect, useState } from "react";
import { FaRegSmile, FaTimes } from "react-icons/fa";
import WebcamCaptureModal from "./WebcamCapture";
import { axiosInstance, dataURLtoFile } from "@/app/library/helper";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/redux/reducers/User";

export default function ProfileCard() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.data != null) {
      setCapturedImage(user?.data?.image);
    }
  }, [user?.data]);

  return (
    <div className="flex flex-col items-center bg-white mx-auto p-4 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-xl">
      {/* Profile Image */}
      <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-gray-300 shadow-md flex items-center justify-center bg-gray-100">
        {user?.data?.image || capturedImage ? (
          <img
            src={
              `${process.env.NEXT_PUBLIC_BASE_URL}/images/user/${user?.data?.image}` ??
              capturedImage
            }
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500 text-sm">No Image</span> // Placeholder text when no image is available
        )}
      </div>

      {/* Edit Profile Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 bg-gray-200 text-[12px] hover:bg-gray-300 text-gray-700 py-2 px-6 rounded-lg text-sm sm:text-base"
      >
        Edit Profile
      </button>
      <PhotoUploadModal
        user={user?.data}
        dispatch={dispatch}
        setCapturedImage={setCapturedImage}
        capturedImage={capturedImage}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}

function PhotoUploadModal({
  isOpen,
  onClose,
  user,
  dispatch,
  setCapturedImage,
}) {
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const [uploadFromGalleryIsOpen, setUploadFromGalleryIsOpen] = useState(false);

  if (!isOpen) return null;

  const imageUploadHandler = (img) => {
    setCapturedImage(img);
    const formData = new FormData();
    const imageFile = dataURLtoFile(img, "webcam.png");
    formData.append("image", imageFile);

    axiosInstance
      .post(`/user/upload-photo/${user._id}`, formData)
      .then((response) => {
        if (response.data.flag == 1) {
          dispatch(updateUser({ user: response.data.user }));
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
      })
      .catch((error) => console.error("Error uploading photo:", error.message));

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md sm:max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Change Photo</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <div className="flex justify-center my-4">
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/user/${user.image}`}
            className="w-32 h-32 rounded-full border-4 border-white shadow-md"
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setIsWebcamOpen(true)}
            className="border border-gray-400 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200"
          >
            Use Camera
          </button>
          <WebcamCaptureModal
            isWebcamOpen={isWebcamOpen}
            onClose={() => setIsWebcamOpen(false)}
            onCapture={imageUploadHandler}
          />
          <button
            onClick={() => setUploadFromGalleryIsOpen(true)}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Upload From Gallery
          </button>
          <UploadFromGallery
            user={user}
            dispatch={dispatch}
            onClose={onClose}
            uploadFromGalleryIsOpen={uploadFromGalleryIsOpen}
            onUploadFromGalleryClose={() => setUploadFromGalleryIsOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

function UploadFromGallery({
  uploadFromGalleryIsOpen,
  onUploadFromGalleryClose,
  user,
  dispatch,
  onClose,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", imageFile);
      axiosInstance
        .post(`/user/upload-photo/${user._id}`, formData)
        .then((response) => {
          if (response.data.flag == 1) {
            dispatch(updateUser({ user: response.data.user }));
            localStorage.setItem("user", JSON.stringify(response.data.user));
          }
        })
        .catch((error) => {
          console.log("Something is wrong is uploding photo", error.message);
        });
      onUploadFromGalleryClose();
      onClose();
    }
  };

  if (!uploadFromGalleryIsOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Change photo</h2>
          <button
            onClick={onUploadFromGalleryClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Image Preview */}
        <div className="flex justify-center my-4">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Preview"
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 border-white shadow-md"
            />
          ) : (
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 border-gray-300 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* File Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4 w-full"
        />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            className="border border-gray-400 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 w-full sm:w-auto"
            onClick={onUploadFromGalleryClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
