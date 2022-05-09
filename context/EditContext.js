import { createContext, useState } from "react";

export const EditContext = createContext();

export function EditProvider({ children }) {
	const [editActive, setEditActive] = useState(false);
	const [editObject, setEditObject] = useState(null);

	return (
		<EditContext.Provider
			value={{ editActive, setEditActive, editObject, setEditObject }}
		>
			{children}
		</EditContext.Provider>
	);
}
