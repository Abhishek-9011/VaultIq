import axios from "axios";
import AddIcon from "../../icons/AddIcon";
import DeleteIcon from "../../icons/DeleteIcon";
import ShareIcon from "../../icons/ShareIcon";
import { BACKEND_URL } from "../../config";

interface CardProps {
  id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube";
  onDelete?: (id: string) => void;
}

const Card = ({ id, title, link, type }: CardProps) => {
  const embedYoutubeLink = link.includes("watch")
    ? link.replace("watch?v=", "embed/")
    : link;
  const deleteCard = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        data: { contentId: id }, // Send contentId in the request body
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
    } catch (error) {
      console.error("Failed to delete card:", error);
    }
    window.location.reload();
  };
  return (
    <div>
      <div className="p-4 bg-white rounded-md border border-gray-200 max-w-72">
        <div className="flex justify-between">
          <div className="flex items-center text-sm">
            <div className="text-gray-500 pr-2">
              <AddIcon size="md" />
            </div>
            {title}
          </div>
          <div className="flex items-center">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="pr-2 text-gray-500"
            >
              <ShareIcon />
            </a>
            <div className="text-gray-500" onClick={deleteCard}>
              <DeleteIcon />
            </div>
          </div>
        </div>
        <div className="pt-4">
          {type === "youtube" && (
            <iframe
              className="w-full aspect-video"
              src={embedYoutubeLink}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          {type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a
                href={link.replace("x.com", "twitter.com")}
                target="_blank"
                rel="noopener noreferrer"
              >
                {title}
              </a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
