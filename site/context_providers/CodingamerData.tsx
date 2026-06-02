import type { Codingamer } from "codingame_profile_fetcher";
import { createContext, useCallback, useEffect, useState } from "react";

interface ICodingamerDataContextValue {
	codingamer: Codingamer | null;
	setCodingamer: (profile_url: string) => Promise<void>;
	isLoading: boolean;
}

export const CodingamerDataContext = createContext<ICodingamerDataContextValue>({
	codingamer: null,
	setCodingamer: (_profile_url: string) => Promise.resolve(),
	isLoading: false,
});

export function CodingamerDataProvider({
	children,
	public_handle,
}: Readonly<{ children: React.ReactNode; public_handle?: string }>) {
	const [codingamer, set_codingamer] = useState<Codingamer | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [lastUpdate, setLastUpdate] = useState<number | undefined>();
	let pendingUrl: string | undefined;
	const delay = 5000;

	async function calmDown() {
		return new Promise<void>((resolve) => {
			setTimeout(() => {
				if (pendingUrl) {
					void setCodingamer(pendingUrl);
					pendingUrl = undefined;
				}
				resolve();
			}, delay);
		});
	}

	async function setCodingamer(profile_url: string) {
		if (lastUpdate && Date.now() - lastUpdate < delay) {
			if (pendingUrl) pendingUrl = profile_url;
			else {
				pendingUrl = profile_url;
				await calmDown();
			}
			return;
		}
		setIsLoading(true);
		try {
			const response = await fetch("/get_codingamer", {
				body: JSON.stringify({ profile_url }),
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = (await response.json()) as Codingamer;
			set_codingamer(data);
		} catch {
			set_codingamer(null);
		}
		setIsLoading(false);
		setLastUpdate(Date.now());
	}

	const setCodingamerCallback = useCallback((url: string) => {
		void setCodingamer(url);
	}, []);

	useEffect(() => {
		if (public_handle) setCodingamerCallback("https://www.codingame.com/profile/" + public_handle);
	}, [public_handle, setCodingamerCallback]);

	return (
		<CodingamerDataContext.Provider value={{ codingamer, setCodingamer, isLoading }}>
			{children}
		</CodingamerDataContext.Provider>
	);
}
