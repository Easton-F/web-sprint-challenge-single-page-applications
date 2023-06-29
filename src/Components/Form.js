import React, { useState, useEffect } from "react";
import * as yup from 'yup';
import axios from "axios";

const schema = yup.object().shape({
    name: yup.string().required().trim().min(2, 'name must be at least 2 characters').required(),
    size: yup.string().oneOf(['small', 'medium', 'large'], 'must select a size!'),
    special: yup.string().trim(),
    topping1: yup.boolean(),
    topping2: yup.boolean(),
    topping3: yup.boolean(),
    topping4: yup.boolean(),
    topping5: yup.boolean()
})

const Form = () => {
    const [form, setForm] = useState({ name: '', size: '', topping1: false, topping2: false, topping3: false, topping4: false, topping5: false, special: ''})
    const [errors, setErrors] = useState({ name: '', size: '', topping1: '', topping2: '', topping3: '', topping4: '', topping5: '', special: ''})
    const [disabled, setDisabld] = useState(true)


    const setFormErrors = (name, value) => {
        yup.reach(schema, name).validate(value)
        .then(() => setErrors({...errors, [name]: ''}))
        .catch(err => setErrors({...errors, [name]: err.errors[0]}))
    }

    console.log('Form', form)

    const change = event => {
        const { value, type, checked, name } = event.target
        const valueToUse = type === 'checkbox' ? checked : value
        setFormErrors(name, valueToUse)
        setForm({...form, [name]: valueToUse})

        console.log('Chang Form', form)
    }

    const submit = event => {
        event.preventDefault()
        const newPizza = { name: form.name, size: form.size, topping1: form.topping1, topping2: form.topping2, topping3: form.topping3, topping4: form.topping4, topping5: form.topping5, special: form.special }
        axios.post('https://reqres.in/api/orders', newPizza)
            .then(res => {
                setForm({ name: '', size: '', topping1: false, topping2: false, topping3: false, topping4: false, topping5: false, special: ''})
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
                <label htmlFor="name-input">What is your name?
                    <input id="name-input" onChange={change} type="text" value={form.name} name="name" placeholder="Enter Name"/>
                </label>
                <label htmlFor="size-select" id="size-dropdown">Choice of Size
                    <select onChange={change} value={form.size} name="size" id="size-select">
                        <option id="select-one" value="">--Select One--</option>
                        <option id="small" value="small">Small</option>
                        <option id="medium" value="medium">Medium</option>
                        <option id="large" value="large">Large</option>
                    </select>
                </label>
                <div>Add Toppings<br />
                    <label htmlFor="pepporoni">Pepporoni
                        <input onChange={change} type="checkbox" checked={form.topping1} name="topping1" id="pepporoni" value="pepporoni"/>
                    </label>
                    <label htmlFor="ham">Ham
                        <input onChange={change} type="checkbox" checked={form.topping2} name="topping2" id="ham" value="ham"/>
                    </label>
                    <label htmlFor="bacon">Bacon
                        <input onChange={change} type="checkbox" checked={form.topping3} name="topping3" id="bacon" value="bacon"/>
                    </label>
                    <label htmlFor="olives">Olives
                        <input onChange={change} type="checkbox" checked={form.topping4} name="topping4" id="olives" value="olives"/>
                    </label>
                    <label htmlFor="pineapple">Pineapple
                        <input onChange={change} type="checkbox" checked={form.topping5} name="topping5" id="pineapple" value="pineapple"/>
                    </label>
                    
                </div>
                <label id="special-text">Special Instructions
                    <input onChange={change} type="text" value={form.special} name="special" placeholder="Enter Instructions"/>
                </label><br />
                <button disabled={disabled} id="order-button">Add to Order</button>
            </form>
        </div>
    )
}

export default Form;