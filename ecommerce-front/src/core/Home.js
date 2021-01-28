import React,{useState,useEffect,Fragment} from 'react'
import Layout from './Layout'
import {getProducts} from "./apiCore";
import Card from './Card'
import Search from "./Search";
const Home = () => {

    const [productsBySell,setProductsBySell] = useState([]);
    const [productsByArrival,setProductsByArrival] = useState([]);
    const  [error,setError] = useState(false)

    const init = () => {
        getProducts('sold').then(data => {
            if(data.error){
                setError(data.error)
            }else {
                setProductsBySell(data)
                console.log('home',data)
            }
        })

        getProducts('createdAt').then(data => {
            if(data.error){
                setError(data.error)
            }else {
                setProductsByArrival(data)
            }
        })
    }

    useEffect(() => {
        init();
    },[])

    return (
            <Layout title="Home Page" description="E-commerce App" className="container-fluid mt-4">
                <Search />
                <h2 className="text-secondary text-sm-center mt-2">New Arrival</h2>
                <div className="row">
                    { productsByArrival.map((product,i) => {
                        return <Card product={product} key={i} />
                    })}
                </div>
                <hr />
                <h2 className="text-secondary text-sm-center mt-2">Best Seller</h2>
                <div className="row">
                    { productsBySell.map((product,i) => {
                        return <Card product={product} key={i} />
                    })}
                </div>
            </Layout>
    )
}

export default Home
