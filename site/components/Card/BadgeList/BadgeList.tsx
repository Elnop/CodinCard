import React from "react";
import { Badge } from "@/components/BadgeSVG/Badge";
import type { IBadge } from "@/types/Badge";
import "./BadgeList.styles.css";

function badge_scale(badge_count: number) {
	if (badge_count > 10) return 0.3;
	if (badge_count >= 4) return 0.48;
	return 1;
}

function badge_ratio(badge_count: number) {
	if (badge_count > 10) return 3.5;
	if (badge_count >= 4) return 4;
	if (badge_count > 2) return 5;
	return 4;
}

function badge_list_display(badge_count: number) {
	if (badge_count > 10) return "inline-block";
	if (badge_count >= 4) return "inline-block";
	return "inline-flex";
}

async function generate_list(badges: IBadge[], width: number, ratio: number) {
	const list: React.JSX.Element[] = [];
	for (const badge of badges) {
		list.push(await Badge({ ...badge, width, ratio }));
	}
	return list;
}

export async function BadgeList({ badges, width }: { badges: IBadge[]; width: number }) {
	const badge_width = width * badge_scale(badges.length);
	const ratio = badge_ratio(badges.length);
	const list = await generate_list(badges, badge_width, ratio);
	if (badges.length > 21) badges = badges.splice(0, 21);
	return (
		<div style={{ display: badge_list_display(badges.length) }} className="card-min_badges-list">
			{list}
		</div>
	);
}
