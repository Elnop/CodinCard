export async function img_src_to_buffer(image_src: string): Promise<string> {
	const imageRes = await fetch(image_src);
	return (
		`data:${imageRes.headers.get("Content-Type") || "image/svg+xml"};base64,` +
		Buffer.from(await imageRes.arrayBuffer()).toString("base64")
	);
}
