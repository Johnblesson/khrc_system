// Middleware to check if user and admin are active
export const checkUserAndAdminStatus = (req, res, next) => {
    const user = req.user;

    if (user && user.status === 'active') {
        next(); // User is active, proceed to the next middleware or route handler
    } else {
        res.status(403).json({ msg: 'Account has been deactivated or does not have sufficient privileges' });
    }
};

export const checkAdminStatus = (req, res, next) => {
    const admin = req.user;

    if (admin && admin.status === 'active' && admin.role === 'admin') {
        next(); // Admin is active, proceed to the next middleware or route handler
    } else {
        res.status(403).json({ msg: 'Admin account has been deactivated or does not have sufficient privileges' });
    }
};