import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getCategories,getFilteredProducts} from "./apiCore";
import Checkbox from "./Checkbox";
import {prices} from './fixedPrice'
import RadioBox from './RadioBox'
import Card from "./Card";


const Shop = () => {

    const [myFilter,setMyFilter] = useState({
        filter:{category:[],price:[]}
    })
    const [categories,setCategories] = useState([])
    const [error,setError] = useState(false)
    const [limit,setLimit] = useState(6)
    const [skip,setSkip] = useState(0)
    const [size,setSize] = useState(0)
    const [filterdResults,setFilteredResults] = useState([])


    const init = () => {
        getCategories().then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setCategories(data)
            }
        })
    }

    useEffect(() => {
        init();
        loadFilteredResult(skip,limit,myFilter.filter)
    },[])


    const handleFilter = (filter,filterBy) => {
        const newFilter = {...myFilter}
        newFilter.filter[filterBy] = filter

        if(filterBy === 'price') {
            let priceValue = handlePrice(filter)
            newFilter.filter[filterBy] = priceValue
        }

        loadFilteredResult(myFilter.filter)
        setMyFilter(newFilter)
    }

    const handlePrice = value => {
        const data = prices
        let array = []

        for(let key in data){
            if(data[key]._id === parseInt(value)){
                array = data[key].array;
            }
        }
        return array;
    }

    const loadFilteredResult = (newFilter) => {
        getFilteredProducts(skip,limit,newFilter).then((data) => {
            if(data.error){
                setError(data.error)
            }else {
                setFilteredResults(data.data)
                setSize(data.size)
                setSkip(0)
            }
        })
    }

    const loadMore = () => {

        let toSkip = skip + limit
        setLimit(toSkip)
        getFilteredProducts(toSkip,limit,myFilter.filter).then((data) => {
            if(data.error){
                setError(data.error)
            }else {
                setFilteredResults([...filterdResults, ...data.data])
                setSize(data.size)
                setSkip(0)
            }
        })
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button className="btn btn-warning mb-5" onClick={loadMore}>
                    Load More
                </button>
            )
        )
    }

    return(
        <Layout title="Shop Page" description="E-commerce App" className="container-fluid mt-4">
            <div className="row">
                <div className="col-2 mt-3">
                    <h4>Filter By Categories</h4>
                    <ul>
                        <Checkbox
                            categories={categories}
                            handleFilter={filter => handleFilter(filter,'category')}
                        />
                    </ul>

                    <h4>Filter By Price</h4>
                    <div>
                        <RadioBox
                            prices={prices}
                            handleFilter={filter => handleFilter(filter,'price')}
                        />
                    </div>
                </div>
                <div className="col-10">
                    <div className="row">
                        { filterdResults.map((product,i) => {
                            return <Card product={product} key={i} />
                        })}
                    </div>
                    <hr />
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
    )
}

export default Shop