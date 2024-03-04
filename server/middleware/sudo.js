// import dotenv from 'dotenv';
// dotenv.config();

// export const superAdminOnly = (req, res, next) => {
//     // Define an array of allowed IP addresses
//     const allowedIps = process.env.SUPER_ADMIN_IPS;
    
//     // Check if allowedIps is defined and not empty
//     if (allowedIps && allowedIps.length > 0) {
//         // Split the string into an array of IP addresses
//         const allowedIpsArray = allowedIps.split(',');

//         // Get the client's IP address from the request object
//         const clientIp = req.ip;

//         // Check if the client's IP address is in the allowed IPs array
//         if (allowedIpsArray.includes(clientIp)) {
//             next();
//         } else {
//             res.redirect('/forbidden');
//         }
//     } else {
//         // If allowedIps is undefined or empty, deny access
//         res.redirect('/forbidden');
//     }
// }

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
    }