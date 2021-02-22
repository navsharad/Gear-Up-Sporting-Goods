import React, {useState, useEffect} from 'react';
import commerce from '../lib/Commerce';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100wv',
        justifyContent: 'space-between',
        textAlign: 'left',
        alignItems: 'center',
        background: '#C9D6FF',
        background: '-webkit-linear-gradient(to right, #E2E2E2, #C9D6FF)',
        background: 'linear-gradient(to right, #E2E2E2, #C9D6FF)',
        height: '100vh',
        width: '100vw',
        paddingTop: '2%'
  
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
        paddingRight: '10px',
    },
    inputBox: {
        width: '200px',
        padding: '5px',
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

    const [userInfo, setUserInfo] = useState({
        // customer details
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@email.com',
        // shipping details
        shippingName: 'Jane Doe',
        shippingStreet: '123 Fake St',
        shippingCity: 'San Francisco',
        shippingStateProvince: 'CA',
        shippingPostalZipCode: '94107',
        shippingCountry: 'US',
        // Payment details
        cardNum: '4242 4242 4242 4242',
        expMonth: '11',
        expYear: '2023',
        ccv: '123',
        billingPostalZipcode: '94107',
        // Shipping and fulfillment data
        shippingCountries: {},
        shippingSubdivisions: {},
        shippingOptions: [],
        shippingOption: '',
    })



    // fetches the list of countries the product can ship to
    const fetchShippingCountries = async (checkoutTokenId) => {
        if (cart.line_items.length) {
            const response = await commerce.services.localeListShippingCountries(checkoutTokenId);
            setCountries(response.countries);
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
      <input className={classes.inputBox} type="text" value={userInfo.firstName} onChange={e => setUserInfo(prevState => ({...prevState, something : e.target.value}))}name="firstName" placeholder="Enter your first name" required />
    </div>

    <div>
      <label className={classes.fieldLabel} htmlFor="lastName">Last name</label>
      <input className={classes.inputBox} type="text" value={userInfo.lastName} onChange={e => setUserInfo(prevState => ({...prevState, something : e.target.value}))} name="lastName" placeholder="Enter your last name" required />
      </div>
      <div>
      <label className={classes.fieldLabel} htmlFor="email">Email</label>
      <input className={classes.inputBox} type="text" value={userInfo.email} onChange={e => setUserInfo(prevState => ({...prevState, something : e.target.value}))} name="email" placeholder="Enter your email" required />
      </div>
      <h4 className={classes.title}>Shipping details</h4>

      <div>
      <label className={classes.fieldLabel} htmlFor="shippingName">Full name</label>
      <input className={classes.inputBox} type="text" value={userInfo.shippingName} onChange={e => setUserInfo(prevState => ({...prevState, something : e.target.value}))} name="shippingName" placeholder="Enter your shipping full name" required />
      </div>
      <div>
      <label className={classes.fieldLabel} htmlFor="shippingStreet">Street address</label>
      <input className={classes.inputBox} type="text" value={userInfo.shippingStreet} onChange={e => setUserInfo(prevState => ({...prevState, something : e.target.value}))} name="shippingStreet" placeholder="Enter your street address" required />
      </div>
      <div>
      <label className={classes.fieldLabel} htmlFor="shippingCity">City</label>
      <input className={classes.inputBox} type="text" value={userInfo.shippingCity} onChange={e => setUserInfo(prevState => ({...prevState, something : e.target.value}))} name="shippingCity" placeholder="Enter your city" required />
      </div>
      <div>
      <label className={classes.fieldLabel} htmlFor="shippingPostalZipCode">Postal/Zip code</label>
      <input className={classes.inputBox} type="text" value={userInfo.shippingPostalZipCode} onChange={e => setUserInfo(prevState => ({...prevState, something : e.target.value}))} name="shippingPostalZipCode" placeholder="Enter your postal/zip code" required />
      </div>
      <label className={classes.fieldLabel} htmlFor="shippingCountry">Country</label>
  

        <label className={classes.fieldLabel} htmlFor="shippingStateProvince">State/province</label>


        <label className={classes.fieldLabel} htmlFor="shippingOption">Shipping method</label>
  


      <h4 className="checkout__subheading">Payment information</h4>

      <div>
      <label className={classes.fieldLabel} htmlFor="cardNum">Credit card number</label>
      <input className={classes.inputBox} type="text" name="cardNum" value={userInfo.cardNum} onChange={e => setUserInfo(prevState => ({...prevState, something : e.target.value}))} placeholder="Enter your card number" />
      </div>
      <div>
      <label className={classes.fieldLabel} htmlFor="expMonth">Expiry month</label>
      <input className={classes.inputBox} type="text" name="expMonth" value={userInfo.expMonth} onChange={e => setUserInfo(prevState => ({...prevState, something : e.target.value}))} placeholder="Card expiry month" />
      </div>
      <div>
      <label className={classes.fieldLabel} htmlFor="expYear">Expiry year</label>
      <input className={classes.inputBox} type="text" name="expYear" value={userInfo.expYear} onChange={e => setUserInfo(prevState => ({...prevState, something : e.target.value}))} placeholder="Card expiry year" />
      </div>
      <div>
      <label className={classes.fieldLabel} htmlFor="ccv">CCV</label>
      <input className={classes.inputBox} type="text" name="ccv" value={userInfo.ccv} onChange={e => setUserInfo(prevState => ({...prevState, something : e.target.value}))} placeholder="CCV (3 digits)" />
      </div>
      <button className={classes.button}>Confirm order</button>
      

    </form>
    )
}

export default Checkout;
