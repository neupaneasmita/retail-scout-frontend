import React from 'react';
import {ReactComponent as Check} from '../../../../assets/images/dashboard/check.svg'

const Checkbox = ({type = "checkbox", name, checked = false, onChange, label}) => {
    //console.log("Checkbox: ", name, checked);
    return (
        <>
            <div className="flex items-center">
                <div className="relative">
                    <input type={type}
                           name={name}
                           checked={checked}
                           onChange={onChange}
                           className={`absolute -top-2 left-0 rounded w-4 h-4 z-20 ${checked ? 'opacity-0' : 'opacity-100'}`}
                           style={{border: "1px solid #C9CBCC"}}/>
                    <div className={`absolute -top-2 left-0 rounded z-10 w-5 h-5 -m-px bg-primary transform ${checked ? 'opacity-100' : 'opacity-0'}`}>
                        {checked && <Check className="mx-auto mt-1"/>}
                    </div>
                </div>
                <div className="paragraph text-secondary ml-6">{label}</div>
            </div>
        </>
    )
}
export default Checkbox;