import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import UserContext from "../context/UserContext";
import { updateProfile } from "../config/firebase";
import { IKContext, IKUpload } from "imagekitio-react";

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_API_ENDPOINT;
const publicKey = import.meta.env.VITE_IMAGE_KIT_KEY;
// Fixed authenticator function
const authenticator = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth`);
    if (!response.ok) throw new Error(`Auth failed: ${response.statusText}`);
    const data = await response.json();

    // Make sure property names match exactly what ImageKit expects
    return {
      signature: data.signature,
      token: data.token,
      expire: data.expire,
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return { signature: "", token: "", expire: "" };
  }
};

const Profile = () => {
  const { user, getUserData } = useContext(UserContext);
  const [image, setImg] = useState({
    isLoading: false,
    error: null,
    dp: user?.dp || "/profile.png",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || Object.keys(user).length === 0) navigate("/signin");
    if (user?.dp) setImg((prev) => ({ ...prev, dp: user.dp }));
  }, [user, navigate]);

  const onError = (err) => {
    console.log("Error", err);
    setImg((prev) => ({ ...prev, isLoading: false, error: err?.message }));
  };

  const onSuccess = (res) => {
    console.log("Success", res);
    if (res?.url) {
      setImg((prev) => ({ ...prev, dp: res.url, isLoading: false })); // Update only the URL
    }
  };

  const onUploadStart = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("📂 Selected file size:", file.size, "bytes");

      setImg((prev) => ({ ...prev, isLoading: true })); // Set loading state

      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setImg((prev) => ({ ...prev, dp: URL.createObjectURL(file) })); // Show local preview
      };
      fileReader.readAsDataURL(file);

      uploadImageToImageKit(file);
    }
  };

  const uploadImageToImageKit = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", `profile_picture_${user.id}_${Date.now()}`);

      const response = await fetch(
        "https://upload.imagekit.io/api/v1/files/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${btoa("your_public_key:your_private_key")}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (data.url) {
        setImg((prev) => ({ ...prev, dp: data.url, isLoading: false })); // Update only URL
      }
    } catch (error) {
      console.error("Upload error:", error);
      setImg((prev) => ({ ...prev, isLoading: false, error: error.message }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const postData = {
      username: data.get("username").toLowerCase() || user.username,
      dp: image.dp || "/profile.png", // Use uploaded URL
      bio: data.get("bio") || user.bio,
    };
    try {
      await updateProfile(user.id, postData);
      await getUserData(user.id);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col justify-center items-center p-6">
      <div className="text-4xl font-extrabold text-gray-800 mb-8 tracking-tight">
        Profile Update
      </div>
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <img
                className="h-24 w-24 rounded-full object-cover"
                src={image.dp}
                alt="Profile"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="block text-lg font-medium text-gray-700">
                Profile Photo
              </label>
              <div className="mt-1">
                <IKContext
                  urlEndpoint={urlEndpoint}
                  publicKey={publicKey}
                  authenticator={authenticator}
                >
                  <IKUpload
                    fileName={`profile_picture_${user.id}_${Date.now()}`}
                    onError={onError}
                    onSuccess={onSuccess}
                    useUniqueFileName={true}
                    onUploadStart={onUploadStart}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                </IKContext>

                {image.error && (
                  <span className="mt-2 text-sm text-red-500">
                    {image.error}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="username"
                id="username"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3"
                placeholder="Enter your username"
                defaultValue={user?.username || ""}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >
              Bio
            </label>
            <div className="mt-1">
              <textarea
                id="bio"
                name="bio"
                rows={3}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3"
                placeholder="Tell us about yourself..."
                defaultValue={user?.bio || ""}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={image.isLoading}
            >
              <img src="/save.png" className="h-6 mx-2 invert-100" alt="" />
              {image.isLoading ? "Uploading..." : "Save Changes"}
            </button>
            <button
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              <img src="/back.png" className="h-6 mx-2 invert-100" alt="" />
              Go back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
