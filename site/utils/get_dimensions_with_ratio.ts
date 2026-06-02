export function get_dimensions_with_ratio(
	ratio: number,
	width?: number,
	height?: number
): { width: number; height: number } {
	if (!width && height) return { width: height * ratio, height };
	if (width && !height) return { width, height: width / ratio };
	throw new Error("Need width xor height parameter");
}
