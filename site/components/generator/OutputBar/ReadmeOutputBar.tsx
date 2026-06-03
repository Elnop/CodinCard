import { ActivatedBadgesContext } from "@/context_providers/ActivatedBadges";
import "./OutputBar.css";
import { CodingamerDataContext } from "@/context_providers/CodingamerData";
import { useContext, useEffect, useState } from "react";
import { generate_url } from "@/utils/generate_url";

interface IReadmeOutputBarProps {
	title: string;
	base_url?: string;
}

function generate_readme_markdown(public_handle: string, svg_url: string): string {
	return `[![CodinCard](${svg_url})](https://www.codingame.com/profile/${public_handle})`;
}

export function ReadmeOutputBar({ title, base_url }: IReadmeOutputBarProps) {
	const { codingamer } = useContext(CodingamerDataContext);
	const { activated_badges } = useContext(ActivatedBadgesContext);
	const [isClicked, setIsClicked] = useState(false);
	useEffect(() => {
		if (isClicked) {
			setTimeout(() => setIsClicked(false), 1000);
		}
	}, [isClicked]);
	function clickHandler() {
		if (!codingamer || !base_url) return;
		const svg_url = generate_url(codingamer.public_handle, base_url, 1000, activated_badges.join(","));
		void navigator.clipboard.writeText(
			generate_readme_markdown(codingamer.public_handle, svg_url)
		);
		setIsClicked(true);
	}
	const content =
		codingamer && base_url
			? generate_readme_markdown(
					codingamer.public_handle,
					generate_url(codingamer.public_handle, base_url, 1000, activated_badges.join(","))
				)
			: "loading..";
	return (
		<div className="outputbar_container outputbar_container--readme">
			<h2 className="outputbar_title">{title}</h2>
			<div className="outputbar_field_container outputbar_field_container--readme" onClick={clickHandler}>
				<div className="outputbar_field_hover-popup">
					<p>{isClicked ? "COPIED !" : "CLICK TO COPY"}</p>
				</div>
				<p className="outputbar_field outputbar_field--readme">{content}</p>
			</div>
		</div>
	);
}
