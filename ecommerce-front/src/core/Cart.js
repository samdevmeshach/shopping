import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';
import MediaCard from "./Card";
import {getCart} from './cartHelper'
import {isAuthenticated} from "../auth";

const Cart = () => {
    const [items, setItems] = useState([]);
    // const [cartSize, setCartSize] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr />
                {items.map((product, i) => (
                    <MediaCard
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                        size="col-sm-5"
                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h3>
            <div className="text-danger">Your Cart is empty</div> <br />
            <Link to="/shop">
                <button className="btn btn-warning">
                    Continue shopping
                </button>
            </Link>
        </h3>
    );

    return (
        <Layout title="Shopping Cart" description="Checkout now!" className="container-fluid mt-4">
            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
                <div className="col-6">
                    <h2>Your Cart Summary</h2>
                    <hr />
                    <Checkout
                        products={items}
                        setRun={setRun}
                        run={run}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Cart;