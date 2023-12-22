# _Study Guide for Final Exam_

## 1. What ports are used for HTTP, HTTPS, SSH?
HTTP: Port 80
HTTPS: Port 443
SSH: Port 22

## 2. What do HTTP status codes in the 300, 400, 500 range indicate?
* 300 Range (Redirection)
  - 300 Multiple Choices: Indicates multiple options for the resource that the client may follow.
  - 301 Moved Permanently: The requested resource has been permanently moved to a new location, and the client should update its URL to the new one.
  - 302 Found (or Moved Temporarily): Similar to 301, but indicates a temporary redirect. The client should continue to use the original URL.
  - 304 Not Modified: Used in response to conditional requests (e.g., using the If-Modified-Since header) to indicate that the resource has not been modified since the specified date.
* 400 Range (Client Errors)
  - 400 Bad Request: The server cannot process the request due to a client error, such as malformed syntax or invalid request message framing.
  - 401 Unauthorized: Similar to 403, but specifically indicates that authentication is required and has failed or has not been provided.
  - 403 Forbidden: The client does not have permission to access the requested resource.
  - 404 Not Found: The requested resource could not be found on the server.
* 500 Range (Server Errors)
  - 500 Internal Server Error: A generic error message indicating that an unexpected condition was encountered on the server.
  - 501 Not Implemented: The server does not support the functionality required to fulfill the request.
  - 502 Bad Gateway: The server, while acting as a gateway or proxy, received an invalid response from an upstream server.
  - 503 Service Unavailable: The server is currently unable to handle the request due to temporary overloading or maintenance of the server.

## 3. What does the HTTP header content-type allows you to do?
* The Content-Type HTTP header allows the sender to indicate the media type (or MIME type) of the resource being sent in the HTTP message body.

* The Content-Type header is specified in the HTTP response when a server sends data to a client, and it can also be used in the request to specify the media type of the data the client is sending to the server.

* Common Content-Type values include:
  - text/html: HTML documents
  - text/plain: Plain text
  - application/json: JSON (JavaScript Object Notation) data
  - application/xml: XML (eXtensible Markup Language) data
  - image/jpeg: JPEG image
  - image/png: PNG image
  - application/pdf: PDF document
  - multipart/form-data: Used in HTML forms that include binary data, such as file uploads

Example: `Content-Type: text/html; charset=utf-8`

## 4. What do the following attributes of a cookie do?
* Domain
  - Purpose: The Domain attribute specifies the domain for which the cookie is valid. The browser sends the cookie with each HTTP request to this domain and its subdomains.
  - Example: If a cookie has the domain attribute set to ".example.com," it will be sent to "subdomain.example.com" as well as "example.com."
* Path
  - Purpose: The Path attribute specifies the URL path for which the cookie is valid. The browser sends the cookie with each request made to that path or any of its subdirectories.
  - Example: If a cookie has the path attribute set to "/blog," it will be sent with requests to "/blog/page1," "/blog/page2," etc., but not with requests to "/home."
* SameSite
  - Purpose: The SameSite attribute controls when a cookie is sent with cross-origin requests. It helps mitigate cross-site request forgery (CSRF) and other types of cross-site attacks.
  - Values:
    * Strict: The cookie is only sent in a first-party context, meaning the cookie is sent only when making a request from the same site.
    * Lax: The cookie is sent in a first-party context and in cross-site navigation initiated by a top-level navigation (e.g., clicking on a link).
    * None: The cookie is sent with all requests, including cross-origin requests. This can pose security risks and should be used with the Secure attribute (i.e., for HTTPS connections).
* HTTPOnly
  - Purpose: The HttpOnly attribute is a security feature that prevents client-side scripts (e.g., JavaScript) from accessing the cookie. This helps mitigate certain types of cross-site scripting (XSS) attacks where an attacker could try to steal a user's cookie using malicious scripts.
  - Example: Set-Cookie: sessionID=123; HttpOnly

## 5. Assuming the following Express middleware, what would be the console.log output for an HTTP GET request with a URL path of /foo/bar?
*TBD*

## 6. Given the following Express service code: What does the following JavaScript fetch return?
*TBD*

## 7. Given the following MongoDB query
`{ cost: { $gt: 10 }, name: /fran.*/}`
select all of the matching documents.
* gets data if the cost field is greater than 10 and name field starts with 'fran'

