import Node from "./Node"
import Line from "./Line"

export default function FlowRenderer({ workflow, setWorkflow, nodeId }) {
    const node = workflow.nodes[nodeId]

    function addNode(parentId, type, branchKey) {
        const newId = crypto.randomUUID()

        setWorkflow(prev => {
            const parent = prev.nodes[parentId]
            const newNode = { 
                id: newId, 
                type: type, 
                label: type === "branch" ? "Condition" : (type === "end" ? "End" : "New Action"), 
                next: null 
            }
            if (type === "branch") {
                newNode.true = null;
                newNode.false = null;
            }

            const updatedParent = { ...parent }
            
            if (parent.type === "branch") {
                if (branchKey) updatedParent[branchKey] = newId
            } else {
                updatedParent.next = newId
            }

            return { ...prev, nodes: { ...prev.nodes, [newId]: newNode, [parentId]: updatedParent } }
        })
    }

    function convertNode(nodeId, newType) {
        setWorkflow(prev => {
            const oldNode = prev.nodes[nodeId]
            let updatedNode = { id: oldNode.id, label: oldNode.label, type: newType }

            if (newType === "action") updatedNode.next = oldNode.next || null;

            if (newType === "branch") {
                updatedNode.true = null
                updatedNode.false = null
            }

            return { ...prev, nodes: { ...prev.nodes, [nodeId]: updatedNode } }
        })
    }

    function deleteNode(nodeId) {
        setWorkflow(prev => {
            const nodes = { ...prev.nodes }
            const nodeToDelete = nodes[nodeId]

            if (!nodeToDelete || nodeToDelete.type === "start") return prev;

            let replacement = null

            if (nodeToDelete.type === "action") replacement = nodeToDelete.next;
            if (nodeToDelete.type === "branch") replacement = nodeToDelete.true || nodeToDelete.false;

            for (const n of Object.values(nodes)) {
                if (n.next === nodeId) n.next = replacement;
                if (n.true === nodeId) n.true = replacement;
                if (n.false === nodeId) n.false = replacement;
            }
            delete nodes[nodeId]
            return { ...prev, nodes }
        })
    }


    return (
        <div style={{ textAlign: "center" }}>
            <Node node={node} onAdd={addNode} onConvert={convertNode} onDelete={deleteNode} />

            {node.next && (
                <>
                    <Line />
                    <FlowRenderer workflow={workflow} setWorkflow={setWorkflow} nodeId={node.next} />
                </>
            )}

            {node.type === "branch" && (
                <>
                    <Line />
                    <div className="branch-container">
                        {node.true && (
                            <div className="branch-item">
                                <FlowRenderer workflow={workflow} setWorkflow={setWorkflow} nodeId={node.true} />
                            </div>
                        )}
                        {node.false && (
                            <div className="branch-item">
                                <FlowRenderer workflow={workflow} setWorkflow={setWorkflow} nodeId={node.false} />
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}