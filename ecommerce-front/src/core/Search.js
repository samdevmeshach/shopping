import React, {useEffect, useState} from "react";
import {getCategories,list} from './apiCore'
import MediaCard from "./Card";

const Search = () => {

    const [value, setValue] = useState({
        categories:[],
        category:'',
        search:'',
        results:[],
        searched:false
    })

    const {categories,category,search,results,searched} = value

    const loadCategory = () => {
        getCategories().then((data) => {
            if(data.error) {
                console.log(data.error)
            }else{
                setValue({...value,categories: data})
            }
        })
    }

    useEffect(() => {
        loadCategory()
    },[])


    const searchData = () =>{
        // console.log(search,category)
        if(search) {
            // setValue({...value,re})
            list({search: search || undefined,category: category})
                .then(response => {
                    if(response.error){
                        console.log(response.error)
                    }else {
                        setValue({...value,results: response,searched: true})
                    }
                })
        }
    }

    const searchSubmit = (e) => {
        e.preventDefault()
        searchData();
    }

    const handleChange = name => event => {
        setValue({...value,[name]:event.target.value,searched: false})
    }

    const searchMessage = (searched,result) => {
        if (searched && result.length > 0) {
            return `Found ${result.length} Products`
        }
        if (searched && result.length < 1){
            return `No product found`
        }
    }

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange("category")}>
                            <option value="All">All</option>
                            {categories.map((c,i) => {
                                return (<option key={i} value={c._id}>{c.name}</option>)
                            })}
                        </select>
                    </div>
                    <input
                        type="search"
                        className="form-control"
                        onChange={handleChange("search")}
                        placeholder="Search by name"
                    />
                </div>
                <div className="btn input-group-append" style={{border:'none'}}>
                    <button className="btn btn-primary">Search</button>
                </div>
            </span>
        </form>
    )

    return(
        <div className="row">
            <div className="container">
                {searchForm()}
            </div>
            <div className="container-fluid">
                <h2 className="mt-4 mb-4">
                    {searchMessage(searched,results)}
                </h2>
                <div className="row">
                    { results.map((product,i) => {
                        return <MediaCard product={product} key={i} />
                    })}
                </div>
            </div>
        </div>
    )
}


export default Search