import "./overlaytitle.css"
export function OverlayTitle({children}) {
    return (
        <>
            <div className="container-overlay"></div>
            <div className="container-overlay">
                {children}
            </div>
        </>
    )
}