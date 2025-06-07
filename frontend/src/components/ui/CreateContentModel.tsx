import { useRef, useState } from "react";
import CrossIcon from "../../icons/CrossIcon";
import { Input } from "./Input";
import axios from "axios";

// Mock components for demonstration - replace with your actual imports

interface ModelProps {
  open: boolean;
  onClose: () => void;
}
// @ts-ignore
enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

const CreateContentModel = ({ open, onClose }: ModelProps) => {
  const [type, setType] = useState(ContentType.Youtube);
  const [isLoading, setIsLoading] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    if (!title || !link) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      // Replace with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/content`,
        { title, link, type },
        { headers: { Authorization: localStorage.getItem("token") } }
      );

      onClose();
      alert("Content added successfully!");
    } catch (error) {
      alert("Failed to add content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="relative w-full max-w-md transform transition-all duration-300 ease-out"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Content */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Add New Content
                  </h2>
                  <p className="text-blue-100 text-sm mt-1">
                    Share your favorite links
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200 text-white"
                  aria-label="Close modal"
                >
                  <CrossIcon />
                </button>
              </div>

              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 pointer-events-none" />
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-6">
              {/* Input Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content Title
                  </label>
                  <Input
                    reference={titleRef}
                    placeholder="Enter a descriptive title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content Link
                  </label>
                  <Input
                    reference={linkRef}
                    placeholder="Paste your URL here..."
                  />
                </div>
              </div>

              {/* Content Type Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Content Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setType(ContentType.Youtube)}
                    className={`
                      flex items-center justify-center px-4 py-3 rounded-xl border-2 transition-all duration-200 transform hover:scale-105
                      ${
                        type === ContentType.Youtube
                          ? "border-red-500 bg-red-50 text-red-700"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                      }
                    `}
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span className="font-medium">YouTube</span>
                  </button>

                  <button
                    onClick={() => setType(ContentType.Twitter)}
                    className={`
                      flex items-center justify-center px-4 py-3 rounded-xl border-2 transition-all duration-200 transform hover:scale-105
                      ${
                        type === ContentType.Twitter
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                      }
                    `}
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    <span className="font-medium">Twitter</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={addContent}
                  disabled={isLoading}
                  className={`
                    flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95
                    ${
                      isLoading
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl"
                    }
                  `}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Adding...
                    </div>
                  ) : (
                    "Add Content"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContentModel;
