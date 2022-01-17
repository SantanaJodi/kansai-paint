import {createContext, useState} from "react";

export const Context = createContext();

export function GlobalState({children}) {
	const [state, setState] = useState({});

	return (
		<Context.Provider value={[state, setState]}>
			{children}
		</Context.Provider>
	);
}
