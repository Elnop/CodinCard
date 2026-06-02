import { readFileSync } from "fs";
import path from "path";

export async function img_src_to_buffer(image_src: string): Promise<string> {
	if (image_src.startsWith("/")) {
		const file_path = path.join(process.cwd(), "public", image_src);
		const buffer = readFileSync(file_path);
		return `data:image/svg+xml;base64,` + buffer.toString("base64");
	}
	const imageRes = await fetch(image_src);
	return (
		`data:${imageRes.headers.get("Content-Type") || "image/svg+xml"};base64,` +
		Buffer.from(await imageRes.arrayBuffer()).toString("base64")
	);
}
