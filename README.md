# woops
HTTP error manager for Express.js

# ID;DU;
This module is in development, its usage in production is not recommended.

## Instalation & Usage

```typescript
import woops from 'woops';

// Install Woops support
app.use(woops());
```

After installation it adds `woops` property to Express' `Response` object that can be used to send an error back to a client:
 
```typescript
res.woops.unauthorized();
```

## Woops exception handler

Optionally you can handle any runtime exception to be sent as woops error back to a client:

```typescript
// import handler function from woops module
import { woopsExceptionHandler } from 'woops';

// adds error handling with Woops
app.use(woopsExceptionHandler);
```

Now any error thrown in the code will be sent as Internal Server error to a client.