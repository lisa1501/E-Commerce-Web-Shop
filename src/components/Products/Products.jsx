import React from 'react';
import { Grid }from '@material-ui/core';
import Product from './Product/Product';

import useStyles from './styles';

const products =[
    {id:1, name:"Shoes", description:"Running Shoes", price:"$5",image:"https://i.ibb.co/Qp1SXBw/commerce.png"},
    {id:2, name:"Macbook", description:"Apple Macbook", price:"$10", image:"https://i.ibb.co/Qp1SXBw/commerce.png"}
]
    const Products = () => {
        const classes = useStyles();
    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justify="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={6} md={4} lg={3}>
                        <Product product={product} />
                    </Grid>
                ))}

            </Grid>
        </main>
    )
}

export default Products