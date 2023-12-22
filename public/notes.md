# _Study Guide for Final Exam_

1. What ports are used for HTTP, HTTPS, SSH?
HTTP: Port 80
HTTPS: Port 443
SSH: Port 22

2. What do HTTP status codes in the 300, 400, 500 range indicate?
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

3. What does the HTTP header content-type allows you to do?
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

4. What do the following attributes of a cookie do?
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

5. Assuming the following Express middleware, what would be the console.log output for an HTTP GET request with a URL path of /foo/bar?
*TBD*

6. Given the following Express service code: What does the following JavaScript fetch return?
*TBD*

7. Given the following MongoDB query
`{ cost: { $gt: 10 }, name: /fran.*/}`
select all of the matching documents.
* gets data if the cost field is greater than 10 and name field starts with 'fran'

8. How should you store user passwords in a database?
Use Hashing:
Salt the Passwords:
Use a Strong Key Derivation Function (KDF):
Keep Hashed Passwords and Salts Separate:
Use HTTPS:
Implement Account Lockout and Rate Limiting:
Regularly Update Password Hashes:

9. Assuming the following Node.js service code is executing with websockets, what will be logged to the console of the web browser?
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

10. What is the WebSocket protocol used for?
The WebSocket protocol is a communication protocol that provides full-duplex communication channels over a single, long-lived connection. Unlike the traditional request-response model of HTTP, where a client sends a request and waits for the server to respond, WebSocket allows for bidirectional communication, enabling both the client and the server to send messages to each other independently.
* Real-time Web Applications:
* Push Notifications:
* Live Updates:
* Interactive Applications:
* Efficient Bi-directional Communication:
* Reduced Latency:
* Web API Development:
* Internet of Things (IoT):

11. What is JSX and how are the curly braces rendered?
JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to XML or HTML. It is commonly used with React, a JavaScript library for building user interfaces. JSX allows developers to write HTML-like code in their JavaScript files, making it more convenient to describe the structure of user interfaces.

In JSX, curly braces {} are used to embed JavaScript expressions within the markup. These expressions are evaluated and the result is rendered as part of the UI.

Embedding JavaScript Expressions:
Rendering Dynamic Content:
Executing JavaScript Logic:
Setting HTML Attributes Dynamically:

12. Assuming a HTML document with a 
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

13. Assuming a HTML document with a 
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


14. What does the following React component do?
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


15. What are React Hooks used for?


16. What is the useEffect hook used for?


17. What does this code do?
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


18. What role does npm play in web development?


19. What does package.json do in a npm project?


20. What does the fetch function do?


21. What does node.js do?


22. What does Vite do?






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



