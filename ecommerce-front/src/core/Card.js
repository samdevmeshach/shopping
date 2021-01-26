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
import {Link, Redirect} from 'react-router-dom'
import {addItem} from './cartHelper'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        marginTop:20
    },
    media: {
        height: 140,
    },
});

const MediaCard = ({product,size="col-sm-3"}) => {

    const [redirect,setRedirect] = useState(false)

    const addToCart = () => {
        addItem(product,() => {
            setRedirect(true)
        })
    }

    const shouldRedirect = redirect => {
        if(redirect) {
            return <Redirect to="/cart" />
        }
    }


    const classes = useStyles();
    return (
        <div className={size}>
        <Card className={classes.root}>
            {shouldRedirect(redirect)}
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
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Link to={`/product/${product._id}`}>
                    <Button variant="outlined" color="primary" >
                        View Product
                    </Button>
                </Link>
                <Button onClick={addToCart} variant="outlined" color="primary" >
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
        </div>
    );
}

export default MediaCard
