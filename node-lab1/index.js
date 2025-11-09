// Load the http module to create an http server.
import http from 'http';
import dotenv from 'dotenv';
import greeting from './greeting.js';

dotenv.config();
const port = process.env.PORT;

// Configure our HTTP server to respond with Hello World to all requests.
// server takes in a request (req) and sends back a response (res)
const server = http.createServer((req, res) => {
  
  // checks incoming request's language header and saves its contents into "lang"
  let lang = req.headers['accept-language'];
  
  // set a default language code to be used if there's nothing in the language header
  const defaultLang='en';
  
  // if the language code in the header isn't in our greeting file, set "lang" to the defaultLang. Our greeting module has a message for "en" and "fr".
  if (!greeting[lang]) lang=defaultLang;
  
  // prepare the response to be sent back; the response object contains the lang variable and the related message from our greeting file
  const response={
    lang: lang,
    message: greeting[lang],
  };

  // add headers to the response, including the type of content and the language (making use of our response.lang variable)
  res.writeHead(200, {
    'Content-Type': 'text/plain', 
    'Content-Language': response.lang});
    
  // and finally, end the response and send back the message
  res.end(response.message);
});


server.listen(port);

// Put a friendly message on the terminal
console.log(`Server running at ${port}`);
