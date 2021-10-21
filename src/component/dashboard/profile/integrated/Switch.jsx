import React from "react";
import './switch.css';

const Switch = ({ rounded = true, isToggled, onToggled }) => {

    return (
        <div className="">
            <label className="switch">
                <input type="checkbox" checked={isToggled} onChange={onToggled}/>
                <span className={"slider " + (rounded ? 'rounded' : '')} />
            </label>
        </div>
    )
}

export default Switch;