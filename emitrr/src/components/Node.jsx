import { IoAddCircle, IoCloseCircle } from "react-icons/io5";

export default function Node({ node, onAdd, onConvert, onDelete }) {
  return (
    <div className="node-container">
      <div style={{ fontWeight: "bold" }}>{node.label}</div>

      {node.type !== "start" && (
        <button className="node-close" onClick={() => onDelete(node.id)}><IoCloseCircle /></button>
      )}

      {node.type === "action" && (
        <div style={{ display: "flex", gap:"4px", justifyContent:"center" }}>
          <button className="node-add" onClick={() => onConvert(node.id, "branch")}>Conditional</button>
          <button className="node-add" onClick={() => onConvert(node.id, "end")}>End</button>
        </div>
      )}

      {(node.type === "action" || node.type == "start" )&& (
        <button className="node-add-button" onClick={() => onAdd(node.id)}><IoAddCircle /></button>
      )}

      {node.type === "branch" && (
        <div style={{ display: "flex", gap:"4px", justifyContent:"center"}}>
          <button className="node-add" onClick={() => onAdd(node.id, "true")}>True</button>
          <button className="node-add" onClick={() => onAdd(node.id, "false")}>False</button>
        </div>
      )}
    </div>
  )
}
