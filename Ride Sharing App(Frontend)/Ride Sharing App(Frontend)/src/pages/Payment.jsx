import React, { useState } from 'react'
import { CreditCard, Plus, Trash2, Check, AlertCircle } from 'lucide-react'

const Payment = () => {
  const [paymentMethods, setPaymentMethods] = useState([])
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
    zipCode: ''
  })

  const handleAddCard = (e) => {
    e.preventDefault()
    // In a real app, this would validate and add the card via API
    const newCardData = {
      id: Date.now().toString(),
      type: 'card',
      brand: 'Visa', // This would be determined by the card number
      last4: newCard.number.slice(-4),
      expiry: newCard.expiry,
      isDefault: false,
      name: newCard.name
    }
    
    setPaymentMethods([...paymentMethods, newCardData])
    setNewCard({
      number: '',
      expiry: '',
      cvv: '',
      name: '',
      zipCode: ''
    })
    setIsAddingCard(false)
  }

  const handleSetDefault = (id) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    )
  }

  const handleDeleteCard = (id) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment & Billing</h1>
          <p className="text-gray-600">Manage your payment methods and view transaction history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Methods */}
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
                <button
                  onClick={() => setIsAddingCard(true)}
                  className="btn-primary"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Payment Method
                </button>
              </div>

              {paymentMethods.length === 0 ? (
                <div className="text-center py-8">
                  <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No payment methods added yet</p>
                  <p className="text-sm text-gray-400 mt-2">Add a payment method to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-8 bg-primary-100 rounded flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {method.brand} •••• {method.last4}
                          </div>
                          <div className="text-sm text-gray-600">
                            {method.name} {method.expiry && `• Expires ${method.expiry}`}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {method.isDefault && (
                          <span className="px-2 py-1 bg-primary-100 text-primary-600 text-xs font-medium rounded">
                            Default
                          </span>
                        )}
                        {!method.isDefault && (
                          <button
                            onClick={() => handleSetDefault(method.id)}
                            className="text-sm text-primary-600 hover:text-primary-700"
                          >
                            Set as Default
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteCard(method.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add New Card Form */}
            {isAddingCard && (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Card</h3>
                <form onSubmit={handleAddCard} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={newCard.number}
                      onChange={(e) => setNewCard({...newCard, number: e.target.value})}
                      placeholder="1234 5678 9012 3456"
                      className="input-field"
                      maxLength="19"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={newCard.expiry}
                        onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                        placeholder="MM/YY"
                        className="input-field"
                        maxLength="5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={newCard.cvv}
                        onChange={(e) => setNewCard({...newCard, cvv: e.target.value})}
                        placeholder="123"
                        className="input-field"
                        maxLength="4"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={newCard.name}
                      onChange={(e) => setNewCard({...newCard, name: e.target.value})}
                      placeholder="John Doe"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={newCard.zipCode}
                      onChange={(e) => setNewCard({...newCard, zipCode: e.target.value})}
                      placeholder="12345"
                      className="input-field"
                      maxLength="10"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button type="submit" className="btn-primary">
                      Add Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingCard(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Transaction History */}
          <div>
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Transaction History</h2>
              
              <div className="text-center py-8">
                <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No transactions yet</p>
                <p className="text-sm text-gray-400 mt-2">Your transaction history will appear here</p>
              </div>
            </div>

            {/* Billing Summary */}
            <div className="card mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-medium text-gray-900">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Month</span>
                  <span className="font-medium text-gray-900">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Spent</span>
                  <span className="font-medium text-gray-900">$0.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment