import { useContext, useEffect, useRef, useState } from "react";
import "./Preview.css";
import { CodingamerDataContext } from "@/context_providers/CodingamerData";
import { ActivatedBadgesContext } from "@/context_providers/ActivatedBadges";
import { generate_url } from "@/utils/generate_url";
import { Spinner } from "@/components/ui/Spinner/Spinner";

const svg_base_url = "/svg_card/";

export function Preview({ className, style }: { className?: string; style?: React.CSSProperties }) {
	const { codingamer, isLoading } = useContext(CodingamerDataContext);
	const { activated_badges } = useContext(ActivatedBadgesContext);
	const [sizes, setSizes] = useState<{ height: number; width: number } | null>(null);
	const [isUpdating, setIsUpdating] = useState(false);
	const isFirstRender = useRef(true);

	useEffect(() => {
		if (!sizes) setSizes({ width: window.innerWidth, height: window.innerHeight });
		function resizeEventHandler() {
			setSizes({ width: window.innerWidth, height: window.innerHeight });
		}
		window.addEventListener("resize", resizeEventHandler);
		return () => {
			window.removeEventListener("resize", resizeEventHandler);
		};
	}, []);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		if (codingamer) setIsUpdating(true);
	}, [activated_badges]);

	if (!codingamer) {
		return (
			<div className={"preview--loading " + (className ?? "")}>{isLoading && <Spinner />}</div>
		);
	}

	return (
		<div className={"preview-wrapper " + (className ?? "")} style={style}>
			<img
				className="preview"
				src={generate_url(
					codingamer.public_handle,
					svg_base_url,
					(sizes?.width || 0) * (sizes && sizes.width <= 768 ? 1 : 0.5),
					activated_badges.join(",")
				)}
				alt="Preview of the generated image."
				onLoad={() => setIsUpdating(false)}
			/>
			{isUpdating && (
				<div className="preview-overlay">
					<Spinner />
				</div>
			)}
		</div>
	);
}
