import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import Product from '../Products/Product/Product';

const Review = ({checkoutToken}) => {
    console.log(checkoutToken)
  
    console.log(checkoutToken.line_items)
  return (
    <>
        <Typography variant='h6' gutterBottom>Order summary</Typography>
        <List disablePadding>
            {checkoutToken.line_items.map((product)=>(
                <ListItem style={{padding:'10px 0'}} key={Product.name}>
                    <ListItemText primary={product.name} secondary={`Quantity:${product.quantity}`}></ListItemText>
                    <Typography variant='body2'>{product.line_total.formatted_with_symbol}</Typography>
                </ListItem>
            ))}
            <ListItem style={{padding: '10px 0'}}>
                <ListItemText primary="Total" />
                <Typography variant='subtitle' style={{ fontWeight:700}}>
                    {checkoutToken.subtotal.formatted_with_symbol}
                </Typography>
            </ListItem>
        </List>
    </>
  )
}

export default Review