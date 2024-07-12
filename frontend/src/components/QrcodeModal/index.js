import React, { useEffect, useState,useRef  } from "react";
import QRCode from "qrcode.react";
import openSocket from "socket.io-client";
import toastError from "../../errors/toastError";

import { Dialog, DialogContent, Paper, Typography } from "@material-ui/core";
import { i18n } from "../../translate/i18n";
import api from "../../services/api";

const QrcodeModal = ({ open, onClose, whatsAppId, }) => {
	const [qrCode, setQrCode] = useState("");

	const qrRef = useRef(null);

	const handleDownload = () => {
	  const canvas = qrRef.current.querySelector('canvas');
	  const pngUrl = canvas.toDataURL('image/png');
	  const downloadLink = document.createElement('a');
	  downloadLink.href = pngUrl;
	  downloadLink.download = 'qrcode.png';
	  document.body.appendChild(downloadLink);
	  downloadLink.click();
	  document.body.removeChild(downloadLink);
	};

	useEffect(() => {
		const fetchSession = async () => {
			if (!whatsAppId) return;

			try {
				const { data } = await api.get(`/whatsapp/${whatsAppId}`);
				setQrCode(data.qrcode);
			} catch (err) {
				toastError(err);
			}
		};
		fetchSession();
	}, [whatsAppId]);

	useEffect(() => {
		if (!whatsAppId) return;
		const socket = openSocket(process.env.REACT_APP_BACKEND_URL);

		socket.on("whatsappSession", data => {
			if (data.action === "update" && data.session.id === whatsAppId) {
				setQrCode(data.session.qrcode);
			}

			if (data.action === "update" && data.session.qrcode === "") {
				onClose();
			}
		});

		return () => {
			socket.disconnect();
		};
	}, [whatsAppId, onClose]);

	return (
		<Dialog open={open} onClose={onClose} maxWidth="lg" scroll="paper">
			<DialogContent>
				<Paper elevation={0}>
					<Typography color="primary" gutterBottom>
						{i18n.t("qrCode.message")}
					</Typography>
					  <div>
                         <div ref={qrRef}>
                            <QRCode value={qrCode} size={256} />
                      </div>
                         <button onClick={handleDownload}>Baixar QR Code</button>
                    </div>
				</Paper>
			</DialogContent>
		</Dialog>
	);
};

export default React.memo(QrcodeModal);
