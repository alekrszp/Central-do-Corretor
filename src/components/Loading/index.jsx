export function Loading() {
    return (
        <>
            <div className="fixed top-0 left-0 w-screen h-screen bg-[#1d1d1d]/40 z-[1000]"></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000]">
                <div className="w-[50px] h-[50px] border-[6px] border-[#E6E6E6] border-t-[#C77DFF] rounded-full animate-spin"></div>
            </div>
        </>
    );
}