## 8. How should you store user passwords in a database?
Use Hashing:
Salt the Passwords:
Use a Strong Key Derivation Function (KDF):
Keep Hashed Passwords and Salts Separate:
Use HTTPS:
Implement Account Lockout and Rate Limiting:
Regularly Update Password Hashes:

## 9. Assuming the following Node.js service code is executing with websockets, what will be logged to the console of the web browser?
*TBD*
Example:
```js
// Install the 'ws' library by running: npm install ws
const WebSocket = require('ws');
const http = require('http');

// Create an HTTP server that will serve as a fallback for non-WebSocket requests
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server is running');
});

// Create a WebSocket server by passing the HTTP server as a parameter
const wss = new WebSocket.Server({ server });

// Event listener for when a client connects to the WebSocket server
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Event listener for when the server receives a message from a client
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Echo the message back to the client
    ws.send(`You said: ${message}`);
  });

  // Event listener for when a client closes the connection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the HTTP server on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
```

## 10. What is the WebSocket protocol used for?
The WebSocket protocol is a communication protocol that provides full-duplex communication channels over a single, long-lived connection. Unlike the traditional request-response model of HTTP, where a client sends a request and waits for the server to respond, WebSocket allows for bidirectional communication, enabling both the client and the server to send messages to each other independently.
* Real-time Web Applications:
* Push Notifications:
* Live Updates:
* Interactive Applications:
* Efficient Bi-directional Communication:
* Reduced Latency:
* Web API Development:
* Internet of Things (IoT):

## 11. What is JSX and how are the curly braces rendered?
JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to XML or HTML. It is commonly used with React, a JavaScript library for building user interfaces. JSX allows developers to write HTML-like code in their JavaScript files, making it more convenient to describe the structure of user interfaces.

In JSX, curly braces {} are used to embed JavaScript expressions within the markup. These expressions are evaluated and the result is rendered as part of the UI.

Embedding JavaScript Expressions:
Rendering Dynamic Content:
Executing JavaScript Logic:
Setting HTML Attributes Dynamically:

## 12. Assuming a HTML document with a 
`<div id="root"></div>`
element, what content will the following React component generate?
```js
      function Welcome(props) {
        return <h1>Hello, {props.name}</h1>;
      }
      function App() {
        return (
          <div>
            <Welcome name="Sara" />
            <Welcome name="Cahal" />
            <Welcome name="Edite" />
          </div>
        );
      }
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<App />);
```
The provided React component code defines two functional components: `Welcome` and `App`. The `App` component renders three instances of the `Welcome` component, each with a different `name` prop. The final output is then rendered into the HTML element with the id "root" using `ReactDOM.createRoot` and `root.render`.

Let's break down the components and their output:

1. **Welcome Component:**
   ```js
   function Welcome(props) {
     return <h1>Hello, {props.name}</h1>;
   }
   ```
   This component takes a `name` prop and renders an `<h1>` element with the greeting "Hello" followed by the value of the `name` prop.

2. **App Component:**
   ```js
   function App() {
     return (
       <div>
         <Welcome name="Sara" />
         <Welcome name="Cahal" />
         <Welcome name="Edite" />
       </div>
     );
   }
   ```
   The `App` component renders a `<div>` element containing three instances of the `Welcome` component, each with a different `name` prop.

3. **Rendering with ReactDOM.createRoot:**
   ```js
   const root = ReactDOM.createRoot(document.getElementById('root'));
   root.render(<App />);
   ```
   The `App` component is rendered into the HTML element with the id "root" using `ReactDOM.createRoot` and `root.render`.

**Final Output:**
The final output rendered inside the HTML element with the id "root" will be:
```html
<div>
  <h1>Hello, Sara</h1>
  <h1>Hello, Cahal</h1>
  <h1>Hello, Edite</h1>
</div>
```

Each `<h1>` element represents a greeting to a person specified by the `name` prop in the `Welcome` components.

