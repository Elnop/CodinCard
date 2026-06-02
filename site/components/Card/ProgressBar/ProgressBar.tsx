import "./ProgressBar.styles.css";

interface IProgressBarProps {
	height: number;
	width: number;
	color: string;
	percent: number;
	ProgressBarLogo?: React.ComponentType<{
		style?: React.CSSProperties;
		className?: string;
		color?: string;
	}>;
	belowText?: string;
	style?: React.CSSProperties;
	className?: string;
}

export function ProgressBar({
	height,
	width,
	color,
	percent,
	ProgressBarLogo,
	belowText,
	style,
	className,
}: IProgressBarProps) {
	return (
		<div className={"progressBar " + className} style={{ height, width, ...style }}>
			<div className={"progress-bar_container"}>
				<div
					className={"progress-bar_threshold"}
					style={
						belowText
							? {
									height: "30%",
									top: "22.5%",
									borderRadius: height * 0.5,
								}
							: { borderRadius: height * 0.5 }
					}
				>
					<div
						className={"progress-bar_progress"}
						style={{
							backgroundColor: color,
							width: percent + "%",
							borderRadius: height * 0.5,
						}}
					></div>
				</div>
				{ProgressBarLogo && (
					<ProgressBarLogo
						style={belowText ? { height: height * 0.75 } : {}}
						className={"progress-bar_logo"}
						color={color}
					/>
				)}
				{belowText && (
					<p
						style={{
							fontSize: height * 0.3,
							top: height * 0.6,
							left: height * 0.75,
							color: color,
						}}
						className={"progress-bar_below-text"}
					>
						{belowText}
					</p>
				)}
			</div>
		</div>
	);
}
