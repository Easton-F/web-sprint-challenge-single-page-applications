import React from "react";

const Form = (props) => {

    return (
        <div>
            <form>
                <h1>Build Your Own Pizza!</h1>
                <label>Choice of Size
                    <select>
                        <option>--Select One--</option>
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                    </select>
                </label>
                <label>Choice of Sauce
                    
                </label>
            </form>
        </div>
    )
}

export default Form;