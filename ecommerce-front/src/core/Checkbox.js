import React,{useState,useEffect} from 'react'

const Checkbox = ({categories,handleFilter}) => {

    const [checked,setChecked] = useState([])

    const handleToggle = c => () => {
        const currentCategoryId = checked.indexOf(c);   // Return first index or -1
        const newCheckedCategoryId = [...checked]

        if(currentCategoryId === -1){
            newCheckedCategoryId.push(c)
        }else{
            newCheckedCategoryId.splice(currentCategoryId,1)
        }
        // console.log(newCheckedCategoryId)
        handleFilter(newCheckedCategoryId)
        setChecked(newCheckedCategoryId);
    }

    return categories.map((c,i) => (
        <li key={i} className="list-unstyled">
            <input onChange={handleToggle(c._id)}  type="checkbox" className="form-check-input" />
            <label className="form-check-label" >{c.name}</label>
        </li>
    ))
}


export default Checkbox;