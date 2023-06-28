import React, { useState, useEffect } from "react";
import * as yup from 'yup';
import axios from "axios";

const schema = yup.object().shape({
    name: yup.string().required().min(2, 'name must be at least 2 characters!'),
    size: yup.string().oneOf(['1', '2', '3'], 'must select a size!'),
    special: yup.string(),
    pepperoni: yup.bool([true])
})

const Form = (props) => {
    const [form, setForm] = useState({ name: '', size: '', topping1: false, special: ''})
    const [errors, setErrors] = useState({ name: '', size: '', topping1: '', 
    special: ''})
    const [disabled, setDisabld] = useState(true)

    const setFormErrors = (name, value) => {
        yup.reach(schema, name).validate(value)
        .then(() => setErrors({...errors, [name]: ''}))
        .catch(err => setErrors({...errors, [name]: err.errors[0]}))
    }

    const change = event => {
        const { value, type, checked, name } = event.target
        const valueToUse = type === 'checkbox' ? checked : value
        setFormErrors(name, valueToUse)
        setForm({...form, [name]: valueToUse})
    }

    const submit = event => {
        event.preventDefault()
        const newPizza = { name: form.name, size: form.size, topping1: form.topping1, special: form.special }
        axios.post('https://reqres.in/api/orders', newPizza)
            .then(res => {
                setForm({ name: '', size: '', topping1: false, special: ''})
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
       schema.isValid(form).then(valid => setDisabld(!valid)) 
    }, [form])

    return (
        <div>
            <div style={{ color: 'red'}}>
                <div>{errors.name}</div> <div>{errors.size}</div> <div>{errors.topping1}</div> <div>{errors.special}</div>
            </div>
            <form id="pizza-form" onSubmit={submit}>
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
                <div>Add Toppings<br />
                    <label>Pepporoni
                        <input onChange={change} type="checkbox" checked={form.topping1} name="pepperoni" />
                    </label>
                    <label>Bacon
                        <input type="checkbox" value={form.topping2} name="bacon" />
                    </label>
                    <label>Ham
                        <input type="checkbox" value={form.topping3} name="ham" />
                    </label>
                    <label>Olives
                        <input type="checkbox" value={form.topping4} name="olives" />
                    </label>
                    <label>Pineapple
                        <input type="checkbox" value={form.topping5} name="pineapple" />
                    </label>
                </div>
                <label id="special-text">Special Instructions
                    <input onChange={change} type="text" value={form.special} name="special"/>
                </label><br />
                <button disabled={disabled} id="order-button">Add to Order</button>
            </form>
        </div>
    )
}

export default Form;