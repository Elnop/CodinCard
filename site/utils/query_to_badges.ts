// codingame_profile_fetcher does not publish its T_* .d.ts files, so member access on its types cannot be resolved by TS
/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument */
import type { IBadge } from "@/types/Badge";
import { strlevel_to_color } from "./get_color";
import { get_quest_image_path, get_quest_name } from "./quest_certifications";
import type {
	T_Quest_Certification,
	T_Achievement,
	T_Programming_Language,
	Codingamer,
} from "codingame_profile_fetcher";
import { get_image_url } from "codingame_profile_fetcher";

export function quest_to_badge(row_object: T_Quest_Certification): IBadge | undefined {
	const image_src = get_quest_image_path(row_object.category);
	const name = get_quest_name(row_object.category);
	const description = row_object.description;
	if (!image_src || !name || !description) return;
	return {
		name,
		description,
		image_src,
		color: strlevel_to_color(row_object.level),
	};
}

export function achievement_to_badge(row_object: T_Achievement): IBadge {
	return {
		name: row_object.title,
		description: row_object.description,
		descrition_color: false,
		image_src: get_image_url(row_object.imageBinaryId),
		color: strlevel_to_color(row_object.level),
	};
}

export function language_to_badge(row_object: T_Programming_Language): IBadge {
	return {
		name: row_object.languageName,
		description:
			row_object.puzzleCount +
			" puzzle" +
			(row_object.puzzleCount > 1 ? "s" : "") +
			" solved - " +
			(row_object.certification ? "certified" : "uncertified"),
		descrition_color: false,
		image_src: get_image_url(row_object.logoId),
	};
}

export function query_to_badges(badges_query: string, codingamer: Codingamer): IBadge[] {
	const badge_objects: IBadge[] = [];
	badges_query?.split(",").forEach((badge_id) => {
		let badge;
		if (codingamer.quest_certifications?.find((cert) => cert.category == badge_id))
			badge = quest_to_badge(
				codingamer.quest_certifications.find((cert) => cert.category == badge_id)
			);
		if (codingamer.achievements?.find((cert) => cert.imageBinaryId == badge_id))
			badge = achievement_to_badge(
				codingamer.achievements.find((cert) => cert.imageBinaryId == badge_id)
			);
		if (codingamer.programming_languages?.find((cert) => cert.logoId == badge_id))
			badge = language_to_badge(
				codingamer.programming_languages.find((cert) => cert.logoId == badge_id)
			);
		if (badge) badge_objects.push(badge);
	});
	return badge_objects;
}
