import React from 'react';
import Modal from 'react-modal';
import StripePayment from '../Payment/StripePayment';

const customStyles = {
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
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Payment Modal"
        >
            <h2>Complete Your Payment</h2>
            <button onClick={onRequestClose} style={{ marginBottom: '20px', background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer' }}>Close</button>
            <StripePayment flight={flight} />
        </Modal>
    );
};

export default PaymentModal;
