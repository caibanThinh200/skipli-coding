# skipli-coding
This is my small project for the assignment 
Tech stack: ReactJS, Ant design, Axios, NodeJS, Twilio, Firebase, Express
Third library: Github Api

Before access to the project:
- Use your github profile to create an access token
- Use your firebase config
- Use your twilio config
- Paste all of the information to relative environment variable have been setup

Project folder structure
- There will be 2 folder on the root represent for the client and server
- On the client i use ReactJS so it will have the basic structure of the initial React project, there will be **App.js** file that is the root of all React components, it contains the <RootRouter> which is the component that implement React-router-dom for page route, and it would be the place to manange all the component by certain URL, and all the Component is put in the Page folder which has an index file to combine all toghether
  
![alt text](https://user-images.githubusercontent.com/67794875/217316128-9fa7414f-6a99-420e-955c-6d1384148bee.png)
  
- On the server i use NodeJS and express and it will have to file is **sever.js** to run the server and **app.js** to build and maintain all the http request. There will be 3 main folder: Config, Route, Controller
  + Config: Folder for setup and implement third library and database, ex: Firebase, Twilio
  + Route: Folder for structure and define Api route
  + Controller: Folder for handle logical request and return the response for each route
  
  ![image](https://user-images.githubusercontent.com/67794875/217317698-05b22efd-a350-4b49-b837-88113ff2a3cd.png)
