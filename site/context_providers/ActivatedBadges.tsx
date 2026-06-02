import { createContext, useState } from "react";

export const ActivatedBadgesContext = createContext<{
	activated_badges: string[];
	set_activated_badges: React.Dispatch<React.SetStateAction<string[]>>;
}>({
	activated_badges: [],
	set_activated_badges: () => {},
});

export function ActivatedBadgesProvider({
	children,
	url_list,
}: {
	children: React.ReactNode;
	url_list?: string[];
}) {
	const [activated_badges, set_activated_badges] = useState<string[]>(url_list ?? []);

	return (
		<ActivatedBadgesContext.Provider value={{ activated_badges, set_activated_badges }}>
			{children}
		</ActivatedBadgesContext.Provider>
	);
}
