import React, { useState } from 'react';
import { Link, Redirect,useHistory } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import {FaCartPlus} from 'react-icons/fa'
import { addItem, updateItem, removeItem } from './cartHelper';

const Card = ({
                  product,
                  showViewProductButton = true,
                  showAddToCartButton = true,
                  cartUpdate = false,
                  showRemoveProductButton = false,
                  setRun = f => f,
                  run = undefined,
                  style = {width: "15rem",cursor:"pointer"},
                  imageStyle={maxHeight:"200px",maxWidth:"200px",width:"200px",height:"200px"}
                  // changeCartSize
              }) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);
    let history = useHistory();


    const productPage = () => {
        history.push(`/product/${product._id}`);
    }

    const addToCart = () => {
        addItem(product,() => setRedirect(true));
    };

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />;
        }
    };

    const showAddToCartBtn = showAddToCartButton => {
        return (
            showAddToCartButton && (
                <button onClick={addToCart} className="btn btn-sm btn-warning">
                    Add to cart
                </button>
            )
        );
    };

    const showStock = quantity => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill">In Stock </span>
        ) : (
            <span className="badge badge-danger badge-pill">Out of Stock </span>
        );
    };

    const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    };

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div>
                    <div className="input-group ">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Adjust Quantity</span>
                        </div>
                        <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
                    </div>
                </div>
            )
        );
    };
    const showRemoveButton = showRemoveProductButton => {
        return (
                showRemoveProductButton && (
                <button
                    onClick={() => {
                        removeItem(product._id);
                        setRun(!run); // run useEffect in parent Cart
                    }}
                    className="btn btn-danger"
                >
                    Remove Product
                </button>
            )
        );
    };
    return (
        <div className="card ml-3 mt-3" style={style}>
            <div className="card-body" onClick={productPage}>
                {shouldRedirect(redirect)}
                <ShowImage item={product} url="product" imageStyle={imageStyle} />
                <div className="text-monospace">{product.name} </div>
                <div className="text-monospace">Rs.{product.price}</div>
                <div className="text-monospace">Category: {product.category && product.category.name}</div>
                <div className="text-monospace">Added on {moment(product.createdAt).fromNow()}</div>
                {showStock(product.quantity)}
                {/*<br />*/}



                {/*{showViewButton(showViewProductButton)}*/}
            </div>
            {showCartUpdateOptions(cartUpdate)}
            {showAddToCartBtn(showAddToCartButton)}
            {showRemoveButton(showRemoveProductButton)}
        </div>
    );
};

export default Card;