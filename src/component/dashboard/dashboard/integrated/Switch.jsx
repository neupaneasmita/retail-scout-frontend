import React from "react";
import '../../../../assets/css/switch.css';
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
const Switch = ({ rounded = true, isToggled, onToggled }) => {

    return (
        <>
            <Tippy
                theme="tooltip"
                arrow={false}
                maxWidth={200}
                content={isToggled ? 'Search by keywords' : 'Search by store name'}
            >
                <div className="">
                    <label className="switch transform scale-75">
                        <input type="checkbox" checked={isToggled} onChange={onToggled} />
                        <span className={"slider " + (rounded ? 'rounded' : '')} />
                    </label>
                </div>
            </Tippy>

        </>
    )
}

export default Switch;