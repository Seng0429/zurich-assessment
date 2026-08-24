# Zurich Assessment - Theng Wei Seng

### Tech Stacks Used ###
1. NodeJS version: v24.18.0
2. NEXTJS version: 16.3.1


### How to setup and run this project? ###
1. Create a `.env` file in the root folder using the values provided separately in email (or via `.env.example` as reference).
2. Run "npm ci" in terminal (if node_modules not installed correctly, run "npm install" instead )
3. Run "npm run dev" to start the app.
4. Go to browser with url = http://localhost:3000.


### COMMANDS ###
1. npm run dev
2. npm run test
3. npm run test:coverage

### ROUTES ###
1. http://localhost:3000/home
2. http://localhost:3000/home?page=1
3. http://localhost:3000/home?page=2
4. http://localhost:3000/login


### FEATURES ###
1. Google oauth2 to login.
2. Unauthorized users will be shown with an error page
(Click on the header grey circle (profile) to show a dropdown that allow the user to sign out).
3. The users list are filtered based on the requirement.
4. Mask user email, and have a button to click on to display it.
5. Pagination with 2 pages as API total pages are 2 only.
