import React,{useState} from 'react'

const RadioBox = ({prices,handleFilter}) => {
    const [value,setValue] = useState(0)

    const handleChange = (event) => {
        handleFilter(event.target.value)
        setValue(event.target.value)
    }

    return prices.map((p,i) => (
        <div key={i}>
            <input
                onChange={handleChange}
                type="radio"
                name={p}
                value={`${p._id}`}
                className="mr-2 ml-4"
            />
            <label className="form-check-label" >{p.name}</label>
        </div>
    ))
}

export default RadioBox


