// codingame_profile_fetcher does not publish its T_* .d.ts files, so member access on its types cannot be resolved by TS
/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */
import type {
	T_Quest_Certification,
	T_Programming_Language,
	T_Achievement,
} from "codingame_profile_fetcher";
import { Badge } from "../../Badge/Badge";
import { achievement_to_badge, language_to_badge, quest_to_badge } from "@/utils/query_to_badges";
import type { IBadge } from "@/types/Badge";
import React, { useContext, useEffect, useState } from "react";
import { ActivatedBadgesContext } from "@/context_providers/ActivatedBadges";
import { CodingamerDataContext } from "@/context_providers/CodingamerData";

function BadgeBtn({ id, badge_props, width }: { id: string; badge_props: IBadge; width: number }) {
	const { codingamer } = useContext(CodingamerDataContext);
	const { activated_badges, set_activated_badges } = useContext(ActivatedBadgesContext);
	const [isClicked, setIsClicked] = useState(activated_badges.indexOf(id) !== -1);

	function onClickHandler(e: React.MouseEvent<HTMLElement>) {
		e.preventDefault();
		if (isClicked) {
			set_activated_badges(activated_badges.filter((badge) => badge !== e.currentTarget.id));
			setIsClicked(false);
		} else if (activated_badges.length < 21) {
			activated_badges.push(e.currentTarget.id);
			set_activated_badges([...activated_badges]);
			setIsClicked(true);
		}
	}

	useEffect(() => {
		setIsClicked(false);
	}, [codingamer]);

	return (
		<div
			key={id}
			id={id}
			className={`badge-btn${isClicked ? " badge-btn--active" : ""}`}
			onClick={onClickHandler}
			style={{
				borderWidth: width * 0.02,
				marginLeft: width * 0.05,
				width: width,
				height: width / 4 + width * 0.03,
			}}
		>
			<Badge ratio={4} width={width - width * 0.04} {...badge_props} />
		</div>
	);
}

export function quests_to_badges(
	width: number,
	quests?: T_Quest_Certification[]
): React.JSX.Element[] | undefined {
	const badges: React.JSX.Element[] = [];
	quests?.forEach((quest, index) => {
		const props = quest_to_badge(quest);
		if (!props) return;
		badges.push(<BadgeBtn key={index} id={quest.category} badge_props={props} width={width} />);
	});
	return badges;
}

export function programming_languages_to_badges(
	width: number,
	programming_languages?: T_Programming_Language[]
): React.JSX.Element[] {
	const badges: React.JSX.Element[] = [];
	programming_languages?.forEach((lang, index) => {
		const props = language_to_badge(lang);
		if (!props) return;
		badges.push(<BadgeBtn key={index} id={lang.logoId} badge_props={props} width={width} />);
	});
	return badges;
}

export function achievements_to_badges(
	width: number,
	achievements?: T_Achievement[]
): React.JSX.Element[] {
	const badges: React.JSX.Element[] = [];
	achievements?.forEach((ach, index) => {
		const props = achievement_to_badge(ach);
		if (!props) return;
		badges.push(<BadgeBtn key={index} id={ach.imageBinaryId} badge_props={props} width={width} />);
	});
	return badges;
}
