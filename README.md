# Walmart
A API that can create/update customer, order and get the top three most popular item.

## Prerequisite
- Node.js
- npm
- Mysql

## Technology
* [Express.js] (http://expressjs.com/)

## How to start
npm start

## Endpoint
- Data
    
  POST /api/data/initialize
- Customer

  POST /api/customer/create

  PUT /api/customer/update
- Order

  POST /api/order/create
  PUT /api/order/update
  DELETE /api/order/delete
  
- Recommendation
  
  GET /api/recommendation/top3Items

***[Note] All required packages and versions are listed in `package.json`***
