import { useState, useRef } from "react"

export default function InfiniteCanvas({ children }) {
    const [offset, setOffset] = useState({ x: 0, y: 0 })
    const [scale, setScale] = useState(1)
    const dragging = useRef(false)
    const last = useRef({ x: 0, y: 0 })

    function down(e) {
        if (e.target !== e.currentTarget) return;
        dragging.current = true
        last.current = { x: e.clientX, y: e.clientY }
        window.addEventListener("mousemove", move)
        window.addEventListener("mouseup", up)
    }


    function move(e) {
        if (!dragging.current) return;
        const dx = (e.clientX - last.current.x) / scale
        const dy = (e.clientY - last.current.y) / scale
        setOffset(o => ({ x: o.x + dx, y: o.y + dy }));
        last.current = { x: e.clientX, y: e.clientY }
    }


    function up() {
        dragging.current = false;
        window.removeEventListener("mousemove", move)
        window.removeEventListener("mouseup", up)
    }


    function wheel(e) {
        e.preventDefault()
        setScale(s => Math.min(2, Math.max(0.5, s - e.deltaY * 0.001)))
    }

    return (
        <div onMouseDown={down} onWheel={wheel} style={{ display: "flex", placeItems: "center", width: "100vw", height: "100vh", overflow: "hidden", background: "none", }}>
            <div style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`, transformOrigin: "0 0", padding: 40 }}>
                {children}
            </div>
        </div>
    )
}
