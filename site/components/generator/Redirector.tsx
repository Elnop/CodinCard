import { useContext, useEffect } from "react";
import { generate_url } from "../../utils/generate_url";
import { useRouter } from "next/navigation";
import { ActivatedBadgesContext } from "@/context_providers/ActivatedBadges";
import { CodingamerDataContext } from "@/context_providers/CodingamerData";

const generator_base_url = "/generator";

export function Redirector() {
	const { activated_badges, set_activated_badges } = useContext(ActivatedBadgesContext);
	const { codingamer } = useContext(CodingamerDataContext);
	const router = useRouter();

	useEffect(() => {
		set_activated_badges([]);
	}, [codingamer]);

	useEffect(() => {
		const url = window.location.href;
		if (!codingamer) return;
		const new_url = generate_url(
			codingamer.public_handle,
			generator_base_url,
			1000,
			activated_badges.join(",")
		);
		if (url != new_url) router.push(new_url);
	}, [activated_badges]);

	return null;
}
