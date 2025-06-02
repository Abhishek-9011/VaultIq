import "./App.css";
import { Button } from "./components/ui/Buttons";
import AddIcon from "./icons/AddIcon";

function App() {
  return (
    <>
      <Button size="md" variant="primary" text="Share" startIcon={<AddIcon size="lg"/>} />
      <Button size="md" variant="secondary" text="Add to content" />
    </>
  );
}

export default App; 
