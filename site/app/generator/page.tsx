"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "./style.css";
import { BadgesTab } from "@/components/generator/BadgesTab/BadgesTab";
import { ProfileUrlForm } from "@/components/generator/ProfileUrlForm/ProfileUrlForm";
import { OutputBar } from "@/components/generator/OutputBar/OutputBar";
import { GeneratorProviders } from "@/context_providers/GeneratorProviders";
import { Redirector } from "../../components/generator/Redirector";
import type { CardProps } from "@/types/CardProps";
import { Preview } from "@/components/generator/Preview/Preview";

function HomeHeader() {
	return (
		<header className="generator_header">
			<a className="header_logo" href="/">
				<span className="header_title">
					<span className="header_title_codin">Codin</span>
					<span className="header_title_card">Card</span>
				</span>
			</a>
			<h1 className="header_center_title">CodinCard</h1>
		</header>
	);
}

function HomeMain() {
	const [svg_base_url, set_svg_base_url] = useState<string | undefined>(undefined);
	useEffect(() => {
		set_svg_base_url(window.location.host + "/svg_card/");
	}, []);
	return (
		<main className="generator_main">
			<div className="generator_left">
				<BadgesTab />
			</div>
			<div className="generator_right">
				<ProfileUrlForm />
				<Preview />
				<OutputBar base_url={svg_base_url} title="SVG link" />
			</div>
		</main>
	);
}

function GeneratorPageInner() {
	const rawParams = useSearchParams();
	const searchParams: CardProps = {
		public_handle: rawParams.get("public_handle") ?? undefined,
		badges: rawParams.get("badges") ?? undefined,
		h: rawParams.get("h") != null ? Number(rawParams.get("h")) : undefined,
		w: rawParams.get("w") != null ? Number(rawParams.get("w")) : undefined,
		bg_color: rawParams.get("bg_color") ?? undefined,
		bg_img: rawParams.get("bg_img") != null ? rawParams.get("bg_img") === "true" : undefined,
	};
	return (
		<div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column" }}>
			<GeneratorProviders url_params={searchParams}>
				<Redirector />
				<HomeHeader />
				<HomeMain />
			</GeneratorProviders>
		</div>
	);
}

export default function GeneratorPage() {
	return (
		<Suspense fallback={null}>
			<GeneratorPageInner />
		</Suspense>
	);
}
