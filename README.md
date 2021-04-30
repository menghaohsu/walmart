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
    
      Body {"name": "Paul"}

  PUT /api/customer/update
  
      Body {"id": 6, "newName": "Paul"}
- Order

  POST /api/order/create
  
      Body {
                "customerID": 6,
                "orders": [
                    {
                        "itemID": 1,
                        "qty": 5
                    },
                    {
                        "itemID": 2,
                        "qty": 7
                    }
                ]
            }
  PUT /api/order/update
  
      Body {
                "orderID": 9,
                "itemID": 1,
                "qty": 1
            }
  DELETE /api/order/delete
  
      Body {"orderID" : 9}
  
- Recommendation
  
  GET /api/recommendation/top3Items

***[Note] All required packages and versions are listed in `package.json`***
