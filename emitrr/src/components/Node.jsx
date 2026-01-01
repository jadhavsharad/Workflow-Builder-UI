import { useState } from "react";
import { IoAddCircle, IoCloseCircle } from "react-icons/io5";

export default function Node({ node, onAdd, onConvert, onDelete }) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const type = e.dataTransfer.getData("nodeType");
    if (type && node.type !== "branch") {
        onAdd(node.id, type);
    }
  };

  return (
    <div 
      className={`node-container ${isDragOver ? "drag-over" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div style={{ fontWeight: "bold" }}>{node.label}</div>

      {node.type !== "start" && (
        <button className="node-close" onClick={() => onDelete(node.id)}><IoCloseCircle /></button>
      )}

      {node.type === "action" && (
        <div style={{ display: "flex", gap:"4px", justifyContent:"center" }}>
          <button className="node-add" onClick={() => onConvert(node.id, "branch")}>If / Else</button>
          <button className="node-add" onClick={() => onConvert(node.id, "end")}>End</button>
        </div>
      )}

      {(node.type === "action" || node.type === "start" )&& (
        <button className="node-add-button" onClick={() => onAdd(node.id, "action")}><IoAddCircle /></button>
      )}

      {node.type === "branch" && (
        <div style={{ display: "flex", gap:"4px", justifyContent:"center"}}>
          <button className="node-add" onClick={() => onAdd(node.id, "action", "true")}>True</button>
          <button className="node-add" onClick={() => onAdd(node.id, "action", "false")}>False</button>
        </div>
      )}
    </div>
  )
}