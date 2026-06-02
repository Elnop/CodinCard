import type { CSSProperties } from "react";

export type T_Component_Sizes = {
	height?: number;
	width?: number;
};

export type T_Component_BreakPoint = {
	on: T_Component_Sizes;
	sizes: T_Component_Sizes;
};

export type T_Component_Config_Map = {
	[K: string]: T_ComponentConfig;
};

export type T_ComponentConfig = {
	sizes?: T_Component_Sizes;
	style?: CSSProperties;
	className?: string;
	breakpoints?: T_Component_BreakPoint[];
	children?: T_Component_Config_Map;
};

export type T_Component_Responsive = {
	style: CSSProperties;
	className: string;
};
