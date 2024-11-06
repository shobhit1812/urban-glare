# E-BAZAAR

### Clothes Related

1. Male (Shirt, Jeans, Jackets, Trouser)
2. Female (Skirt, Sweater, Jeans, Jackets)
3. Children (Basic CLothing)

Sort in brands; like [Levi, Puma, Wrogn, etc]

### Implement Redux Store; persist, thunk, and saga.

### Routing

1. `'/'` browse all products
2. `'/livechat-product-launching-event'` integrate livechat and a video

### Authentication Routing

1. `'/auth/login'`
2. `'/auth/register'` After successfully registering send a welcome email

### User Models

Name, email, username, password, isAdmin: by default false, cart, orders, token

### Product Models

### Difference between Link, useNavigation, and redirect.

1. Link is a component used to navigate between routes within your React application without reloading the page.

2) useNavigation is a hook that provides information about the current navigation state in react-router-dom. It’s especially helpful when using loaders or waiting for data to be fetched before rendering a component. `useNavigation returns an object with properties like state (loading, idle, or submitting) that lets you know the current status of the navigation.`.
   `navigate allows us to move to a new route after an asynchronous operation, like handling a form submission, without reloading the page.`

```
import { useNavigation } from "react-router-dom";

const Blog = () => {
const navigation = useNavigation();

if (navigation.state === "loading") {
return <p>Loading...</p>; // Display loading state
}

return <div>Your blog content here</div>;
};

```

3. Redirect is a function used to programmatically navigate to another route, typically in loader or action functions on the server side.

### Todo

1. category based on (puma, adidas, nike) - schema implement
2. cloudinary,
3. read redux more (connect)
