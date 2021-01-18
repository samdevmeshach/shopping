import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getProducts} from "./apiCore";
import MediaCard from './Card'

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
        <Layout title="Home Page" description="E-commerce App" className="container-fluid">
            <h2>New Arrival</h2>
            <div className="row">
                { productsByArrival.map((product,i) => {
                    return <MediaCard product={product} key={i} />
                })}
            </div>
            <hr />
            <h2>Best Seller</h2>
            <div className="row">
                { productsBySell.map((product,i) => {
                    return <MediaCard product={product} key={i} />
                })}
            </div>
        </Layout>
    )
}

export default Home
