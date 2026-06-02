import { img_src_to_buffer } from "@/utils/img_src_to_buffer";
import { get_dimensions_with_ratio } from "../../utils/get_dimensions_with_ratio";
import "./Badge.css";

interface IBadgeProps {
	name: string;
	description: string;
	ratio: number;
	image_src: string;
	color?: string;
	width?: number;
	height?: number;
	style?: React.CSSProperties;
	className?: string;
}

export async function Badge({
	name,
	description,
	image_src,
	color,
	width,
	height,
	ratio,
	style,
	className,
}: IBadgeProps) {
	const { width: w, height: h } = get_dimensions_with_ratio(ratio, width, height);
	let image_buffer = "";
	try {
		image_buffer = await img_src_to_buffer(image_src);
	} catch {}
	return (
		<div className={"badge " + (className ?? "")} style={{ height: h, width: w, ...style }}>
			<div className="badge_image_container" style={{ backgroundColor: color }}>
				<div
					className="badge_image"
					style={{
						height: h * 0.8,
						width: h * 0.8,
						padding: Math.floor(h * 0.1),
						backgroundImage: `url(${image_buffer})`,
						backgroundSize: "contain",
						backgroundPosition: "center",
						backgroundOrigin: "content-box",
						backgroundRepeat: "no-repeat",
					}}
				/>
			</div>
			<div className="badge_texts" style={{ left: h * 1, width: w - h - w * 0.02 }}>
				<div className="badge_name_container">
					<p style={{ fontSize: Math.floor(h * 0.3) }} className="badge_name">
						{name}
					</p>
				</div>
				<p
					className="badge_description"
					style={{
						fontSize: Math.floor(h * 0.29),
					}}
				>
					{description}
				</p>
			</div>
		</div>
	);
}
