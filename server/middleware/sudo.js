import dotenv from 'dotenv';
dotenv.config();

export const superAdminOnly = (req, res, next) => {
    // Define an array of allowed IP addresses
    const allowedIps = process.env.SUPER_ADMIN_IPS.split(',');

    // Get the client's IP address from the request object
    const clientIp = req.ip;
    if (allowedIps.includes(clientIp)) {
        next();
    } else {
        res.redirect('/forbidden');
    }
    };