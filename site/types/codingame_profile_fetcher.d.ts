// The codingame_profile_fetcher package references these types in its .d.ts files
// but does not publish them. We declare them locally to satisfy TypeScript.
declare module "codingame_profile_fetcher/dist/types/T_Quest_Certification" {
	export interface T_Quest_Certification {
		category: string;
		level: string;
		description: string;
	}
}

declare module "codingame_profile_fetcher/dist/types/T_Achievement" {
	export interface T_Achievement {
		groupId: string;
		completionTime: number | null;
		title: string;
		description: string;
		imageBinaryId: string;
		level: string;
	}
}

declare module "codingame_profile_fetcher/dist/types/T_Programming_language" {
	export interface T_Programming_Language {
		languageName: string;
		puzzleCount: number;
		certification: boolean;
		logoId: string;
	}
	export interface T_Certification {
		languageName: string;
		logoId: string;
	}
}
