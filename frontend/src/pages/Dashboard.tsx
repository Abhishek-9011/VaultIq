import React from "react";
import Sidebar from "../components/ui/Sidebar";
import { useContent } from "../hooks/useContent";
import Card from "../components/ui/Card";
import CreateContentModel from "../components/ui/CreateContentModel";
import { Button } from "../components/ui/Buttons";
import AddIcon from "../icons/AddIcon";
import axios from "axios";

const Dashboard = () => {
  const {
    contents,
    handleDelete,
    filterTwitter,
    filterYoutube,
    showAll,
  } = useContent();

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
    <div className="flex">
      <Sidebar
        filterTwitter={filterTwitter}
        filterYoutube={filterYoutube}
        showAll={showAll}
      />

      <div className="flex-1 ml-0 md:ml-72">
        <div className="p-4">
          <CreateContentModel
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          />

          {/* Button container aligned to the end */}
          <div className="flex justify-end gap-3 mb-6">
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

          {/* Content grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
