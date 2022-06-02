import { createContext, useState } from "react";

export const EditContext = createContext();

export function EditProvider({ children }) {
	const [editActive, setEditActive] = useState(false);
	const [editObject, setEditObject] = useState(null);
	const [editedPosts, setEditedPosts] = useState([]);

	return (
		<EditContext.Provider
			value={{
				editActive,
				setEditActive,
				editObject,
				setEditObject,
				editedPosts,
				setEditedPosts,
			}}
		>
			{children}
		</EditContext.Provider>
	);
}
