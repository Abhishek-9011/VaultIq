import { useRef, useState } from "react";
import CrossIcon from "../../icons/CrossIcon";
import { Button } from "./Buttons";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";
interface ModelProps {
  open: boolean;
  onClose: () => void;
}
//@ts-ignore
enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}
const CreateContentModel = ({ open, onClose }: ModelProps) => {
  const [modelOpen, setModelOpen] = useState(false);
  const navigate = useNavigate();
  const [type, setType] = useState(ContentType.Youtube);
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    axios.post(
      `${BACKEND_URL}/api/v1/content`,
      {
        title,
        link,
        type,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    onClose()
  }
  return (
    <div>
      {open && (
        <div>
          <div className="w-screen h-screen bg-slate-300 fixed top-0 left-0  opacity-60 flex justify-center"></div>
          <div className="w-screen h-screen  fixed top-0 left-0  flex justify-center">
            <div className=" flex flex-col justify-center">
              <span className="bg-white opacity-100 p-4 rounded-2xl">
                <div
                  className="flex justify-end cursor-pointer"
                  onClick={onClose}
                >
                  <CrossIcon />
                </div>
                <div>
                  <Input reference={titleRef} placeholder={"Title"}></Input>
                  <Input reference={linkRef} placeholder={"Link"}></Input>
                </div>
                <div>
                  <h1>Type</h1>
                  <div className="flex gap-1 p-4 justify-center items-center">
                    <Button
                      size="sm"
                      text="Youtube"
                      variant={
                        type === ContentType.Youtube ? "primary" : "secondary"
                      }
                      onClick={() => {
                        setType(ContentType.Youtube);
                      }}
                    />

                    <Button
                      size="sm"
                      text="Twitter"
                      variant={
                        type === ContentType.Twitter ? "primary" : "secondary"
                      }
                      onClick={() => {
                        setType(ContentType.Twitter);
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button
                    onClick={addContent}
                    variant="primary"
                    text="Submit"
                    size="sm"
                  />
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateContentModel;
