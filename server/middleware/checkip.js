// import dotenv from 'dotenv';
// dotenv.config();

// export const checkIpAccess = (req, res, next) => {
//     // Define an array of allowed IP addresses
//     const allowedIps = process.env.ALLOWED_IPS.split(',');

//     // Get the client's IP address from the request object
//     const clientIp = req.ip;
//     if (allowedIps.includes(clientIp)) {
//         next();
//     } else {
//         res.redirect('/forbidden');
//     }
//     }

import dotenv from 'dotenv';
dotenv.config();

export const checkIpAccess = (req, res, next) => {
    // Define an array of allowed IP addresses
    const allowedIps = process.env.ALLOWED_IPS.split(',');

    // Get the client's IP address from the request object
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (allowedIps.includes(clientIp)) {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
};

