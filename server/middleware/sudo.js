// import dotenv from 'dotenv';
// dotenv.config();

// export const checkForIpAddress = (req, res, next) => {
//     // Define an array of allowed IP addresses
//     const allowedIps = process.env.SUPER_ADMIN_IPS.split(',');

//     // Get the client's IP address from the request object
//     const clientIp = req.ip;
//     if (allowedIps.includes(clientIp)) {
//         next();
//     } else {
//         res.redirect('/forbidden');
//     }
//     };

// import dotenv from 'dotenv';
// dotenv.config();

// export const checkForIpAddress = (req, res, next) => {
//     // Define an array of allowed IP addresses
//     const allowedIps = process.env.SUPER_ADMIN_IPS.split(',');

//     // Get the client's IP address from the request headers, considering proxy
//     const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

//     // Split x-forwarded-for to handle multiple proxy servers
//     const forwardedIps = clientIp ? clientIp.split(',') : [];

//     // Extract the first IP address from the forwarded headers
//     const firstIp = forwardedIps.length > 0 ? forwardedIps[0].trim() : null;

//     if (allowedIps.includes(firstIp)) {
//         next();
//     } else {
//         res.redirect('/forbidden');
//     }
// };

import dotenv from 'dotenv';
dotenv.config();

export const checkForIpAddress = (req, res, next) => {
    try {
        // Retrieve the allowed IP addresses from the environment variable
        const allowedIps = process.env.SUPER_ADMIN_IPS.split(',');

        // Get the client's IP address from the request headers, considering proxy
        const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        // Split x-forwarded-for to handle multiple proxy servers
        const forwardedIps = clientIp ? clientIp.split(',') : [];

        // Extract the first IP address from the forwarded headers
        const firstIp = forwardedIps.length > 0 ? forwardedIps[0].trim() : null;

        // Check if the client's IP address is in the list of allowed IPs
        if (allowedIps.includes(firstIp)) {
            next(); // Proceed to the next middleware or route handler
        } else {
            // Redirect the client to the forbidden page if IP is not allowed
            res.redirect('/forbidden');
        }
    } catch (error) {
        // Handle any errors gracefully
        console.error('Error in checkForIpAddress middleware:', error);
        res.status(500).send('Internal Server Error');
    }
};
