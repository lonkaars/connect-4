import { ReactNode, createContext } from 'react';
import { io as socket, Socket } from 'socket.io-client';

export var SocketContext = createContext<{ io?: Socket }>({});
export function SocketContextWrapper(props: { children?: ReactNode }) {
	var io = socket();

	return <SocketContext.Provider value={{ io }}>
		{ props.children }
	</SocketContext.Provider>
}

