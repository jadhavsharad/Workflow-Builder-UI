import { useState } from "react"
import InfiniteCanvas from "../components/InfiniteCanvas"
import FlowRenderer from "../components/FlowRenderer"

export default function App() {
  const [workflow, setWorkflow] = useState({
    rootId: "start",
    nodes: {
      start: {
        id: "start",
        type: "start",
        label: "Start",
        next: null
      }
    }
  })

  const handleSave = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(workflow, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "workflow.json";
    link.click();
  };

  return (
    <>
      <button onClick={handleSave} style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1000, padding: "10px 20px", background: "#282828", color: "#fff", border: "2px solid #383838", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "14px" }} aria-label="Save Workflow as JSON"> Save JSON</button>
      <InfiniteCanvas>
        <FlowRenderer workflow={workflow} setWorkflow={setWorkflow} nodeId={workflow.rootId} />
      </InfiniteCanvas>
    </>
  )
}