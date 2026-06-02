import type { JSXElementConstructor, ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server.edge";

export const reactToString = (
	component: ReactElement<
		Record<string, unknown>,
		string | JSXElementConstructor<Record<string, unknown>>
	>
): string => {
	return renderToStaticMarkup(component);
};
