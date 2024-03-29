# Welcome To MyOffice
Developed an e-commerce website in which users can shop and place office items. Implemented a shipping address form by using react-hook-form and international/domestic shipping fee options.
Designed and developed payment workflow on the stripe payment processing platform, both store owners and users receive a confirmation email with order details from Commerce.js when users complete the payment
<br>
## Installation

- `git clone https://github.com/lisa1501/E-Commerce-Web-Shop.git`
- `cd E-Commerce-Web-Shop`
- install npm in the terminals
  - `npm install`
 - in your terminal, run npm start
- Next create a .env file in current directory. It should contain the following information.
```bash
  REACT_APP_CHEC_PUBLIC_KEY=
  REACT_APP_STRIPE_PUBLIC_KEY=
  
```
# Technologies Used
Implemented backend by calling commerce.js API. The frontend by using Javascript, and React. styled with the use of CSS modules.
<br>

# Components

## Products
On the main page the application renders a list of available products for user purchasing. On these individual product cards there is a product name, price, description and add to shopping cart button.
<br>

![image](https://github.com/lisa1501/E-Commerce-Web-Shop/blob/main/images/products.png)
###  - Add to shopping cart
users click the shopping cart icon on the individual shopping cart and the shopping cart where the top-right corner of the main page will update with a total number of user-selected items.
<br>

```javascript
 //---------------------------------product--------------------------------
 const Product = ({ product, onAddToCart }) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.image.url} title={product.name} />
            <CardContent>
                <div className={classes.CardContent}>
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" />
            </CardContent>
            <CardActions disableSpacing className={classes.CardActions}>
                <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}
//---------------------------------Products--------------------------------
const Products = ({ products,onAddToCart }) => {
        // console.log(products)
    const classes = useStyles();
    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justify="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart}/>
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}
//---------------------------------Add product to cart--------------------------------
const fetchProducts = async () =>{
        const { data } = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }

    const handlleAddToCart = async (productId, quantity) =>{
        const item = await commerce.cart.add(productId, quantity);
        setCart(item)
    }
 
```
<br>

## Cart
After clicking the shopping cart where on the topright coner of the manin page, users will navigate to the shopping cart info page.

<br>

![image](https://github.com/lisa1501/E-Commerce-Web-Shop/blob/main/images/cart.png)
###  - Update item
<br>

```javascript
 //---------------------------------update quantity & Remove item--------------------------------
 const handleUpdateCartQty = async (productId, quantity) => {
        const  item  = await commerce.cart.update(productId, { quantity });
        setCart(item);
    };

    const handleRemoveFromCart = async (productId) =>{
        const  item  = await commerce.cart.remove(productId);
        setCart(item);
    }
 
 
 const FilledCart = () => (
        <>
            <Grid container spacing={3} > 
                {cart.line_items.map((item) =>(
                    
                    <Grid item xs={4} key={item.id}>
                        <CartItem item={item} 
                        onUpdateQty={handleUpdateCartQty}
                        onRemoveFromCart={handleRemoveFromCart}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Subtotal: { cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>
                        Empty Cart
                    </Button>
                    <Button className={classes.checkoutButton} component={Link} to="/checkout" size="large" type="button" variant="contained" color="primary">
                        Checkout
                    </Button>
                </div>
            </div>
        </>
    )

    if(!cart.line_items) return 'Loading...';
    
//---------------------------------empty shopping cart--------------------------------
const handleEmptyCart = async (productId) =>{
        const  item  = await commerce.cart.empty(productId);
        setCart(item);
    }

<div>
    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>
        Empty Cart
    </Button>
</div>
const EmptyCart = () => (
        <Typography variant="subtitle1">
            You have no items in your shopping cart,
            <Link to="/" className={classes.link}>start adding some!</Link>
        </Typography>
); 
 
```
<br>

## Checkout
After clicking the checkout button, users will be asked to finish two forms, shipping address, and payment details. After successfully completing these two forms, Commerce.js send a confirmation email both to the customer and the store. For this project, I used a stripe demo card for payment and navigate to confirm page.

<br>

![image](https://github.com/lisa1501/E-Commerce-Web-Shop/blob/main/images/addressform.png)
![image](https://github.com/lisa1501/E-Commerce-Web-Shop/blob/main/images/paymentform.png)


###  - payment confirmation


<br>

```javascript
 //---------------------------------Checkout--------------------------------
 const Checkout = ({cart, order,onCaptureCheckout,error,handleEmptyCart}) => {

    const classes = useStyles();
    const history = useNavigate();
    const [isFinished, setIsFinished] = useState(false)
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({})

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type:'cart'});
                console.log(token)
                setCheckoutToken(token)
            } catch (error){
                history.pushState('/')

            }
        }
        generateToken();
    },[cart]);
    

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const next = (data) => {
        setShippingData(data);
        nextStep();
    }
    // user use Stripe demo card ,424242.... 
    const timeout = () =>{
        setTimeout(() =>{
            setIsFinished(true)
            handleEmptyCart(cart)
        },3000);
    } 

    <>  
        <div>
            <Typography variant='h5'>Thank you for your purchase</Typography>
            <Divider className={classes.divider}/>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button" >Back to Home</Button>
    </>
 
```

 <br>

![image](https://github.com/lisa1501/E-Commerce-Web-Shop/blob/main/images/confirmation.png)

 <br>

