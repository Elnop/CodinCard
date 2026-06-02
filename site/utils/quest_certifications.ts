export function get_quest_image_path(category: string): string | undefined {
	switch (category) {
		case "CODING_SPEED":
			return "/quests_certifications/coding_speed.svg";
		case "AI":
			return "/quests_certifications/ai.svg";
		case "OPTIMIZATION":
			return "/quests_certifications/optimization.svg";
		case "ALGORITHMS":
			return "/quests_certifications/algorithms.svg";
		case "COLLABORATION":
			return "/quests_certifications/collaboration.svg";
	}
}

export function get_quest_name(category: string): string | undefined {
	switch (category) {
		case "CODING_SPEED":
			return "Coding speed";
		case "AI":
			return "Artificial Intelligence";
		case "OPTIMIZATION":
			return "Optimization";
		case "ALGORITHMS":
			return "Algorithms";
		case "COLLABORATION":
			return "Collaboration";
	}
}

export function get_quest_descrition(strlevel: string): string | undefined {
	switch (strlevel) {
		case "LEGEND":
			return "Legend level";
		case "GOLD":
			return "Gold level";
		case "SILVER":
			return "Silver level";
		case "BRONZE":
			return "Bronze level";
	}
	return "Wood level";
}