## 13. Assuming a HTML document with a 
`<div id="root"></div>`
element, what content will the following React component generate?
```js
    function Numbers() { 
      const numbers = [1, 2, 3, 4, 5];
      const listItems = numbers.map((number) =>
        <li>{number}</li>
      );
      return(<ul>{listItems}</ul>)
    }
    const root = ReactDOM.createRoot(document.getElementById('root')); 
    root.render(<Numbers/>);
```
The provided React component code defines a functional component `Numbers` that renders an unordered list (`<ul>`) containing list items (`<li>`) based on the numbers in the array. The final output is then rendered into the HTML element with the id "root" using `ReactDOM.createRoot` and `root.render`.

Let's break down the components and their output:

1. **Numbers Component:**
   ```js
   function Numbers() {
     const numbers = [1, 2, 3, 4, 5];
     const listItems = numbers.map((number) => <li>{number}</li>);
     return <ul>{listItems}</ul>;
   }
   ```
   This component creates an array of numbers `[1, 2, 3, 4, 5]` and uses the `map` function to generate a list of `<li>` elements, each containing one of the numbers.

2. **Rendering with ReactDOM.createRoot:**
   ```js
   const root = ReactDOM.createRoot(document.getElementById('root'));
   root.render(<Numbers />);
   ```
   The `Numbers` component is rendered into the HTML element with the id "root" using `ReactDOM.createRoot` and `root.render`.

