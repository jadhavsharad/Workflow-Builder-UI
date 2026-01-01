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

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData("nodeType", type);
  }

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-title">Toolbar</div>
        <div className="draggable-node" draggable onDragStart={(e) => handleDragStart(e, "action")}>  Action Node</div>
        <div className="draggable-node" draggable onDragStart={(e) => handleDragStart(e, "branch")}> If / Else</div>
        <div className="draggable-node" draggable onDragStart={(e) => handleDragStart(e, "end")}>    End Node</div>
        <button onClick={handleSave} style={{ zIndex: 1000, padding: "10px 20px", background: "#282828", color: "#fff", border: "2px solid #383838", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "14px" }} aria-label="Save Workflow as JSON"> Save JSON</button>
        <small>Drag and drop the node from toolbar onto the node to attach.</small>
      </div>


      <InfiniteCanvas>
        <FlowRenderer workflow={workflow} setWorkflow={setWorkflow} nodeId={workflow.rootId} />
      </InfiniteCanvas>
    </>
  )
}