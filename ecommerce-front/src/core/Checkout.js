import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import {createOrder} from './apiCore'
import {deleteCart} from './cartHelper'
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const Checkout = ({ products, setRun = f => f, run = undefined }) => {

    const {user,token} = isAuthenticated()
    const [error,setError] = useState(false)
    const [success,setSuccess] = useState(false)
    const [address,setAddress] = useState()

    const getTotal = () => {
        return products &&  products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const placeOrder = () => {
        const orders = {
            products:products,
            amount:getTotal(),
            address:address
        }
        createOrder(user._id,token,orders).then((data) => {
            if(data.error){
                setError(true)
            }else{
                deleteCart()
                setRun(!run);
                setSuccess(true)
            }
        })
    }

    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false)
    };

    const showSuccess =() => (
        <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSuccess}>
            <Alert onClose={handleCloseSuccess} severity="success">
                Checked out successfully
            </Alert>
        </Snackbar>
    )

    const handleChange = (event) => {
        setAddress(event.target.value)
    }

    const showCheckout = () => {
        if(products.length > 0){
            return isAuthenticated() ? (
                <div>
                    <h3>Checkout Address</h3>
                    <textarea type="text" onChange={handleChange} className="input-group mb-3" placeholder="Enter your address"/>
                    <button onClick={placeOrder} className="btn btn-warning mt-2">Checkout</button>
                </div>
            ) : (
                <Link to="/signin">
                    <button className="btn btn-primary">Sign in to checkout</button>
                </Link>
            );
        }
    };

    const checkOutTable =() => {
        if(products.length > 0){
            return(
                <tbody>
                {products && products.map((product,i) => {
                    return(
                        <tr key={i}>
                            <th scope="row">{i+1}</th>
                            <td>{product.name}</td>
                            <td>{product.count}</td>
                            <td>{product.price}</td>
                            <td>{product.price*product.count}</td>
                        </tr>
                    )
                })}
                </tbody>
            )
        }
    }

    return (
        <div>
            <table className="table table-sm table-active table-bordered">
                <thead>
                <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Product</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Subtotal</th>
                </tr>
                </thead>
                {checkOutTable()}
            </table>
            <h4 className="mt-0 float-right">Total: Rs.{getTotal()}</h4>
            {showCheckout()}
            {showSuccess()}
        </div>
    );
};

export default Checkout;