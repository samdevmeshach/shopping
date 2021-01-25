import React from 'react';
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
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import moment from 'moment'

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
        width:450,
    },
    media: {
        height: 300,
    },
});

const ProductCard = ({product}) => {

    const stock = (quantity) => {
        if(quantity < 1) {
            return <span className="badge badge-primary badge-pill"> Out of stock</span>
        }else {
            return <span className="badge badge-primary badge-pill"> In stock</span>
        }
    }

    const classes = useStyles();
    return (
        <div className="col-sm-3">
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
                        <Typography variant="h6" color="textSecondary" component="p">
                            {product.description.substring(0,100)}
                        </Typography>
                        <Typography variant="h5" color="textSecondary" component="p">
                            Rs.{product.price}
                        </Typography>
                        <Typography variant="p" color="textSecondary" component="p">
                            Added on {moment(product.createdAt).fromNow()}
                        </Typography>
                        {stock(product.quantity)}
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Link>
                        <IconButton color="primary" aria-label="add to shopping cart">
                            <AddShoppingCartIcon />
                        </IconButton>
                    </Link>
                </CardActions>
            </Card>
        </div>
    );
}

export default ProductCard
