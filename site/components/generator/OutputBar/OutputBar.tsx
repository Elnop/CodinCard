import { ActivatedBadgesContext } from "@/context_providers/ActivatedBadges";
import "./OutputBar.css";
import { CodingamerDataContext } from "@/context_providers/CodingamerData";
import { useContext, useEffect, useState } from "react";
import { generate_url } from "@/utils/generate_url";

interface IOutputBarProps {
	title: string;
	base_url?: string;
}

export function OutputBar({ title, base_url }: IOutputBarProps) {
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
		void navigator.clipboard.writeText(
			generate_url(codingamer.public_handle, base_url, 1000, activated_badges.join(","))
		);
		setIsClicked(true);
	}
	return (
		<div className="outputbar_container">
			<h2 className="outputbar_title">{title}</h2>
			{!codingamer || !base_url ? (
				<div className="outputbar_field_container" onClick={clickHandler}>
					<div className="outputbar_field_hover-popup">
						<p>Loading</p>
					</div>
					<p className="outputbar_field">loading..</p>
				</div>
			) : (
				<div className="outputbar_field_container" onClick={clickHandler}>
					<div className="outputbar_field_hover-popup">
						<p>{isClicked ? "COPIED !" : "CLICK TO COPY"}</p>
					</div>
					<p className="outputbar_field">
						{generate_url(codingamer.public_handle, base_url, 1000, activated_badges.join(","))}
					</p>
				</div>
			)}
		</div>
	);
}
