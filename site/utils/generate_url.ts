export function generate_url(
	public_handle: string,
	base_url: string,
	width: number,
	badges: string
): string {
	return (
		`${base_url}?` +
		`w=${Math.floor(width)}` +
		`&public_handle=${public_handle}` +
		`&bg_img=true` +
		`&badges=${badges}`
	);
}