**Final Output:**
The final output rendered inside the HTML element with the id "root" will be an unordered list (`<ul>`) containing list items (`<li>`) for each number in the array:

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>
```

Each list item corresponds to one of the numbers in the `numbers` array.

## 14. What does the following React component do?
```js
function Example() {
  // Declare a new state variable, which we'll call "count"  
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
The provided React component is a functional component named `Example` that demonstrates the usage of the `useState` hook. This component creates a simple interactive user interface that displays a paragraph and a button. The paragraph shows the current count, and the button increments the count when clicked.

Here's a breakdown of the component:

1. **State Initialization:**
   ```js
   const [count, setCount] = useState(0);
   ```
   The `useState` hook is used to declare a state variable named `count` and its corresponding updater function `setCount`. The initial value of `count` is set to 0.

2. **Rendering:**
   ```jsx
   return (
     <div>
       <p>You clicked {count} times</p>
       <button onClick={() => setCount(count + 1)}>
         Click me
       </button>
     </div>
   );
   ```
   The component renders a `div` element containing a `p` (paragraph) element and a `button` element. The paragraph displays the current value of the `count` state variable, and the button has an `onClick` event handler that increments the `count` when clicked.

   - The paragraph text is dynamically generated with the current count: `You clicked {count} times`.
   - The button has an `onClick` event handler that invokes `setCount` with the updated count value (`count + 1`) when clicked.

**Summary of Behavior:**
- Initially, the paragraph shows "You clicked 0 times."
- Clicking the "Click me" button increments the count, and the paragraph updates accordingly.
- Each click updates the displayed count value.

This component is an example of how to use the `useState` hook to manage state in a functional component, allowing for dynamic and interactive user interfaces in React applications.

## 15. What are React Hooks used for?
React Hooks are functions that allow functional components to manage state, lifecycle, and side effects. They were introduced in React version 16.8 to enable developers to use state and other React features in functional components, which were previously stateless and lacked lifecycle methods.

The primary purposes of React Hooks include:

1. **Managing State:**
   - The `useState` hook allows functional components to have local state. It returns an array with two elements: the current state value and a function to update that value. This helps manage component-specific state without needing a class component.

     ```jsx
     const [count, setCount] = useState(0);
     ```

2. **Lifecycle Methods:**
   - The `useEffect` hook provides a way to perform side effects in functional components, equivalent to lifecycle methods in class components. It allows you to execute code after the component renders, handle cleanup, and respond to changes in props or state.

     ```jsx
     useEffect(() => {
       // Code to run after component renders
       return () => {
         // Code to run on component unmount (cleanup)
       };
     }, [dependencies]);
     ```

3. **Context API:**
   - The `useContext` hook allows functional components to consume values from the React Context API. It simplifies access to context values without the need for a render prop or higher-order component.

     ```jsx
     const value = useContext(MyContext);
     ```

4. **Reducer for Complex State Logic:**
   - The `useReducer` hook is used to handle more complex state logic in cases where the state transitions depend on the previous state. It is often used as an alternative to `useState` for managing state in a more controlled way.

     ```jsx
     const [state, dispatch] = useReducer(reducer, initialState);
     ```

5. **Custom Hooks for Reusable Logic:**
   - Developers can create custom hooks to encapsulate and reuse logic across multiple components. Custom hooks allow the extraction of state logic, side effects, or other functionalities into a separate function that can be shared.

     ```jsx
     function useCustomHook() {
       // Custom hook logic
     }
     ```

6. **Optimizing Performance:**
   - Hooks like `useMemo` and `useCallback` help optimize performance by memoizing values and callbacks, respectively. This can prevent unnecessary re-renders and improve the efficiency of a React application.

     ```jsx
     const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
     const memoizedCallback = useCallback(() => {
       // Callback logic
     }, [dependency]);
     ```

React Hooks provide a more concise and expressive way to work with state and side effects in functional components, making it easier to write and maintain React code. They are a fundamental part of modern React development and are widely used in the React community.

## 16. What is the useEffect hook used for?
The `useEffect` hook in React is used to perform side effects in functional components. Side effects include actions such as data fetching, subscriptions, manual DOM manipulations, and other asynchronous or synchronous operations that affect the state of the component or have external consequences.

The basic syntax of the `useEffect` hook is as follows:

```jsx
useEffect(() => {
  // Code to run after component renders or when dependencies change

  // Optional cleanup code (returned function)
  return () => {
    // Code to run on component unmount or before the next effect
  };
}, [dependencies]);
```

Key points about the `useEffect` hook:

1. **Function Argument:**
   - The first argument to `useEffect` is a function containing the code that should run as a side effect. This function is executed after the component has rendered.

2. **Dependencies Array:**
   - The second argument is an optional array of dependencies. If specified, the effect will re-run whenever any of the dependencies change. If omitted, the effect runs after every render.

3. **Cleanup Function:**
   - The function returned from the effect (optional) is used for cleanup. It runs before the next effect or when the component is unmounted. This is useful for canceling network requests, clearing subscriptions, or any other cleanup operations.

Here are some common use cases for the `useEffect` hook:

- **Data Fetching:**
  ```jsx
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchDataFromAPI();
      setData(result);
    };

    fetchData();
  }, [dependencies]);
  ```

- **Subscription to External Events:**
  ```jsx
  useEffect(() => {
    const subscription = subscribeToEvent(() => {
      // Handle event
    });

    return () => {
      // Unsubscribe or clean up on component unmount
      subscription.unsubscribe();
    };
  }, [dependencies]);
  ```

- **DOM Manipulation:**
  ```jsx
  useEffect(() => {
    // Perform DOM manipulation
    const element = document.getElementById('example');
    element.style.color = 'red';

    // Cleanup function (optional)
    return () => {
      element.style.color = ''; // Revert changes on unmount
    };
  }, [dependencies]);
  ```

- **Managing Timers and Intervals:**
  ```jsx
  useEffect(() => {
    const timerId = setInterval(() => {
      // Perform periodic action
    }, 1000);

    return () => {
      clearInterval(timerId); // Cleanup on unmount
    };
  }, [dependencies]);
  ```

The `useEffect` hook is a crucial tool for managing side effects in React components and is a key feature in the transition from class components to functional components with hooks.

## 17. What does this code do?
```js
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```
This code defines a React component named `App` using the React Router library for navigation. The `App` component represents the root component of a React application and is responsible for rendering different components based on the current route.

Here's a breakdown of the code:

1. **React Router Components:**
   - The code uses components from React Router, including `BrowserRouter`, `Routes`, and `Route`. These components are responsible for setting up and defining the routing structure of the application.

   ```jsx
   <BrowserRouter>
     <Routes>
       {/* ... */}
     </Routes>
   </BrowserRouter>
   ```

2. **Nested Routes:**
   - The `<Routes>` component is used to define nested routes within the `<BrowserRouter>`. Nested routes are declared inside the `<Routes>` component, and each route is defined using the `<Route>` component.

   ```jsx
   <Routes>
     <Route path="/" element={<Layout />}>
       {/* ... */}
     </Route>
   </Routes>
   ```

3. **Layout Component:**
   - The route with the `path="/" element={<Layout />}` attribute indicates that when the path is the root ("/"), the `Layout` component should be rendered. This suggests that `Layout` is a layout or wrapper component for other components.

4. **Nested Routes Inside Layout:**
   - Inside the `Layout` component, there are additional nested routes specified by `<Route>` components. These nested routes are defined relative to the parent route ("/") and represent different views or pages within the application.

   ```jsx
   <Route path="/" element={<Layout />}>
     <Route index element={<Home />} />
     <Route path="blogs" element={<Blogs />} />
     <Route path="contact" element={<Contact />} />
     <Route path="*" element={<NoPage />} />
   </Route>
   ```

   - `<Route index element={<Home />}`: This route specifies that when the path is the index ("" or "/"), the `Home` component should be rendered.

   - `<Route path="blogs" element={<Blogs />} />`: This route specifies that when the path is "/blogs," the `Blogs` component should be rendered.

   - `<Route path="contact" element={<Contact />} />`: This route specifies that when the path is "/contact," the `Contact` component should be rendered.

   - `<Route path="*" element={<NoPage />} />`: This is a catch-all route, rendering the `NoPage` component when the path doesn't match any of the specified routes.

In summary, this code sets up a simple routing structure using React Router, with nested routes and a layout component. The application renders different components based on the current route, allowing for a multi-page and organized user interface.

## 18. What role does npm play in web development?
npm (Node Package Manager) plays a crucial role in web development, particularly in projects that leverage Node.js for server-side or build-related tasks. Here are some key roles that npm plays in web development:

1. **Package Management:**
   - npm is a package manager that allows developers to easily install, manage, and share third-party libraries or packages (also known as dependencies). These packages often contain reusable code, making it convenient to incorporate external functionality into a project.

2. **Dependency Resolution:**
   - npm automatically resolves and installs dependencies for a project based on the information specified in the `package.json` file. This ensures that all necessary dependencies are available for the project to run successfully.

3. **Project Initialization:**
   - npm can be used to initialize a new project by creating a `package.json` file. This file contains metadata about the project, including its name, version, dependencies, scripts, and other configurations. The `npm init` command guides developers through the process of creating this file.

4. **Installation of Development Tools:**
   - npm is commonly used to install development tools and build processes, such as bundlers (Webpack, Parcel), task runners (Gulp, Grunt), testing libraries, and more. These tools enhance the development workflow and help automate tasks.

5. **Version Control and Semantic Versioning:**
   - npm supports semantic versioning (SemVer), allowing developers to specify version ranges for dependencies in the `package.json` file. This helps ensure that projects stay up-to-date with the latest features and bug fixes while maintaining compatibility.

6. **Script Execution:**
   - npm enables the definition of custom scripts in the `package.json` file. These scripts can be executed using the `npm run` command. Common scripts include tasks for building, testing, linting, and running the application.

7. **Registry and Publishing:**
   - npm provides a central registry where developers can publish their own packages. This registry allows others to discover, install, and use those packages in their projects. The public npm registry is one of the largest and most widely used package repositories.

8. **Environment Configuration:**
   - npm allows developers to define environment-specific configurations using the `npmrc` file. This is useful for managing different settings for development, testing, and production environments.

9. **Continuous Integration and Deployment:**
   - npm plays a role in continuous integration (CI) and continuous deployment (CD) workflows. CI tools often use npm to install project dependencies and execute scripts as part of the build process.

10. **Global Packages:**
    - npm allows developers to install packages globally on their machine, making certain command-line tools and utilities available across different projects.

In summary, npm is a versatile tool that simplifies package management, facilitates the integration of third-party libraries, streamlines project initialization, and enhances the overall development workflow in web development projects based on Node.js.

## 19. What does package.json do in a npm project?
The `package.json` file is a crucial component of a Node.js/npm project. It serves several important purposes, providing metadata about the project, managing project dependencies, and defining various configurations. Here are some key functions and roles of the `package.json` file in an npm project:

1. **Metadata:**
   - The `package.json` file contains metadata about the project, including its name, version, description, author, and license. This information helps identify and document the project.

   ```json
   {
     "name": "my-project",
     "version": "1.0.0",
     "description": "A description of my project",
     "author": "John Doe",
     "license": "MIT",
     // ...
   }
   ```

2. **Dependencies and DevDependencies:**
   - The `dependencies` section lists the runtime dependencies required for the project to run. These dependencies are essential for the application to function.
   - The `devDependencies` section lists dependencies that are only needed during development, such as testing libraries, build tools, and linters.

   ```json
   {
     "dependencies": {
       "express": "^4.17.1",
       "lodash": "^4.17.21"
     },
     "devDependencies": {
       "jest": "^27.0.6",
       "eslint": "^7.32.0"
     }
   }
   ```

3. **Semantic Versioning (SemVer):**
   - npm uses Semantic Versioning (SemVer) to manage package versions. Dependencies in `package.json` can be specified using version ranges to ensure compatibility.
   - For example, `"express": "^4.17.1"` means any version from 4.17.1 up to, but not including, 5.0.0.

4. **Scripts:**
   - The `scripts` section allows developers to define custom scripts that can be executed using the `npm run` command. Common scripts include tasks for building, testing, linting, starting the application, and more.

   ```json
   {
     "scripts": {
       "start": "node server.js",
       "test": "jest",
       "lint": "eslint src"
     }
   }
   ```

5. **Main File:**
   - The `main` field specifies the entry point of the application, typically the main JavaScript file. When someone requires the installed package, Node.js will use the file specified in the `main` field.

   ```json
   {
     "main": "index.js"
   }
   ```

6. **Repository Information:**
   - The `repository` field provides information about the version control repository where the project is hosted. It can include the type (git, svn, etc.) and the URL.

   ```json
   {
     "repository": {
       "type": "git",
       "url": "https://github.com/username/my-project.git"
     }
   }
   ```

7. **Keywords:**
   - The `keywords` field allows developers to specify keywords that describe the project. These keywords can be used for search and categorization on the npm registry.

   ```json
   {
     "keywords": ["web", "framework", "node"]
   }
   ```

8. **Engines:**
   - The `engines` field specifies the versions of Node.js and npm that the project is compatible with. This helps ensure that the project runs on the correct environment.

   ```json
   {
     "engines": {
       "node": ">=12.0.0",
       "npm": ">=6.0.0"
     }
   }
   ```

9. **Private:**
   - The `private` field, when set to `true`, prevents accidental publication of the project to the npm registry. This is useful for projects that are not intended to be shared publicly.

   ```json
   {
     "private": true
   }
   ```

The `package.json` file serves as a central configuration and metadata file for npm projects, providing a standardized way to manage dependencies, scripts, metadata, and other project-related information.

## 20. What does the fetch function do?
The `fetch` function is a modern JavaScript API for making network requests, typically used to retrieve resources (such as data or files) from a server. It is a part of the Fetch API, which provides a more powerful and flexible alternative to the older `XMLHttpRequest`.

The basic syntax of the `fetch` function is as follows:

```javascript
fetch(url [, options])
  .then(response => {
    // Handle the response
    return response.json(); // or response.text(), response.blob(), etc.
  })
  .then(data => {
    // Handle the parsed data
  })
  .catch(error => {
    // Handle errors
  });
```

Here's a breakdown of the key components:

1. **URL (Uniform Resource Locator):**
   - The `url` parameter is the address of the resource you want to request. This can be a relative or absolute URL.

2. **Options (Optional):**
   - The `options` parameter is an optional object that allows you to configure the request, such as setting headers, specifying the request method, providing credentials, etc.

   ```javascript
   const options = {
     method: 'GET', // or 'POST', 'PUT', 'DELETE', etc.
     headers: {
       'Content-Type': 'application/json',
       // Other headers...
     },
     // Other options...
   };
   ```

3. **Promise-Based API:**
   - The `fetch` function returns a Promise that resolves to the `Response` object representing the response to the request. The response object contains information about the response, including headers and status.

4. **Handling the Response:**
   - The first `then` block is used to handle the response. You can use methods like `json()`, `text()`, `blob()`, etc., to extract the data from the response.

   ```javascript
   .then(response => response.json())
   ```

5. **Handling the Parsed Data:**
   - The second `then` block is used to handle the parsed data retrieved from the response. This block is where you process the data returned by the server.

   ```javascript
   .then(data => {
     // Process the data
   })
   ```

6. **Error Handling:**
   - The `catch` block is used to handle errors that might occur during the fetch operation, such as network errors or failed requests.

   ```javascript
   .catch(error => {
     // Handle errors
   });
   ```

### Example:

```javascript
// Basic GET request
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => {
    console.log('Data:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// POST request with JSON payload
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ username: 'john_doe', password: 'secret' }),
};

fetch('https://api.example.com/login', options)
  .then(response => response.json())
  .then(data => {
    console.log('Login Response:', data);
  })
  .catch(error => {
    console.error('Login Error:', error);
  });
```

The `fetch` function provides a modern and flexible way to work with network requests in JavaScript, and it is commonly used in web development for client-server communication. Keep in mind that the `fetch` API doesn't automatically reject HTTP error status like 404 or 500. You need to check the `ok` property of the response or handle errors explicitly in your code.

## 21. What does node.js do?
Node.js is a JavaScript runtime built on the V8 JavaScript engine developed by Google. It allows developers to execute JavaScript code on the server side, outside the context of a web browser. Node.js is designed to be lightweight, efficient, and scalable, making it well-suited for building scalable network applications and server-side applications.

Here are some key capabilities and functions of Node.js:

1. **Server-Side JavaScript Execution:**
   - Node.js allows developers to use JavaScript to write server-side code. This unifies the programming language used for both the client-side (browser) and server-side, enabling full-stack JavaScript development.

2. **Asynchronous and Non-Blocking I/O:**
   - One of the core features of Node.js is its event-driven, non-blocking I/O model. This allows applications to handle a large number of simultaneous connections without blocking the execution of other tasks. Asynchronous operations, such as file I/O or network requests, are handled efficiently through callbacks and event-driven architecture.

3. **npm (Node Package Manager):**
   - npm is the default package manager for Node.js. It provides a vast ecosystem of open-source libraries and tools that developers can easily integrate into their projects. npm simplifies the process of managing dependencies, installing packages, and sharing code.

4. **CommonJS Modules:**
   - Node.js uses the CommonJS module system, which allows developers to organize and modularize their code. Modules can be easily imported and exported using the `require` and `module.exports` statements.

5. **V8 JavaScript Engine:**
   - Node.js is built on the V8 JavaScript engine, which is the same engine used by the Google Chrome browser. V8 compiles JavaScript code to machine code for efficient execution.

6. **Event-Driven Architecture:**
   - Node.js is designed around an event-driven architecture. It uses an event loop to handle asynchronous operations and callbacks. Events are emitted when certain actions occur, and listeners can respond to those events.

7. **Scalability:**
   - Node.js is well-suited for building scalable network applications. Its non-blocking I/O model allows it to efficiently handle a large number of concurrent connections, making it suitable for real-time applications, chat applications, and other scenarios where high concurrency is essential.

8. **Cross-Platform Compatibility:**
   - Node.js is cross-platform and can run on various operating systems, including Windows, macOS, and Linux. This makes it easy for developers to write code that works consistently across different environments.

9. **Community and Ecosystem:**
   - Node.js has a vibrant and active community, contributing to its extensive ecosystem of libraries and frameworks. This ecosystem includes popular frameworks like Express.js for building web applications and libraries for various tasks, such as database interaction, authentication, and more.

10. **Microservices Architecture:**
    - Node.js is often used in microservices architecture due to its lightweight and modular nature. It allows developers to build and deploy independent, loosely-coupled services that communicate with each other.

Node.js is a versatile and powerful runtime that has become popular for building web servers, APIs, real-time applications, and various server-side applications. Its lightweight design and efficient handling of asynchronous operations make it a compelling choice for modern web development.

## 22. What does Vite do?
Vite is a build tool designed for modern web development that focuses on speed and efficiency. Developed by Evan You, the creator of Vue.js, Vite is specifically tailored for building Vue.js applications, although it can be used with other front-end frameworks as well. The name "Vite" is derived from the French word for "fast."

Key features and functionalities of Vite include:

1. **Dev Server with Hot Module Replacement (HMR):**
   - Vite includes a development server that leverages Hot Module Replacement. This allows developers to see changes in real-time as they modify their code, speeding up the development process and providing a more interactive experience.

2. **Lightning-Fast Build Times:**
   - Vite's build process is optimized for speed. It leverages native ES module support in browsers and employs a build-on-demand approach, only compiling and bundling the code that is necessary for the current development or production state.

3. **ESModule (ESM) Support:**
   - Vite takes advantage of native ES module support in modern browsers, allowing developers to write and import modules using the `import` and `export` syntax. This aligns with the direction of the ECMAScript standard.

4. **Built-in Development Server:**
   - Vite comes with its own development server that supports features like automatic browser reloading, HMR, and fast server restarts. The server is configured to take advantage of native ESM, allowing for faster development iterations.

5. **Plugin System:**
   - Vite has a flexible and extensible plugin system that allows developers to customize and extend the build process. This makes it easy to integrate with various tools, preprocessors, and other build-related functionalities.

6. **Optimized for Vue.js:**
   - While Vite can be used with other front-end frameworks and libraries, it is particularly optimized for Vue.js. The Vue.js integration includes features like automatic dependency analysis, scoped CSS, and other optimizations specific to Vue.js applications.

7. **Vue 3 Support:**
   - Vite is designed to work seamlessly with Vue 3, taking advantage of the latest features and improvements introduced in Vue.js version 3.

8. **Static Site Generation (SSG):**
   - Vite supports static site generation, allowing developers to pre-render pages at build time for improved performance and SEO.

9. **Tree-shaking and Code Splitting:**
   - Vite incorporates tree-shaking and code splitting to reduce the size of the final bundle. This helps in delivering smaller, more efficient JavaScript files to the client.

10. **Efficient Build-on-Demand:**
    - Vite adopts a build-on-demand strategy, only building the code that is needed during development or production. This results in faster build times and a more efficient development experience.

In summary, Vite is a modern build tool that prioritizes speed, developer experience, and efficient build processes. It is especially well-suited for Vue.js applications but can be used in various front-end development scenarios where fast development and optimized build times are essential.





# Notes from earlier in the semester:
I am learning how to code in HTML, how to use Markdown, and how to use GitHub. This is a super practical and fun class!


For this to work, I will need to learn a bunch of web dev coding skills, as well as learn how to create and maintain at least a chat web appliction, if not a map-based application as well. This could very well be the hugest project I have ever worked on since starting college!

### 10/20/23
I just set up my first website! It was cool to see how servers, IP addresses and Domain names work together to help a browser located the correct website. I'm excited to learn more about HTTPS
### 10/24/23
I have been learning more about HTML. I deployed the simon application and it was fun! I am finishing up my own startup HTML today and am excited to deploy it!
### 10/27/23
Over the past 2 days I have been learning a lot about ways to format things with CSS. One of the coolest parts was the flex property and how to hide or rearrange things when the screen gets too small.

## Study Guide for Midterm (10/30)
1. In the following code, what does the link element do?
2. In the following code,  what does a div tag do?
3. In the following code, what is the difference between the #title and .grid selector?
4. In the following code, what is the difference between padding and margin?
5. Given this HTML and this CSS how will the images be displayed using flex?
6. What does the following padding CSS do?
7. What does the following code using arrow syntax function declaration do?
8. What does the following code using map with an array output?
9. What does the following code output using getElementByID and addEventListener?
10. What does the following line of Javascript do using a # selector?
11. Which of the following are true? (mark all that are true about the DOM)
12. By default, the HTML span element has a default CSS display property value of: 
13. How would you use CSS to change all the div elements to have a background color of red?
14. How would you display an image with a hyperlink in HTML?
15. In the CSS box model, what is the ordering of the box layers starting at the inside and working out?
16. Given the following HTML, what CSS would you use to set the text "troubl" to green and leave the "double" text unaffected?
17. What will the following code output when executed using a for loop and console.log?
18. How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?
19. What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, third level heading?
20. How do you declare the document type to be html?
21. What is valid javascript syntax for if, else, for, while, switch statements?
22. What is the correct syntax for creating a javascript object?
23. Is is possible to add new properties to javascript objects?
24. If you want to include JavaScript on an HTML page, which tag do you use?
25. Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?
26. Which of the following correctly describes JSON?
27. What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo  do?
28. Which of the following console command creates a remote shell session?
29. Which of the following is true when the -la parameter is specified for the ls console command?
30. Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?
31. Is a web certificate is necessary to use HTTPS.
32. Can a DNS A record can point to an IP address or another A record.
33. Port 443, 80, 22 is reserved for which protocol?
34. What will the following code using Promises output when executed?

### 11/11/23
I just learned how to make functions in JavaScript that rearrange data and that are called when an HTML element is clicked. It's a pretty intuitive language, if I'm being honest. I am excited to get some more experience with it, since I just need more exposure.



