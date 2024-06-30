import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const stripePromise = loadStripe('your-publishable-key-here');

const StripePayment = ({ flight }) => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm flight={flight} />
        </Elements>
    );
};

export default StripePayment;
