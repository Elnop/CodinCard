import type { IBadge } from "@/types/Badge";
import type { Codingamer } from "codingame_profile_fetcher";
import { CodingameLogo } from "../svg/codingameLogo";
import { ProgressBar } from "./ProgressBar/ProgressBar";
import { BadgeList } from "./BadgeList/BadgeList";
import { get_lvl_color, get_rank_color } from "@/utils/get_color";
import { LevelLogo } from "../svg/LevelLogo";
import { RankLogo } from "../svg/RankLogo";
import "./Card.styles.css";
import { img_src_to_buffer } from "@/utils/img_src_to_buffer";

export interface ICardProps {
	height: number;
	width: number;
	codingamer?: Codingamer;
	bg_img?: boolean;
	bg_color?: string;
	badge_objects?: IBadge[];
	className?: string;
	styles?: React.CSSProperties;
}

export async function Card({
	height,
	width,
	codingamer,
	bg_img,
	bg_color,
	badge_objects,
	className,
	styles,
}: ICardProps) {
	if (
		!codingamer ||
		!codingamer.avatar_url ||
		codingamer.rank_title_id == undefined ||
		!codingamer.pseudo ||
		!codingamer.level ||
		!codingamer.xp ||
		!codingamer.xp_threshold ||
		!codingamer.rank ||
		!codingamer.rank_title_threshold
	)
		return <div style={{ color: "#d9d9d9", fontFamily: "sans-serif", padding: "1rem" }}>CodinGame</div>;
	let avatarBuffer = "";
	let coverBuffer = "";
	try {
		avatarBuffer = await img_src_to_buffer(codingamer.avatar_url);
		coverBuffer = await img_src_to_buffer(codingamer.cover_url);
	} catch {}
	const badge_list = badge_objects
		? await BadgeList({ badges: badge_objects, width: width * 0.55 })
		: null;
	return (
		<div
			className={"card-min_container" + (className ? " " + className : "")}
			style={{
				borderRadius: height * 0.08,
				height: height,
				width: width,
				backgroundImage: bg_img ? `url(${coverBuffer})` : undefined,
				...styles,
			}}
		>
			<div
				style={{ backgroundColor: bg_color, borderRadius: height * 0.08 }}
				className={"card-min_background-filter"}
			>
				<CodingameLogo className={"card-min_codingame-logo"} />
				<div className={"card-min_left-container"}>
					<div className={"card-min_pdp"} style={{ backgroundImage: `url(${avatarBuffer})` }}></div>
					<p className={"card-min_pseudo"} style={{ fontSize: 0.08 * height }}>
						{codingamer.pseudo}
					</p>
					<ProgressBar
						height={height * 0.2 * 0.8}
						width={width * 0.9 * 0.4}
						style={{
							position: "absolute",
							left: "5%",
							bottom: "25%",
						}}
						color={get_lvl_color(codingamer.level)}
						percent={(codingamer.xp / codingamer.xp_threshold) * 100}
						ProgressBarLogo={LevelLogo}
						belowText={`Level ${codingamer.level}`}
					/>
					<ProgressBar
						height={height * 0.2 * 0.8}
						width={width * 0.9 * 0.4}
						style={{
							position: "absolute",
							left: "5%",
							bottom: "2%",
						}}
						color={get_rank_color(codingamer.rank_title_id)}
						percent={
							100 -
							((codingamer.rank - codingamer.rank_title_threshold) /
								codingamer.rank_title_threshold) *
								100
						}
						ProgressBarLogo={RankLogo}
						belowText={`Rank ${codingamer.rank}rd`}
					/>
				</div>
				{badge_list}
			</div>
		</div>
	);
}
