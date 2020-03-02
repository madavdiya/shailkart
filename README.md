# Ecommerce React Demo

Simple Product listing website with Add to cart, Process to checkout and showing a list transaction of user

## Getting Started

```bash
git clone https://github.com/shailu26/shailkart.git
cd shailkart
```

## Prerequisites

> Get your Razorpay API keys [`key_id` and `key_secret`] for test environment variables from here, [https://dashboard.razorpay.com/#/app/keys](https://dashboard.razorpay.com/#/app/keys)

## Installation

### For Frontend

```bash
npm install
```

replace the BaseUrl in frontend's `environment` file with your new server URL.

### For Backend/Server 
> Note:  Server Needed to talk with Razorpay using Node SDK

Go to `.env` file and replace the dumb characters(`xxxxx`) with your Razorpay `key` and `secret`

Now before running the app insert some dummy data in product schema
- first copy data from `fakeProduct.json` file 
- Open Postman or any other api testing tool
- Use this post url `http://localhost:5002/api/product/seed` to insert data

Then run 
```bash
npm run dev
```

You can goto http://localhost:3000 and try out this demo, later you can deploy the server code to server app containers like **heroku, glitch, aws, etc** and replace the URL in frontend's `.env` file with your new server URL.

## Licence

MIT Licensed.




