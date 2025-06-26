import { useState } from 'react';
import "./Payment.css";
const PaymentGateway = () => {
  const [activeMethod, setActiveMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    name: ''
  });
  const [errors, setErrors] = useState({});

  const validateUpi = () => {
    const upiRegex = /^[\w.-]+@[\w.-]+$/;
    if (!upiRegex.test(upiId)) {
      setErrors({ ...errors, upi: 'Invalid UPI ID format' });
      return false;
    }
    return true;
  };

  const validateCard = () => {
    const newErrors = {};
    if (!/^\d{16}$/.test(cardDetails.number)) newErrors.number = 'Invalid card number';
    if (!/^(0[1-9]|1[0-2])$/.test(cardDetails.expiryMonth)) newErrors.expiryMonth = 'Invalid month';
    if (!/^\d{4}$/.test(cardDetails.expiryYear)) newErrors.expiryYear = 'Invalid year';
    if (!/^\d{3,4}$/.test(cardDetails.cvv)) newErrors.cvv = 'Invalid CVV';
    if (!cardDetails.name.trim()) newErrors.name = 'Name required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors({ ...errors, ...newErrors });
      return false;
    }
    return true;
  };

  const handlePayment = (e) => {
    e.preventDefault();
    const isValid = activeMethod === 'upi' ? validateUpi() : validateCard();
    if (isValid) {
      // Process payment
      console.log(activeMethod === 'upi' ? { upiId } : cardDetails);
    }
  };

  return (
    <div className="questions section container">
     
    
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          {/* UPI Section */}
          <div className="md:w-1/2 p-6 border-r border-gray-200">
            <h2 className="text-2xl font-bold mb-6">UPI Payment</h2>
            <form onSubmit={handlePayment}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">UPI ID</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@upi"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.upi && <p className="text-red-500 text-sm mt-1">{errors.upi}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Pay via UPI
              </button>
            </form>
          </div>
        
         
          {/* Card Section */}
          <div className="md:w-1/2 p-6">
            <h2 className="text-2xl font-bold mb-6">Card Payment</h2>
            <form onSubmit={handlePayment}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Card Number</label>
                <input
                  type="text"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                  placeholder="4242 4242 4242 4242"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Expiration</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={cardDetails.expiryMonth}
                      onChange={(e) => setCardDetails({...cardDetails, expiryMonth: e.target.value})}
                      placeholder="MM"
                      className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={cardDetails.expiryYear}
                      onChange={(e) => setCardDetails({...cardDetails, expiryYear: e.target.value})}
                      placeholder="YYYY"
                      className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {errors.expiryMonth && <p className="text-red-500 text-sm mt-1">{errors.expiryMonth}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">CVV</label>
                  <input
                    type="text"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                <input
                  type="text"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                  placeholder="John Doe"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Pay with Card
              </button>
            </form>
          </div>
        </div>
      </div>
    
    </div>
    
  );
};

export default PaymentGateway;