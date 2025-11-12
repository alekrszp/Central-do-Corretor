import "./loading.css"
export function Loading() {
    return (
        <>
            <div className="background-overlay"></div>
            <div className="loading">
                <div className="spinner"></div>
            </div>
        </>
    )
}