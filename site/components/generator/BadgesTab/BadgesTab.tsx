import React, { useContext, useEffect, useRef, useState } from "react";
import "./BadgesTab.css";
import {
	achievements_to_badges,
	programming_languages_to_badges,
	quests_to_badges,
} from "./row_to_badges";
import { CodingamerDataContext } from "@/context_providers/CodingamerData";

function BadgesTabSkeleton({ itemWidth }: { itemWidth: number }) {
	const sections = [{ count: 4 }, { count: 6 }, { count: 5 }];
	const badgeHeight = itemWidth > 0 ? itemWidth / 4 + itemWidth * 0.03 : 0;
	return (
		<div className="badges-tab-skeleton">
			{sections.map((section, si) => (
				<div key={si} className="badges-tab-skeleton__section">
					<div className="badges-tab-skeleton__header">
						<div className="badges-tab-skeleton__header-line" />
					</div>
					<div className="badges-tab-skeleton__items">
						{Array.from({ length: section.count }).map((_, i) => (
							<div
								key={i}
								className="badges-tab-skeleton__badge"
								style={{
									width: itemWidth,
									height: badgeHeight,
									marginLeft: itemWidth * 0.05,
									marginBottom: itemWidth * 0.02,
								}}
							/>
						))}
					</div>
				</div>
			))}
		</div>
	);
}

interface IBadgesTabSectionProps {
	title: string;
	badges: React.JSX.Element[];
}

function BadgesTabSection({ title, badges }: IBadgesTabSectionProps) {
	return (
		<section className={"badges-tab__section"}>
			<div className="badges-tab_section__header">
				<h3>{title}</h3>
			</div>
			<div className="badges-tab_section__items">{badges}</div>
		</section>
	);
}

export function BadgesTab() {
	const { codingamer, isLoading } = useContext(CodingamerDataContext);
	const [badgeWidth, setBadgeWidth] = useState(0);
	const tabRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const updateBadgeWidth = () => {
			if (tabRef.current) setBadgeWidth(tabRef.current.offsetWidth * 0.44);
		};
		updateBadgeWidth();
		const observer = new ResizeObserver(updateBadgeWidth);
		if (tabRef.current) observer.observe(tabRef.current);
		return () => observer.disconnect();
	}, []);

	return (
		<div className="badges-tab" ref={tabRef}>
			<div className="badges-tab-header">
				<h2>Badges</h2>
			</div>
			{isLoading ? (
				<BadgesTabSkeleton itemWidth={badgeWidth} />
			) : !codingamer ? (
				<div></div>
			) : (
				<div className="badges-tab-content">
					<BadgesTabSection
						title="Quests"
						badges={quests_to_badges(badgeWidth, codingamer.quest_certifications) || []}
					/>
					<BadgesTabSection
						title="Programming Languages"
						badges={
							programming_languages_to_badges(badgeWidth, codingamer.programming_languages) || []
						}
					/>
					<BadgesTabSection
						title="Achivements"
						badges={achievements_to_badges(badgeWidth, codingamer.achievements) || []}
					/>
				</div>
			)}
		</div>
	);
}
