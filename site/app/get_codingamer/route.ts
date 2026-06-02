// codingame_profile_fetcher does not publish its T_* .d.ts files, so member access on its types cannot be resolved by TS
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { T_Achievement } from "codingame_profile_fetcher";
import { get_codingamer_by_url } from "codingame_profile_fetcher";

export async function POST(req: Request) {
	try {
		if (!req.body) return new Response("No profile_url provided or invalid", { status: 404 });
		const { profile_url } = (await req.json()) as { profile_url?: string };
		if (!profile_url) return new Response("No profile_url provided or invalid", { status: 404 });
		const codingamer = await get_codingamer_by_url(profile_url);
		const achs: T_Achievement[] = [];
		codingamer.achievements?.forEach((ach) => {
			if (ach.completionTime && achs.filter((a) => a.groupId == ach.groupId).length == 0)
				achs.push(ach);
		});
		codingamer.achievements = achs;
		return Response.json(codingamer);
	} catch (error: unknown) {
		if (
			error instanceof Error &&
			(error.name == "SyntaxError" || error.name == "fetch_basic_data : api_return_null")
		)
			return new Response("No profile_url provided or invalid", { status: 404 });
		else {
			console.error(error);
			return new Response("Internal error", { status: 500 });
		}
	}
}
