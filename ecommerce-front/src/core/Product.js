import React,{useState,useEffect,Fragment} from 'react'
import Layout from './Layout'
import {read,relatedProducts} from "./apiCore";
import Menu from "./Menu";
import Card from './Card'
import Search from "./Search";
import Grid from '@material-ui/core/Grid'


const Product = (props) => {

    const [product,setProduct] = useState({})
    const [error,setError] = useState(false)
    const [relatedProduct,setRelatedProduct] = useState([])

    const loadProduct = (productId) => {
            read(productId).then((data) => {
                if(data.error){
                    setError(data.error)
                }else {
                    setProduct(data)
                }
            })

            relatedProducts(productId).then((data) => {
                if(data.error){
                    setError(data.error)
                }else {
                    setRelatedProduct(data)
                    console.log('relatedProduct',data)
                }
            })
    }


    useEffect(() => {
        const productId = props.match.params.productId;
        loadProduct(productId)
    },[props])

    return (
        <Layout title="Product Page" description="" className="container-fluid">
            <div className="row ml-3">
                <div className="col-5">
                    {
                        product &&
                        product.description &&
                        <Card
                            product={product}
                            showViewProductButton={false}
                        />
                    }
                </div>
                <div className="col-sm-7">
                    <h2>Related Products</h2>
                    <div className="row">
                        {
                            relatedProduct.map((product,i) => {
                                return <Card product={product} key={i} />
                            })
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Product