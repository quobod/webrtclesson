import * as store from './store.js';
import * as ui from './ui.js';
import * as webRTCHandler from './webrtchandler.js';

let socketIO = null;

export const registerSocketEvents = (socket) => {
	socketIO = socket;

	socket.on('connect', () => {
		console.log(`Successfully connected to socket.io server`);
		store.setSocketId(socket.id);
		ui.updatePersonalCode(socket.id);
	});

	socket.on('preoffer', (data) => {
		console.log(`\n\tReceived a preoffer event from server\n\tData:\t${JSON.stringify(data)}`);
		webRTCHandler.handlePreOffer(data);
	});
};

export const sendPreOffer = (data) => {
	console.log(`\n\tEmitting to server preoofer event\n\tData:\t${JSON.stringify(data)}`);
	socketIO.emit('preoffer', data);
};
