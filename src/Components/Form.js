import React, { useState } from "react";
import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required('name must be at least 2 characters!'),
    size: yup.string().oneOf(['1', '2', '3'], 'must select a size!')
})

const Form = (props) => {
    const [form, setForm] = useState({ name: '', size: ''})

    return (
        <div>
            <form id="pizza-form">
                <h1>Build Your Own Pizza!</h1>
                <label id="name-input">What is your name?
                    <input type="text" value={form.name}/>
                </label>
                <label id="size-dropdown">Choice of Size
                    <select value={form.size}>
                        <option value="">--Select One--</option>
                        <option value="1">Small</option>
                        <option value="2">Medium</option>
                        <option value="3">Large</option>
                    </select>
                </label>
                <label>Choice of Sauce
                    
                </label>
            </form>
        </div>
    )
}

export default Form;