import { withAuth } from "next-auth/middleware";

// Define the middleware function
const middleware = withAuth(
  // Middleware function that takes 'req' as an argument
  function (req) {
    // Implement any logic here to be executed before the route handler
    // This function can be left empty if no additional logic is needed
  },
  // Options for the middleware
  {
    callbacks: {
      // Callback function to determine if the user is authorized to access the route
      authorized: ({ req, token }) => {
        // Check if the request path starts with '/protected' and the user has a valid token
        if (
          req.nextUrl.pathname.startsWith('/protected') &&
          token === null
        ) {
          // If the conditions are not met, return false to deny access
          return false;
        }
        // If the conditions are met, return true to allow access
        return true;
      }
    }
  }
);

// Export the middleware
export default middleware;
