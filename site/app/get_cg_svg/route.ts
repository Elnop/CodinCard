import { get_image_url } from "codingame_profile_fetcher";

export async function GET(req: Request) {
	const image_id = new URL(req.url).searchParams.get("image_id");
	if (!image_id) return new Response("No image_id provided", { status: 404 });
	try {
		const response = await fetch(get_image_url(image_id));
		if (!response.ok) throw new Error("Failed to fetch image from URL");
		const imageBuffer = await response.blob();
		return new Response(imageBuffer, {
			headers: { "Content-Type": req.headers.get("Content-Type") || "image/svg+xml" },
		});
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : "Internal error";
		return new Response(message, { status: 500 });
	}
}
