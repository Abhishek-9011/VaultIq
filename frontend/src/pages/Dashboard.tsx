import { useEffect, useState } from "react";
import { Button } from "../components/ui/Buttons";
import Card from "../components/ui/Card";
import CreateContentModel from "../components/ui/CreateContentModel";
import AddIcon from "../icons/AddIcon";
import Sidebar from "../components/ui/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

function Dashboard() {
  const [modalOpen, setModelOpen] = useState(false);
  const { contents, refresh } = useContent();
  useEffect(() => {
    refresh();
  }, [modalOpen]);
  return (
    <div>
      <Sidebar />
      <div className="ml-72 p-4 bg-gra">
        <CreateContentModel
          open={modalOpen}
          onClose={() => setModelOpen(false)}
        />
        <div className="flex justify-end gap-4">
          <Button
            text="Add"
            size="md"
            variant="primary"
            startIcon={<AddIcon size="md" />}
            onClick={() => setModelOpen(true)}
          />
          <Button
            text="Share"
            size="md"
            variant="primary"
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                {
                  share: true,
                },
                {
                  headers: {
                    "Authorization": localStorage.getItem("token"),
                  },
                }
              );
              const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
              alert(shareUrl);
            }}
            startIcon={<AddIcon size="md" />}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          {contents.map(({ title, link, type }) => (
            <Card title={title} link={link} type={type} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
