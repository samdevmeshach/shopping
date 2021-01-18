import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getProducts} from "./apiCore";
import MediaCard from './Card'

const Shop = () => {
    return(
        <Layout title="Shop Page" description="E-commerce App" className="container-fluid">
            <div className="row">
                <div className="col-4">
                    Left Side Bar
                </div>
                <div className="col-8">
                    Right Side Bar
                </div>
            </div>
        </Layout>
    )
}

export default Shop