import type {
	T_ComponentConfig,
	T_Component_Sizes,
	T_Component_Config_Map,
	T_Component_Responsive,
} from "@/types/T_ComponentConfig";
import { createContext, useEffect, useState } from "react";

export const ResponsiveContext = createContext<{
	responsive: T_Component_Config_Map;
}>({ responsive: {} });

function get_breakpoints_sizes(comp: T_ComponentConfig, app_size: T_Component_Sizes) {
	const width = comp?.breakpoints
		?.filter((b) => app_size.width && b.on.width && b.on.width < app_size.width)
		?.sort((a, b) => {
			if (!a.on.width) return 0;
			if (!b.on.width) return 0;
			return a.on.width - b.on.width;
		})[0]?.sizes.width;
	const height = comp?.breakpoints
		?.filter((b) => app_size.height && b.on.height && b.on.height < app_size.height)
		?.sort((a, b) => {
			if (!a.on.height) return 0;
			if (!b.on.height) return 0;
			return a.on.height - b.on.height;
		})[0]?.sizes.height;
	return { width, height };
}

function calc_component_sizes(comp: T_ComponentConfig, parent_size: T_Component_Sizes) {
	const { height, width } = get_breakpoints_sizes(comp, parent_size);
	if (!parent_size.height) parent_size.height = 1;
	if (!parent_size.width) parent_size.width = 1;
	return {
		height: (height ?? comp?.sizes?.height ?? 0) * parent_size.height,
		width: (width ?? comp?.sizes?.width ?? 0) * parent_size.width,
	};
}

function config_to_responsive(
	comp: T_ComponentConfig,
	parent_size: T_Component_Sizes
): T_Component_Responsive {
	return {
		style: {
			...comp.style,
			...calc_component_sizes(comp, parent_size),
		},
		className: "" + (comp.className ? " " + comp.className : ""),
	};
}
function configmap_to_responsives(
	map: T_Component_Config_Map,
	parent_size: T_Component_Sizes
): { [K: string]: T_Component_Responsive } {
	let res: { [K: string]: T_Component_Responsive } = {};
	for (const [key, value] of Object.entries(map)) {
		res[key] = config_to_responsive(value, parent_size);
		if (value.children) {
			const p_size = { ...parent_size };
			if (value.sizes?.height) p_size.height = value.sizes.height;
			if (value.sizes?.width) p_size.width = value.sizes.width;
			res = { ...res, ...configmap_to_responsives(value.children, parent_size) };
		}
	}
	return res;
}

export function ResponsiveProvider({
	children,
	config,
}: {
	children: React.ReactNode;
	config: T_Component_Config_Map;
}) {
	const [app_size, set_app_size] = useState<T_Component_Sizes>({ height: 0, width: 0 });
	const [responsive, set_responsive] = useState<{ [K: string]: T_Component_Responsive }>({});

	useEffect(() => {
		if (!app_size.width || !app_size.height)
			set_app_size({ width: window.innerWidth, height: window.innerHeight });
		function resizeEventHandler() {
			set_app_size({ width: window.innerWidth, height: window.innerHeight });
		}
		window.addEventListener("resize", resizeEventHandler);
		return () => {
			window.removeEventListener("resize", resizeEventHandler);
		};
	});
	useEffect(() => {
		set_responsive(configmap_to_responsives(config, app_size));
	}, [app_size]);
	return <ResponsiveContext.Provider value={{ responsive }}>{children}</ResponsiveContext.Provider>;
}
