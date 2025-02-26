## This is a Cloud Wallet in Node.js

### How it works?

1. You partially sign the transaction from the frontend (as it does not have the Private Key)
   and send it to the backend.
2. The backend retrieves the private key from database and signs the remaining transaction.

(Currently the amount and address is hardcoded for testing purposes).