import React, {useState, useEffect, useRef} from 'react';
import commerce from '../lib/Commerce';
import {makeStyles} from '@material-ui/core/styles';
import StripePayment from '../components/StripePayment';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100wv',
        justifyContent: 'space-evenly',
        textAlign: 'left',
        alignItems: 'center',
        background: '#C9D6FF',
        background: '-webkit-linear-gradient(to right, #E2E2E2, #C9D6FF)',
        background: 'linear-gradient(to right, #E2E2E2, #C9D6FF)',
        height: '100vh',
        width: '100vw',
        paddingTop: '2%',
        
  
      },
    title: {
        fontSize: '2rem'
    },
    button: {
        fontSize: '1.2rem',
        padding: '15px',
        width: '250px',
        backgroundColor: 'transparent',
        border: '2px solid rgb(101, 245, 221)',
        outline: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: '0.3s ease-in-out',
        '&:hover': {
            letterSpacing: '5px',
        }
    },
    fieldLabel: {
        display: 'inline-block',
        float: 'left',
        clear: 'left',
        width: '250px',
        textAlign: 'right',
        paddingRight: '10px',
    },
    inputBox: {
        display: 'inline-block',
        float: 'left',
        width: '200px',
        padding: '5px',
        marginBottom: '15px',
    }
})
const Checkout = ({cart}) => {
    const classes = useStyles();
    const [checkoutToken, setCheckoutToken] = useState({});
    const [countries, setCountries] = useState();
    const [country, setCountry] = useState('US');
    const [subdivisions, setSubdivisions] = useState();
    const [subdivision, setSubdivision] = useState();
    const [shippingOptions, setShippingOptions] = useState();
    const [shippingOption, setShippingOption] = useState();

    const inputRef = useRef(null);



    // fetches the list of countries the product can ship to
    const fetchShippingCountries = async (checkoutTokenId) => {
        if (cart.line_items.length) {
            const response = await commerce.services.localeListShippingCountries(checkoutTokenId);
            setCountries(response.countries);
            console.log(countries)
        }
    }

    // fetches subdivisions of the country
    const fetchSubdivisions = async (countryCode) => {
        const response = await commerce.services.localeListSubdivisions(countryCode);
        setSubdivisions(response.subdivisions);
        setSubdivision(Object.keys(response.subdivisions)[0]);
    }

    //fetches current shipping options offered by seller
    const fetchShippingOptions = async (checkoutTokenId, country, stateProvince) => {
        const response = await commerce.checkout.getShippingOptions(checkoutTokenId, {
            country,
            region: 'CA'
        });
        setShippingOptions(response);
        setShippingOption(response[0].id);
        console.log(shippingOption)
        console.log(shippingOptions)
    }

        // generates unique checkout token for transaction
    const generateCheckoutToken = async () => {
        if (cart.line_items.length) {
             const response = commerce.checkout.generateToken(cart.id, {type: 'cart'});
             setCheckoutToken(response);
             
        }
    }

 

    useEffect(() => {
        generateCheckoutToken();
        if (checkoutToken.id) {
            fetchShippingCountries(checkoutToken.id);
        }
    }, [])

    useEffect(() => {
        if (checkoutToken.id) {
            fetchShippingOptions(checkoutToken.id, country); // check this after eating
        }
    }, [country])


    return (
        <form className={classes.root}>
      <h4 className={classes.title}>Customer information</h4>

    <div>
      <label className={classes.fieldLabel} htmlFor="firstName">First name</label>
      <input className={classes.inputBox} type="text" name="firstName" placeholder="Enter your first name" required />
    </div>

    <div>
      <label className={classes.fieldLabel} htmlFor="lastName">Last name</label>
      <input className={classes.inputBox} type="text"  name="lastName" placeholder="Enter your last name" required />
      </div>
      <div>
      <label className={classes.fieldLabel} htmlFor="email">Email</label>
      <input className={classes.inputBox} type="email"  name="email" placeholder="Enter your email" required />
      </div>
      <div>
      <h4 className={classes.title}>Shipping details</h4>
      <p>*Domestic Shipping Only</p>
      </div>

      <div>
      <label className={classes.fieldLabel} htmlFor="shippingName">Full name</label>
      <input className={classes.inputBox} type="text" name="shippingName" placeholder="Enter your shipping full name" required />
      </div>
      <div>
      <label className={classes.fieldLabel} htmlFor="shippingStreet">Street address</label>
      <input className={classes.inputBox} type="text"  name="shippingStreet" placeholder="Enter your street address" required />
      </div>
      <div>
      <label className={classes.fieldLabel} htmlFor="shippingCity">City</label>
      <input className={classes.inputBox} type="text"  name="shippingCity" placeholder="Enter your city" required />
      </div>
      <div>
      <label className={classes.fieldLabel} htmlFor="shippingPostalZipCode">Postal/Zip code</label>
      <input className={classes.inputBox} type="number"  name="shippingPostalZipCode" placeholder="Enter your postal/zip code" required />
      </div>
      <button className={classes.button}>Confirm order</button>
      

    </form>
    )
}

export default Checkout;
