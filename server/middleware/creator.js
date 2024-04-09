// Define middleware function
export const creatorMiddleware = (req, res, next) => {
    // Assuming you're passing user data via request object
    const { user } = req;
    // Check if creator is true, allow access, otherwise forbid
    if (user && user.creator === true) {
        next(); // Allow access
    } else {
        res.redirect('/not-allow');
    }
};