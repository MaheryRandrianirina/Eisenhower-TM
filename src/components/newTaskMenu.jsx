import React from "react"

export const NewTaskMenu = React.memo(function ({onClickA, onClickB, onClickC,onClickD}) {
    return <div className="bg-dark position-absolute bottom-100 end-0 p-1 me-4 btn-group" style={{width: '200px'}}>
        <button className="btn btn-secondary ms-1" onClick={onClickA}>A</button>
        <button className="btn btn-secondary ms-1" onClick={onClickB}>B</button>
        <button className="btn btn-secondary ms-1" onClick={onClickC}>C</button>
        <button className="btn btn-secondary ms-1" onClick={onClickD}>D</button>
    </div>
})