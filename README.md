# Backend Architecture
### Modules:
- **Authentification** [ localhost/api/auth ]
	- Handles the user login, register, update and delete
	- Handles the JWT validation
- **Products** [ localhost/api/products ]
	- Handles the CRUD operations for products
- **Payment** [ localhost/api/checkout ]
	- Handles the status of the order
	- Handles the stock of the products

# Authentification [url/api/auth]

### REST API:
- **POST**: create new user in databse
- **GET**: /id gets the user's info from database
- **PATCH**: /id updates the user's info in db
- **DELETE** /id deletes the user from db

### JWT Validation
- **POST**: sends the jwt for validation

# Products [url/api/products]

### REST API
- **POST** : create new product in database
- **GET**: [/id, ''] retrives product info
- **PATCH**: [/id] updates product
- **DELETE**: [/id] deletes product

# PAYMENT/CART [url/api/checkout]

### PAYMENT PROVIDER
--- ret 	urns payment status

### REST API -> NEW ORDER
- **POST**: creates new order
- **GET**: [/id, ''] retrieve order info
- **PATCH**: [/id] updates order info
- **DELETE**: [/id] deletes order

# Database
Atlas MongoDB

## Interface

**User interface:**
- firstname
- lastname
- email
- password
- age?
- sex?
- phone?
- addres?
- !order_history
- !total_spent
- !last_login
- !last_ip
- !date


**Product Interface:**
- title
- categories
- sku
- stock
- price
- long_description
- short_description
- images
- thumbnail
- supplier
- weight
- dimmensions
- date

**Order Interface:**
- order_id
- products
- user
- status
- payment_type
- price
- date

**Logs Interface:**
- date
- id
- action_type
- data
- source
