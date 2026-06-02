const LEGEND_COLOR = "#F76451";
const GOLD_COLOR = "#f4ae3d";
const SILVER_COLOR = "#849AA4";
const BRONZE_COLOR = "#B6A28B";
const NOOB_COLOR = "#7CC576";

export function get_rank_color(rank_title_id: number) {
	switch (rank_title_id) {
		case 0:
			return LEGEND_COLOR;
		case 1:
			return GOLD_COLOR;
		case 2:
			return SILVER_COLOR;
		case 3:
			return BRONZE_COLOR;
		case 4:
			return NOOB_COLOR;
		case 5:
			return NOOB_COLOR;
		case 6:
			return NOOB_COLOR;
		default:
			return NOOB_COLOR;
	}
}

export function get_lvl_color(level: number) {
	if (level >= 40) return LEGEND_COLOR;
	if (level >= 30) return GOLD_COLOR;
	if (level >= 20) return SILVER_COLOR;
	if (level >= 10) return BRONZE_COLOR;
	return NOOB_COLOR;
}

export function strlevel_to_color(strlevel: string): string {
	switch (strlevel) {
		case "LEGEND":
			return LEGEND_COLOR;
		case "PLATINUM":
			return LEGEND_COLOR;
		case "GOLD":
			return GOLD_COLOR;
		case "SILVER":
			return SILVER_COLOR;
		case "BRONZE":
			return BRONZE_COLOR;
	}
	return NOOB_COLOR;
}
