import { WhereToVote } from '@material-ui/icons';
import React, {useState, useEffect} from 'react';
import commerce from '../lib/Commerce';

const Checkout = ({cart}) => {
    const [checkoutToken, setCheckoutToken] = useState({});
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
        const response = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setUserInfo(prevState => ({
            ...prevState,
            shippingCountries: response.countries
        }));

    }

    // fetches subdivisions of the country
    const fetchSubdivisions = async (countryCode) => {
        const response = await commerce.services.localeListSubdivisions(countryCode);
        setUserInfo(prevState => ({
            ...prevState,
            shippingSubdivisions: response.subdivisions
        }));
    }

    //fetches current shipping options offered by seller
    const fetchShippingOptions = async (checkoutTokenId, country) => {
        const response = await commerce.checkout.getShippingOptions(checkoutTokenId, {
            country: country,
            region: 'CA'
        });

        const shippingOption = response[0] || null;
        setUserInfo(prevState => ({
            ...prevState,
            shippingOptions: response,
            shippingOption: shippingOption,
        }));
    }

    // generates unique checkout token for transaction
    const generateCheckoutToken = async () => {
        if (cart.line_items.length) {
            const response = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
            setCheckoutToken(response); 
        }
    }

    useEffect(() => {
        generateCheckoutToken();
        fetchShippingCountries(checkoutToken.id);
        fetchShippingOptions(checkoutToken.id, userInfo.shippingCountry);
    }, [])

    return (
        <form className="checkout__form">
      <h4 className="checkout__subheading">Customer information</h4>

      <label className="checkout__label" htmlFor="firstName">First name</label>
      <input className="checkout__input" type="text" value={userInfo.firstName} name="firstName" placeholder="Enter your first name" required />

      <label className="checkout__label" htmlFor="lastName">Last name</label>
      <input className="checkout__input" type="text" value={userInfo.lastName}name="lastName" placeholder="Enter your last name" required />

      <label className="checkout__label" htmlFor="email">Email</label>
      <input className="checkout__input" type="text" value={userInfo.email} name="email" placeholder="Enter your email" required />

      <h4 className="checkout__subheading">Shipping details</h4>

      <label className="checkout__label" htmlFor="shippingName">Full name</label>
      <input className="checkout__input" type="text" value={userInfo.shippingName} name="shippingName" placeholder="Enter your shipping full name" required />

      <label className="checkout__label" htmlFor="shippingStreet">Street address</label>
      <input className="checkout__input" type="text" value={userInfo.shippingStreet} name="shippingStreet" placeholder="Enter your street address" required />

      <label className="checkout__label" htmlFor="shippingCity">City</label>
      <input className="checkout__input" type="text" value={userInfo.shippingCity} name="shippingCity" placeholder="Enter your city" required />

      <label className="checkout__label" htmlFor="shippingPostalZipCode">Postal/Zip code</label>
      <input className="checkout__input" type="text" value={userInfo.shippingPostalZipCode} name="shippingPostalZipCode" placeholder="Enter your postal/zip code" required />

      <label className="checkout__label" htmlFor="shippingCountry">Country</label>
        <select
        value={userInfo.shippingCountry}
        name="shippingCountry"
        className="checkout__select"
        >
        <option disabled>Country</option>
        {
            Object.keys(userInfo.shippingCountries).map((index) => {
            return (
                <option value={index} key={index}>{userInfo.shippingCountries[index]}</option>
            )
            })
        };
        </select>

        <label className="checkout__label" htmlFor="shippingStateProvince">State/province</label>
        <select 
        value={userInfo.shippingStateProvince}
        name="shippingStateProvince"
        className="checkout__select"
        >
        <option className="checkout__option" disabled>State/province</option>
        {
            Object.keys(userInfo.shippingSubdivisions).map((index) => {
            return (
                <option value={index} key={index}>{userInfo.shippingSubdivisions[index]}</option>
            );
            })
        };
        </select>

        <label className="checkout__label" htmlFor="shippingOption">Shipping method</label>
        <select
        value={userInfo.shippingOption.id}
        name="shippingOption"
        className="checkout__select"
        >
        <option className="checkout__select-option" disabled>Select a shipping method</option>
        {
            userInfo.shippingOptions.map((method, index) => {
            return (
                <option className="checkout__select-option" value={method.id} key={index}>{`${method.description} - $${method.price.formatted_with_code}` }</option>
            );
            })
        };
        </select>


      <h4 className="checkout__subheading">Payment information</h4>

      <label className="checkout__label" htmlFor="cardNum">Credit card number</label>
      <input className="checkout__input" type="text" name="cardNum" value={userInfo.cardNum} placeholder="Enter your card number" />

      <label className="checkout__label" htmlFor="expMonth">Expiry month</label>
      <input className="checkout__input" type="text" name="expMonth" value={userInfo.expMonth} placeholder="Card expiry month" />

      <label className="checkout__label" htmlFor="expYear">Expiry year</label>
      <input className="checkout__input" type="text" name="expYear" value={userInfo.expYear} placeholder="Card expiry year" />

      <label className="checkout__label" htmlFor="ccv">CCV</label>
      <input className="checkout__input" type="text" name="ccv" value={userInfo.ccv} placeholder="CCV (3 digits)" />

      <button className="checkout__btn-confirm">Confirm order</button>
    </form>
    )
}

export default Checkout;
