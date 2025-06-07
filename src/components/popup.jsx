import React from "react";

import '../styles/Popup.css'

const Popup = (props) => {
    return (
        <>
        {props.popup && <div className='popup-bg'>
            <div className='popup'>
                <form action={props.action}>
                    <h3 className='prompt-title'>{props.title}</h3>
                    {props.incorrect && <div className="error-container">
                    <p className="error-msg">{props.incorrectMsg}</p>
                    </div>}
                    <input name='name' type='text'/>
                    <div className='button-row'>
                        <a onClick={(e)=>{e.preventDefault(); props.setPopup(false); props.setIncorrect(false)}} className='plain-button'>Cancel</a>
                        <input type='submit' value={'Accept'} className='plain-button'/>
                    </div>  
                </form>
            </div>   
        </div>}
        </>
    )
}

export default Popup;