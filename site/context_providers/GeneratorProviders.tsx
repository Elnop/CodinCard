"use client";

import type { CardProps } from "@/types/CardProps";
import { ActivatedBadgesProvider } from "./ActivatedBadges";
import { CodingamerDataProvider } from "./CodingamerData";

export function GeneratorProviders({
	children,
	url_params,
}: Readonly<{
	children: React.ReactNode;
	url_params?: CardProps;
}>) {
	return (
		<CodingamerDataProvider public_handle={url_params?.public_handle}>
			<ActivatedBadgesProvider url_list={url_params?.badges?.split(",")}>
				{children}
			</ActivatedBadgesProvider>
		</CodingamerDataProvider>
	);
}
