import React, { useState } from "react";
import * as yup from 'yup';
import { toppings } from "./toppings";

const schema = yup.object().shape({
    name: yup.string().required('name must be at least 2 characters!'),
    size: yup.string().oneOf(['1', '2', '3'], 'must select a size!')
})

const Form = (props) => {
    const [form, setForm] = useState({ name: '', size: '', topping: '', special: ''})

    const change = event => {
        const { value, type, checked, name } = event.target
        const valueToUse = type === 'checkbox' ? checked : value
        setForm({...form, [name]: valueToUse})
    }

    return (
        <div>
            <form id="pizza-form">
                <h1>Build Your Own Pizza!</h1>
                <label id="name-input">What is your name?
                    <input onChange={change} type="text" value={form.name} name="name"/>
                </label>
                <label id="size-dropdown">Choice of Size
                    <select onChange={change} value={form.size} name="size">
                        <option value="">--Select One--</option>
                        <option value="1">Small</option>
                        <option value="2">Medium</option>
                        <option value="3">Large</option>
                    </select>
                </label>
                <div>Add Toppings
                {toppings.map(({ name }) => {
                    return (
                        <div>
                            <input 
                                type="checkbox"
                                name={name}
                                value={name}
                            />
                            <label>{name}</label>
                        </div>
                    );
                })}
                </div>
                <label id="special-text">Special Instructions
                    <input onChange={change} type="text" value={form.special} name="special"/>
                </label>
            </form>
        </div>
    )
}

export default Form;