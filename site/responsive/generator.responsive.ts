import type { T_ComponentConfig, T_Component_Config_Map } from "@/types/T_ComponentConfig";

const HomeHeader: T_ComponentConfig = {
	sizes: {
		height: 0.1,
		width: 1,
	},
	children: {},
};

const HomeMain: T_ComponentConfig = {
	sizes: {
		height: 0.9,
		width: 1,
	},
	children: {},
};

const Generator: T_ComponentConfig = {
	sizes: {
		height: 1,
		width: 1,
	},
	children: {
		HomeHeader,
		HomeMain,
	},
};

export const GeneratorResponsiveConfig: T_Component_Config_Map = {
	Generator,
};
