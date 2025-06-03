import { useState } from "react";
import CrossIcon from "../../icons/CrossIcon";
import { Button } from "./Buttons";
interface ModelProps {
    open: boolean,
    onClose: ()=>void
}
interface InputProps {
    onChange: ()=>void
    placeholder: string
}

const CreateContentModel = ({ open, onClose }: ModelProps) => {
  const [modelOpen, setModelOpen] = useState(false);
  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-slate-300 fixed top-0 left-0  opacity-60 flex justify-center">
          <div className=" flex flex-col justify-center">
            <span className="bg-white opacity-100 p-4 rounded-2xl">
              <div className="flex justify-end cursor-pointer" onClick={onClose}> 
                <CrossIcon/>
              </div>
              <div>
                <Input placeholder={"Title"}></Input>
                <Input placeholder={"Link"}></Input>
              </div>
              <div className="flex justify-center">
              <Button variant="primary" text="Submit" size="sm"/>
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

function Input({ onChange, placeholder }: InputProps) {
  return (
    <div>
      <input  placeholder={placeholder} type="text" className="px-4 py-2 border rounded m-2" onChange={onChange}   />
    </div>
  );
}

export default CreateContentModel;
