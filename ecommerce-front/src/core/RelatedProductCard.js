import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import API from "../config";
import {Link} from 'react-router-dom'
import {updateItem,removeItem} from './cartHelper'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        marginTop:20,
        width:240
    },
    media: {
        height: 140,
    },
});

const RelatedProductCard = ({product,showAddToCartButton=true,cartUpdate=false,showRemoveProductButton=false}) => {
    const classes = useStyles();
    const [count,setCount] = useState(product.count)


    const showCartButton = () => {
        if(showAddToCartButton) {
            return(
                <Button variant="outlined" color="primary" >
                    Add to Cart
                </Button>
            )
        }
    }

    const showRemoveButton = (showRemoveProductButton) => {
        return showRemoveProductButton && (
            <Button variant="outlined" color="secondary" onClick={()=>removeItem(product._id)} >
                Remove Product
            </Button>
        )
    }

    const handleChange = productId => event => {
        setCount(event.target.value < 1 ? 1 : event.target.value)
        console.log(event.target.value)
        if(event.target.value >= 1){
            updateItem(productId,event.target.value)
        }
    }

    const showCartUpdate = (cartUpdate) => {
            return cartUpdate && (
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Adjust Quantity</span>
                    </div>
                    <input
                        type="number"
                        value={count}
                        className="form-control"
                        onChange={handleChange(product._id)}
                    />
                </div>
            )
        }

    return (
        <div className="col-sm-4">
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={`${API}/product/photo/${product._id}`}
                        title={product.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {product.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {product.description.substring(0,100)}
                        </Typography>
                        <Typography variant="h5" color="textSecondary" component="p">
                            Rs.{product.price}
                        </Typography>
                        {showCartUpdate(cartUpdate)}
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Link to={`/product/${product._id}`}>
                        <Button variant="contained" color="primary" >
                            View Product
                        </Button>
                    </Link>
                    {showCartButton(showAddToCartButton)}
                    {showRemoveButton(showRemoveProductButton)}
                </CardActions>
            </Card>
        </div>
    );
}

export default RelatedProductCard
