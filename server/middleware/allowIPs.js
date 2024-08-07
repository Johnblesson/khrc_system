export const allowSpecificIPs = () => {
    return (req, res, next) => {
        // Define an array of allowed IP addresses
        const allowedIPs = process.env.ALLOWED_IPS.split(',');

        // Get the client's IP address from the request headers, considering proxy
        const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        // Split x-forwarded-for to handle multiple proxy servers
        const forwardedIps = clientIp ? clientIp.split(',') : [];

        // Extract the first IP address from the forwarded headers
        const firstIp = forwardedIps.length > 0 ? forwardedIps[0].trim() : null;

        // Check if the client's IP address is in the list of allowed IPs
        if (firstIp && allowedIPs.includes(firstIp)) {
            next();
        } else {
            res.redirect('/forbidden');
        }
    };
};