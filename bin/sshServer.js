// sshServer.js
import fs from 'fs';
import ssh2 from 'ssh2';

const startSSHServer = () => {
    const allowedKeys = fs.readFileSync('bin/authorized_keys', 'utf-8').trim().split('\n');

    const sshServer = new ssh2.Server({
        hostKeys: [fs.readFileSync('bin/ssh_host_rsa_key')]
    });

    sshServer.on('connection', (session, accept) => {
        const remoteAddress = session.connection.remoteAddress;
        const publicKey = session._state.incomingPacket.slice(26).toString('utf-8');

        if (allowedKeys.includes(publicKey) && remoteAddress === config.allowedIP) {
            accept();
        } else {
            session.disconnect(2, 'Authentication failed.');
        }
    });

    sshServer.listen(22, '0.0.0.0', () => {
        console.log('SSH server running on port 22');
    });
};

export default startSSHServer;
