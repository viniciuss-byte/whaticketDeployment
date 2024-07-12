import React, { useState, useEffect } from "react";
import QRCode from 'qrcode.react';
import openSocket from "socket.io-client";
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
	container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
	paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    qrCode: {
        width: '200px',
        height: '200px',
    },
}));

function QRCodeIframe(whatsAppId) {
	const [qrCode, setQrCode] = useState('');
	const classes = useStyles();
    const [isConnected, setIsConnected] = useState(false);


	useEffect(() => {
        const fetchQRCode = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}`);
                setQrCode(response.data.qrCode);
            } catch (error) {
                console.error('Failed to fetch QR code', error);
            }
        };

        fetchQRCode();
    }, []);

    useEffect(() => {
        const socket = openSocket(`${process.env.REACT_APP_BACKEND_URL}`);

        socket.on("whatsappSession", data => {
            if (data.action === "update" && data.session.qrcode) {
                setQrCode(data.session.qrcode);
            }
            if (data.action === "update" && data.session.connected) {
                setIsConnected(true);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (isConnected) {
            toast.success("WhatsApp conectado com sucesso!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000, 
            });
        }
    }, [isConnected]);

	return (
        <div className={classes.container}>
		<Paper className={classes.paper}>
            <Typography variant="h6">QR-Code</Typography>
            {qrCode ? (
				<div className={classes.qrCode}>
				  <QRCode value={qrCode} size={256} />
			  </div>
			) : (
                <Typography color="error">Carregando..</Typography>
            )}
            <ToastContainer/>
			<br/>
            <br/>
            <br/>
        </Paper>

	</div>
	);
}

export default QRCodeIframe;

