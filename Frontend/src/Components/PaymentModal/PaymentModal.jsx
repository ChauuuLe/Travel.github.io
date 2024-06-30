import React, { useState } from 'react';
import Modal from 'react-modal';
import StripePayment from '../Payment/StripePayment';
import './PaymentModal.css'; // Import CSS for styling

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 1000,
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '400px',
        padding: '20px',
        borderRadius: '10px',
    },
};

Modal.setAppElement('#root');

const PaymentModal = ({ isOpen, onRequestClose, flight }) => {
    const [selectedTab, setSelectedTab] = useState('card');

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Payment Modal"
        >
            <h2>Payment Method</h2>
            <p>Add a new payment method to your account.</p>
            <div className="tabs">
                <button className={selectedTab === 'card' ? 'active' : ''} onClick={() => setSelectedTab('card')}>Card</button>
                <button className={selectedTab === 'paypal' ? 'active' : ''} onClick={() => setSelectedTab('paypal')}>Paypal</button>
                <button className={selectedTab === 'apple' ? 'active' : ''} onClick={() => setSelectedTab('apple')}>Apple</button>
            </div>
            {selectedTab === 'card' && (
                <form className="payment-form">
                    <label>Name</label>
                    <input type="text" placeholder="First Last" />
                    <label>Card number</label>
                    <input type="text" placeholder="1234 1234 1234 1234" />
                    <div className="expiry-cvc">
                        <div>
                            <label>Expires</label>
                            <select>
                                <option>Month</option>
                                <option>01</option>
                                <option>02</option>
                                <option>03</option>
                                {/* Add more months */}
                            </select>
                        </div>
                        <div>
                            <label>Year</label>
                            <select>
                                <option>Year</option>
                                <option>2024</option>
                                <option>2025</option>
                                {/* Add more years */}
                            </select>
                        </div>
                        <div>
                            <label>CVC</label>
                            <input type="text" placeholder="CVC" />
                        </div>
                    </div>
                    <button className="continue-button">Continue</button>
                </form>
            )}
            {selectedTab === 'paypal' && (
                <div className="paypal-info">
                    <p>Pay with PayPal</p>
                    {/* Add PayPal integration */}
                </div>
            )}
            {selectedTab === 'apple' && (
                <div className="apple-info">
                    <p>Pay with Apple</p>
                    {/* Add Apple Pay integration */}
                </div>
            )}
            <button onClick={onRequestClose} className="close-button">Close</button>
        </Modal>
    );
};

export default PaymentModal;
