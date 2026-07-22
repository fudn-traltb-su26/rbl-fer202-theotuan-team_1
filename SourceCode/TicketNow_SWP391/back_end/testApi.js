fetch('http://localhost:5000/api/payment/create-payment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount: 150000, orderCode: Date.now(), description: "Test ticket" })
})
.then(res => res.json())
.then(console.log)
.catch(console.error);
