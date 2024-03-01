export const checkIpAccess = (req, res, next) => {
    // Define an array of allowed IP addresses
    const allowedIps = ['192.168.0.144', '192.168.0.191', '192.168.0.192'];

    // Get the client's IP address from the request object
    const clientIp = req.ip;
    if (allowedIps.includes(clientIp)) {
        next();
    } else {
        res.redirect('/forbidden');
    }
    }
    
    