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

const RelatedProductCard = ({product}) => {
    const classes = useStyles();
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
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Link to={`/product/${product._id}`}>
                        <Button variant="outlined" color="primary" >
                            View Product
                        </Button>
                    </Link>
                    <Button variant="outlined" color="primary" >
                        Add to Cart
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default RelatedProductCard
