export function get_base_url() {
	const hostname = process.env.hostname;
	return hostname ?? "http://localhost:3000";
}
