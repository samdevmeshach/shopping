import React, {useEffect, useState} from "react";
import {isAuthenticated} from '../auth'
import {listOrders,getStatusValue} from "./apiAdmin";
import Layout from "../core/Layout";
import {Link} from 'react-router-dom'
import moment from "moment";


const Order = () => {
    const [orders,setOrders] = useState([])
    const [statusValues,setStatusValues] = useState([])
    const [error,setError] = useState(false)

const {user,token} = isAuthenticated()


    useEffect(() => {
        loadOrders()
        loadStatus()
    },[])

    const loadOrders = () => {
        listOrders(user._id,token).then(data => {
            if(data.error){
                setError(data.error)
            }else {
                setOrders(data)
                console.log(data)
            }
        })
    }
    const loadStatus = () => {
        getStatusValue(user._id,token).then(data => {
            if(data.error){
                setError(data.error)
            }else {
                setStatusValues(data)
                console.log(statusValues)
            }
        })
    }

    const handleStatusChange = () => {
        //
    }

    const showStatus = o => {
        return(
            <div className="form-group">
                <h3 className="mark mb-4"> Status : {o.status}</h3>
                <select className="form-control" onChange={(event) => handleStatusChange(event,o._id)}>
                    <option>Update Status</option>
                    {statusValues.map((status,index) => (
                        <option key={index} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>
        )
    }


    const goBack = () => (
        <div className="mt-2">
            <Link to="/admin/dashboard" >
                <button className="btn btn-warning">
                    Back to Dashboard
                </button>
            </Link>
        </div>
    )

    const orderCount = (orders) =>{
        if(orders.length < 0){
            return (
                <div>
                    <h2 className="text-danger">No new Orders</h2>
                    <Link to='/admin/dashboard'>
                        <button className="btn btn-warning">back to dashboard</button>
                    </Link>
                </div>
            )
        }else {
            return <h2 className="text-danger text-sm-left mt-2">Total Order {orders.length}</h2>
        }
    }


    const showPorduct = (key,value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input type="text" value={value} className="form-control" readOnly />
        </div>
    )


    return(
        <Layout className="container-fluid">
            {goBack()}

            <div className="row">
                <div className="col-md-8 offset-2">
                    {orderCount(orders)}
                    {orders.map((o,oIndex) => {
                        return(
                            <div key={oIndex}>
                                <h2 className="mt-2 btn-primary">Order ID : {o._id}</h2>
                                <ul className="list-group mb-2">
                                    <li className="list-group-item">
                                        {showStatus(o)}
                                    </li>
                                    <li className="list-group-item">
                                        Amount : Rs. {o.amount}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered By : {o.user.name}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered On : {moment(o.createdAt).fromNow()}
                                    </li>
                                    <li className="list-group-item">
                                        Delivary address : {o.address}
                                    </li>
                                </ul>
                                <h2 className="mt-2 mb-4">Total Product Count : {o.products.length}</h2>
                                <p>
                                    <button className="btn btn-secondary" type="button" data-bs-toggle="collapse"
                                            data-bs-target={`#collapseExample${oIndex}`} aria-expanded="false"
                                            aria-controls="collapseExample">
                                        Show Products
                                    </button>
                                </p>
                                {o.products.map((p,pIndex) => {
                                    return(
                                        <div key={pIndex}>
                                            <div className="collapse" id={`collapseExample${oIndex}`}>
                                                <div className="card card-body">
                                                    {showPorduct("Product Id",p._id)}
                                                    {showPorduct("Product Name",p.name)}
                                                    {showPorduct("Product Price",p.price)}
                                                    {showPorduct("Quantity",p.count)}
                                                    <hr/>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </Layout>
    )

}


export default Order