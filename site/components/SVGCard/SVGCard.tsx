import type { ICardProps } from "../Card/Card";
import { Card } from "../Card/Card";
import { readFileSync } from "fs";

const stylesString =
	readFileSync(process.cwd() + "/components/Card/ProgressBar/ProgressBar.styles.css").toString() +
	"\n" +
	readFileSync(process.cwd() + "/components/Card/BadgeList/BadgeList.styles.css").toString() +
	"\n" +
	readFileSync(process.cwd() + "/components/Card/Card.styles.css").toString() +
	readFileSync(process.cwd() + "/components/BadgeSVG/Badge.css").toString() +
	readFileSync(process.cwd() + "/app/globals.css").toString();

export async function SVGCard(props: ICardProps) {
	const card = await Card(props);
	return (
		<>
			<style>{stylesString}</style>
			{card}
		</>
	);
}
