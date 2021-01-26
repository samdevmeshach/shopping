import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom';
// import Checkout from './Checkout';
import MediaCard from "./Card";
import {getCart} from './cartHelper'
import RelatedProductCard from "./RelatedProductCard";

const Cart = () => {
    const [items, setItems] = useState([]);
    // const [cartSize, setCartSize] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        console.log('MAX DEPTH ...');
        setItems(getCart());
    }, [items]);

    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr />
                {items.map((product, i) => (
                    <RelatedProductCard
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>
            Your Cart is empty. <br />
            <Link to="/shop"> Continue shopping. </Link>
        </h2>
    );

    return (
        <Layout title="Shopping Cart" description="Checkout now!" className="container-fluid">
            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
                <div className="col-6">
                    <h2>Your Cart Summary</h2>
                    <hr />
                    {/*<Checkout products={items} />*/}
                </div>
            </div>
        </Layout>
    );
};

export default Cart;