import { Codingamer } from "codingame_profile_fetcher";
import { get_dimensions_with_ratio } from "@/utils/get_dimensions_with_ratio";
import { query_to_badges } from "@/utils/query_to_badges";
import { SVGCard } from "@/components/SVGCard/SVGCard";
import { reactToString } from "@/utils/renderToString";

type SVGParams = {
	public_handle?: string;
	badges?: string;
	h?: number;
	w?: number;
	bg_color?: string;
	bg_img?: boolean;
};

function get_params(url: URL): SVGParams {
	if (!url) return {};
	const searchParams = url.searchParams;
	return {
		public_handle: searchParams.get("public_handle") ?? undefined,
		badges: searchParams.get("badges") ?? undefined,
		h: searchParams.get("h") ? Number(searchParams.get("h")) : undefined,
		w: searchParams.get("w") ? Number(searchParams.get("w")) : undefined,
		bg_color: searchParams.get("bg_color") ?? undefined,
		bg_img: searchParams.get("bg_img") ? searchParams.get("bg_img") == "true" : false,
	};
}

export async function GET(req: Request) {
	const { public_handle, badges, h, w, bg_img } = get_params(new URL(req.url ?? ""));
	let { bg_color } = get_params(new URL(req.url ?? ""));
	if (!bg_color && bg_img) bg_color = "rgba(37, 46, 56, 0.8)";
	if (!bg_color) bg_color = "#20252A";
	try {
		const { width, height } = get_dimensions_with_ratio(2, w, h);
		if (!public_handle) throw new Error("Need public_handle parameter");
		const codingamer = new Codingamer(public_handle);
		await codingamer.update_all();
		const badge_objects = badges ? query_to_badges(badges, codingamer) : undefined;
		const inner = reactToString(
			await SVGCard({
				codingamer: codingamer,
				width: width,
				height: height,
				bg_color: bg_color,
				bg_img: bg_img,
				badge_objects: badge_objects,
			})
			// Wrap <style> content in CDATA so & in CSS URLs doesn't break SVG XML parsing
		).replace(/<style>([\s\S]*?)<\/style>/g, "<style>/*<![CDATA[*/$1/*]]>*/</style>");
		const svg =
			`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">` +
			`<foreignObject width="100%" height="100%">` +
			`<div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%">` +
			inner +
			`</div>` +
			`</foreignObject>` +
			`</svg>`;
		return new Response(svg, {
			headers: {
				"Content-Type": "image/svg+xml",
				"Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
			},
		});
	} catch (e: unknown) {
		const message = e instanceof Error ? e.message : "Internal error";
		return new Response(message, { status: 500 });
	}
}
