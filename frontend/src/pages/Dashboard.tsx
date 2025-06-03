import { useState } from "react";
import { Button } from "../components/ui/Buttons";
import Card from "../components/ui/Card";
import CreateContentModel from "../components/ui/CreateContentModel";
import AddIcon from "../icons/AddIcon";
import Sidebar from "../components/ui/Sidebar";

function Dashboard() {
  const [modalOpen, setModelOpen] = useState(false);
  return (<div>
    <Sidebar/>
    <div className="ml-72 p-4 bg-gra">
      <CreateContentModel open={modalOpen} onClose={ ()=> setModelOpen(false)}/>
      <div className="flex justify-end gap-4" >
        <Button
          text="Add"
          size="md"
          variant="primary"
          startIcon={<AddIcon size="md" />}
          onClick={()=> setModelOpen(true)}
        />
        <Button
          text="Share"
          size="md"
          variant="primary"
          startIcon={<AddIcon size="md" />}
        />
      </div>

      <div className="flex">
        <Card
          title="Twitter post about coding"
          link="https://twitter.com/cneuralnetwork/status/1929283745917644889?ref_src=twsrc%5Etfw"
          type="twitter"
        />
        <Card
          title="Youtube video about development"
          link="https://www.youtube.com/watch?v=jMTz9j4YrmY"
          type="youtube"
        />
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
