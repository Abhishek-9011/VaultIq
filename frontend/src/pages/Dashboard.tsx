import React, { useState } from "react";
import Sidebar from "../components/ui/Sidebar";
import { useContent } from "../hooks/useContent";
import Card from "../components/ui/Card";
import CreateContentModel from "../components/ui/CreateContentModel";
import { Button } from "../components/ui/Buttons";
import AddIcon from "../icons/AddIcon";
import axios from "axios";

const Dashboard = () => {
  const { contents, handleDelete, filterTwitter, filterYoutube, showAll } =
    useContent();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [isSharing, setIsSharing] = React.useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const shareUrl = `${window.location.origin}/share/${response.data.hash}`;

      alert(shareUrl);
    } catch (error) {
      console.error("Sharing failed:", error);
      alert("Failed to generate share link. Please try again.");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - fixed positioned */}
      <Sidebar
        filterTwitter={filterTwitter}
        filterYoutube={filterYoutube}
        showAll={showAll}
        onCollapseChange={setIsSidebarCollapsed}
      />

      {/* Main content area with responsive padding */}
      <main
        className={`
        flex-1 min-h-screen transition-all duration-300
        ${isSidebarCollapsed ? "ml-16" : "ml-72"}
      `}
      >
        <div className="p-4 md:p-6">
          <CreateContentModel
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          />

          {/* Header with buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-800">My Content</h1>
            <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto">
              <Button
                text="Add Content"
                variant="primary"
                size="md"
                startIcon={<AddIcon size="md" />}
                onClick={() => setModalOpen(true)}
              />
              <Button
                text={isSharing ? "Sharing..." : "Share"}
                size="md"
                variant="primary"
                onClick={handleShare}
              />
            </div>
          </div>

          {/* Content grid */}
          {contents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {contents.map(({ _id, title, link, type }) => (
                <Card
                  key={_id}
                  id={_id}
                  title={title}
                  link={link}
                  type={type}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm">
              <svg
                className="w-16 h-16 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">
                No content yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by adding some content
              </p>
              <Button
                text="Add Content"
                variant="primary"
                size="md"
                startIcon={<AddIcon size="md" />}
                onClick={() => setModalOpen(true)}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
