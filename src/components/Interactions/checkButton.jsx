export function CheckButton({onClick}) {
    return <button className="btn btn-success position-relative end-0" onClick={onClick}>
        <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    </button>
}