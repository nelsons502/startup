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



# _Study Guide for Final Exam_

1. What ports are used for HTTP, HTTPS, SSH?
HTTP: Port 80
HTTPS: Port 443
SSH: Port 22

2. What do HTTP status codes in the 300, 400, 500 range indicate?
300 Range (Redirection)
      - 300 Multiple Choices: Indicates multiple options for the resource that the client may follow.
      - 301 Moved Permanently: The requested resource has been permanently moved to a new location, and the client should update its URL to the new one.
      - 302 Found (or Moved Temporarily): Similar to 301, but indicates a temporary redirect. The client should continue to use the original URL.
      - 304 Not Modified: Used in response to conditional requests (e.g., using the If-Modified-Since header) to indicate that the resource has not been modified since the specified date.
400 Range (Client Errors)
      - 400 Bad Request: The server cannot process the request due to a client error, such as malformed syntax or invalid request message framing.
      - 401 Unauthorized: Similar to 403, but specifically indicates that authentication is required and has failed or has not been provided.
      - 403 Forbidden: The client does not have permission to access the requested resource.
      - 404 Not Found: The requested resource could not be found on the server.
500 Range (Server Errors)
      - 500 Internal Server Error: A generic error message indicating that an unexpected condition was encountered on the server.
      - 501 Not Implemented: The server does not support the functionality required to fulfill the request.
      - 502 Bad Gateway: The server, while acting as a gateway or proxy, received an invalid response from an upstream server.
      - 503 Service Unavailable: The server is currently unable to handle the request due to temporary overloading or maintenance of the server.

3. What does the HTTP header content-type allows you to do?
The Content-Type HTTP header allows the sender to indicate the media type (or MIME type) of the resource being sent in the HTTP message body.

The Content-Type header is specified in the HTTP response when a server sends data to a client, and it can also be used in the request to specify the media type of the data the client is sending to the server.

Common Content-Type values include:
text/html: HTML documents
text/plain: Plain text
application/json: JSON (JavaScript Object Notation) data
application/xml: XML (eXtensible Markup Language) data
image/jpeg: JPEG image
image/png: PNG image
application/pdf: PDF document
multipart/form-data: Used in HTML forms that include binary data, such as file uploads

4. What do the following attributes of a cookie do?
- Domain
- Path
- SameSite
- HTTPOnly


5. Assuming the following Express middleware, what would be the console.log output for an HTTP GET request with a URL path of /foo/bar?


6. Given the following Express service code: What does the following JavaScript fetch return?


7. Given the following MongoDB query
`{ cost: { $gt: 10 }, name: /fran.*/}`
select all of the matching documents.


8. How should you store user passwords in a database?


9. Assuming the following Node.js service code is executing with websockets, what will be logged to the console of the web browser?


10. What is the WebSocket protocol used for?


11. What is JSX and how are the curly braces rendered?


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

