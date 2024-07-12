import React from 'react';

const Connections02 = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <iframe
                src="/qrcode"
                width="600"
                height="600"
                style={{ border: 'none' }}
                title="QR Code Página"
            ></iframe>
        </div>
    );
};

export default Connections02;