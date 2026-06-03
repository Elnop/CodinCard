"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import "./landing.css";
import Link from "next/link";

const PROFILE_BASE_URL = "https://www.codingame.com/profile/";

const EXAMPLE_CARDS = [
	{
		handle: "1d87d0a239c8e2f69181240098e0bb515984292",
		badges:
			"AI,OPTIMIZATION,ALGORITHMS,COLLABORATION,1923792023719,1923900460781,1925067246288,1925216916635,50907824792251,50908045908249",
	},
	{
		handle: "e5d7ff0ed3b703ae2529902a9d58e7207985323",
		badges:
			"AI,OPTIMIZATION,ALGORITHMS,CODING_SPEED,COLLABORATION,1925004003634,1925156270740,1923980068700,1922880904560,1922922204694,1922840039192,1923527230935,4465339362534,14440178045771,1923864394396,1923247682469,1923202296412,1925067246288,1923792023719,1923900460781,50907824792251",
	},
	{
		handle: "f9bbfea0c4a031ce1857249bb7a5245c3858193",
		badges:
			"CODING_SPEED,ALGORITHMS,OPTIMIZATION,AI,1923919321884,1925067246288,1925216916635,1923806378980,1925023249158,1925004003634,1924611580559,1925156270740,1924975463423,1923202296412,38823044854472,1923247682469,1922922204694,1922840039192,3448445416671,4465339362534,50908227828169",
	},
	{
		handle: "3799c30a7f390b64b9430ff53613309e489451",
		badges:
			"OPTIMIZATION,AI,ALGORITHMS,CODING_SPEED,1923895836180,1923806378980,1925067246288,1925216916635,1925023249158,1925004003634,1924611580559,1924759959507,50907841803167,50907824792251,50908184669525,50907860075876,50908140938088,50908061361554",
	},
];

function extractHandle(input: string): string {
	const trimmed = input.trim();
	const handle = trimmed.startsWith(PROFILE_BASE_URL)
		? trimmed.slice(PROFILE_BASE_URL.length)
		: trimmed;
	return handle.split(/[?#]/)[0].replace(/\/$/, "");
}

const CODE_CHARS =
	"01アイウエオカキクケコサシスセソタチツテトナニヌネノ{}[]()<>=/\\|+-*&^%$#@!;:,.?~`";

function CodeRainCanvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let animId: number;
		const FONT_SIZE = 14;
		let cols: number;
		let drops: number[];

		function resize() {
			canvas!.width = canvas!.offsetWidth;
			canvas!.height = canvas!.offsetHeight;
			cols = Math.floor(canvas!.width / FONT_SIZE);
			drops = Array.from({ length: cols }, () => 1);
		}

		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(canvas);

		function draw() {
			ctx!.fillStyle = "rgba(13, 17, 23, 0.05)";
			ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
			ctx!.font = `${FONT_SIZE}px "JetBrains Mono", "Courier New", monospace`;

			for (let i = 0; i < drops.length; i++) {
				const char = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
				const y = drops[i] * FONT_SIZE;
				// head glow
				if (drops[i] * FONT_SIZE < 30) {
					ctx!.fillStyle = "#f2bb13";
				} else {
					const alpha = Math.random() * 0.5 + 0.3;
					ctx!.fillStyle = `rgba(242, 187, 19, ${alpha})`;
				}
				ctx!.fillText(char, i * FONT_SIZE, y);

				if (y > canvas!.height && Math.random() > 0.975) drops[i] = 0;
				drops[i]++;
			}

			animId = requestAnimationFrame(draw);
		}

		draw();
		return () => {
			cancelAnimationFrame(animId);
			ro.disconnect();
		};
	}, []);

	return <canvas ref={canvasRef} className="landing_canvas" />;
}

function LandingHero() {
	const router = useRouter();
	const [input, setInput] = useState("");
	const [cardLoaded, setCardLoaded] = useState(false);
	const heroRef = useRef<HTMLElement>(null);
	const [isHeroVisible, setIsHeroVisible] = useState(false);

	useEffect(() => {
		const hero = heroRef.current;
		if (!hero) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsHeroVisible(entry.isIntersecting);
			},
			{ threshold: 0.45 }
		);

		observer.observe(hero);
		return () => observer.disconnect();
	}, []);

	const handle = extractHandle(input);
	const isValid = handle.length > 0;

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!isValid) return;
		router.push(`/generator?public_handle=${encodeURIComponent(handle)}`);
	}

	return (
		<section className="landing_hero" ref={heroRef}>
			<CodeRainCanvas />
			<div className="landing_hero_overlay" />

			<div className="landing_hero_content">
				<div className="landing_hero_top">
					<div className="landing_hero_left">
						<div className={`landing_hero_left_inner${isHeroVisible ? " is_animated" : ""}`}>
							<span className="landing_eyebrow">CodinGame Profile Card Generator</span>
							<div className="landing_logo">
								<span className="landing_logo_codin">Codin</span>
								<span className="landing_logo_card">Card</span>
							</div>
						</div>
					</div>

					<div className={`landing_hero_sep${isHeroVisible ? " is_animated" : ""}`} />

					<div className="landing_hero_right">
						<div className={`landing_hero_right_inner${cardLoaded && isHeroVisible ? " is_loaded" : ""}`}>
							<img
								className="landing_hero_card"
								src="/svg_card/?w=1000&public_handle=961697f63a0daf0d4649a6f1c368acf81098515&bg_img=true&badges=CODING_SPEED,AI,ALGORITHMS,COLLABORATION,38823044854472,1923859026951,110379867599957,1925032048027,1924670178432,1925113228778,1925254563678,1925189810047,1925134353691"
								alt="Exemple de card CodinGame"
								onLoad={() => setCardLoaded(true)}
							/>
						</div>
					</div>
				</div>

				<div className={`landing_hero_bottom${isHeroVisible ? " is_animated" : ""}`}>
					<p className="landing_tagline">
						Génère une carte SVG de ton profil CodinGame, prête à embarquer dans{" "}
						<strong>ton README GitHub</strong>, ton <strong>portfolio</strong> ou n&apos;importe
						quelle page web.
					</p>

					<div className="landing_form_wrap">
						<form className="landing_form" onSubmit={handleSubmit}>
							<label htmlFor="landing_handle_input" className="sr_only">
								URL de ton profil CodinGame
							</label>
							<input
								id="landing_handle_input"
								className="landing_input"
								type="text"
								placeholder="codingame.com/profile/<ton-id>"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								autoFocus
							/>
							<button className="landing_btn" type="submit" disabled={!isValid}>
								Générer →
							</button>
						</form>
						<span className="landing_form_hint">
							colle l&apos;URL de ton profil CodinGame — l&apos;ID se trouve dans l&apos;URL de ta
							page profil
						</span>
					</div>
				</div>
			</div>

			<div className="landing_scroll_hint">
				<div className="landing_scroll_line" />
				<span className="landing_scroll_label">scroll</span>
			</div>
		</section>
	);
}

const FEATURES = [
	{
		icon: "🏅",
		title: "Badges personnalisables",
		desc: "Sélectionne tes quêtes, langages et achievements CodinGame à afficher.",
	},
	{
		icon: "⚡",
		title: "Lien SVG permanent",
		desc: "Un seul lien, toujours à jour. Colle-le une fois, il se met à jour automatiquement.",
	},
	{
		icon: "🔗",
		title: "Embed partout",
		desc: "README GitHub, portfolio, blog — une balise <img> suffit.",
	},
];

function LandingFeatures() {
	return (
		<section className="landing_features">
			<h2 className="landing_features_title">Ce que tu obtiens</h2>
			<div className="landing_features_grid">
				{FEATURES.map((f) => (
					<div key={f.title} className="landing_feature_card">
						<span className="landing_feature_icon">{f.icon}</span>
						<span className="landing_feature_title">{f.title}</span>
						<span className="landing_feature_desc">{f.desc}</span>
					</div>
				))}
			</div>
		</section>
	);
}

const CARD_URL =
	"https://codincard.vercel.app/svg_card/?w=1000&public_handle=961697f63a0daf0d4649a6f1c368acf81098515&bg_img=true&badges=CODING_SPEED,AI,ALGORITHMS,COLLABORATION,38823044854472,1923859026951,1925032048027,110379867599957,1925113228778,1925189810047";

const MARKDOWN_SNIPPET = `![CodinGame Profile](${CARD_URL})`;

const FAKE_REPOS = [
	{
		name: "competitive-programming",
		desc: "Solutions to CodinGame, Advent of Code and competitive programming challenges.",
		lang: "Python",
		langColor: "#3572A5",
		stars: 42,
	},
	{
		name: "dotfiles",
		desc: "My personal dev environment config — zsh, nvim, tmux.",
		lang: "Shell",
		langColor: "#89e051",
		stars: 17,
	},
	{
		name: "advent-of-code",
		desc: "AoC solutions, written daily in December.",
		lang: "TypeScript",
		langColor: "#3178c6",
		stars: 9,
	},
	{
		name: "portfolio",
		desc: "Personal portfolio built with Next.js and Tailwind.",
		lang: "TypeScript",
		langColor: "#3178c6",
		stars: 5,
	},
];

function LandingGithubUsage() {
	const sectionRef = useRef<HTMLElement>(null);
	const arrowRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		const svg = arrowRef.current;
		const section = sectionRef.current;
		if (!svg || !section) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					svg.querySelectorAll("path").forEach((p) => p.classList.add("animated"));
					observer.disconnect();
				}
			},
			{ threshold: 0.3 }
		);
		observer.observe(section);
		return () => observer.disconnect();
	}, []);

	return (
		<section className="landing_github" ref={sectionRef}>
			<h2 className="landing_github__title">
				Intègre ta card dans ton profil GitHub
			</h2>

			<div className="landing_github__layout">
				{/* Left: markdown snippet */}
				<div className="landing_github__snippet">
					<div className="landing_github__snippet__bar">
						<span className="landing_github__snippet__dot" />
						<span className="landing_github__snippet__dot" />
						<span className="landing_github__snippet__dot" />
						<span className="landing_github__snippet__label">README.md</span>
					</div>
					<pre className="landing_github__snippet__body">{MARKDOWN_SNIPPET}</pre>
				</div>

				{/* Center: animated arrow */}
				<div className="landing_github__arrow">
					<svg ref={arrowRef} viewBox="0 0 120 40" aria-hidden="true">
						{/* shaft */}
						<path d="M8,20 L96,20" />
						{/* arrowhead upper */}
						<path d="M96,20 L80,8" />
						{/* arrowhead lower */}
						<path d="M96,20 L80,32" />
					</svg>
					<span className="landing_github__arrow__label">colle dans ton README</span>
				</div>

				{/* Right: GitHub profile mock */}
				<div className="landing_github__mock">
					{/* Browser chrome */}
					<div className="landing_github__mock__topbar">
						<span className="landing_github__mock__topbar__dot" />
						<span className="landing_github__mock__topbar__dot" />
						<span className="landing_github__mock__topbar__dot" />
						<span className="landing_github__mock__topbar__url">
							github.com/Elnop
						</span>
					</div>

					<div className="landing_github__mock__body">
						{/* Sidebar: avatar + user info */}
						<aside className="landing_github__mock__sidebar">
							<div className="landing_github__mock__avatar">🧑‍💻</div>
							<span className="landing_github__mock__username">Elnop</span>
							<span className="landing_github__mock__bio">
								Competitive programmer · CodinGame Legend · Open source enthusiast
							</span>
							<span className="landing_github__mock__location">📍 Paris, France</span>
							<div className="landing_github__mock__stats">
								<span className="landing_github__mock__stat">
									<strong>312</strong> followers
								</span>
								<span className="landing_github__mock__stat">·</span>
								<span className="landing_github__mock__stat">
									<strong>87</strong> following
								</span>
							</div>
						</aside>

						{/* Main: README + repos */}
						<div className="landing_github__mock__main">
							{/* README box */}
							<div className="landing_github__mock__readme">
								<div className="landing_github__mock__readme__header">
									<span className="landing_github__mock__readme__badge">
										Elnop / Elnop
									</span>
									<span>README.md</span>
								</div>
								<div className="landing_github__mock__readme__body">
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={CARD_URL}
										alt="CodinGame Profile Card"
									/>
								</div>
							</div>

							{/* Fake repos grid */}
							<div className="landing_github__mock__repos">
								{FAKE_REPOS.map((repo) => (
									<div key={repo.name} className="landing_github__mock__repo">
										<span className="landing_github__mock__repo__name">
											{repo.name}
										</span>
										<span className="landing_github__mock__repo__desc">
											{repo.desc}
										</span>
										<div className="landing_github__mock__repo__meta">
											<span className="landing_github__mock__repo__lang">
												<span
													className="landing_github__mock__repo__lang__dot"
													style={{ background: repo.langColor }}
												/>
												{repo.lang}
											</span>
											<span>⭐ {repo.stars}</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function ExampleCard({ handle, badges }: { handle: string; badges: string }) {
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);
	const src = `/svg_card/?public_handle=${handle}&badges=${badges}&w=1000&bg_img=true`;

	return (
		<div className="landing_example_item">
			<div className="landing_example_card">
				{/* skeleton — hidden once image loads */}
				{!loaded && !error && (
					<div className="landing_example_skeleton" aria-hidden="true" />
				)}
				{/* Using <img> intentionally: Next.js <Image> does not support dynamic SVG src from a route */}
				{!error && (
					<img
						className="landing_example_img"
						src={src}
						alt="Exemple de card CodinGame"
						style={{ display: loaded ? "block" : "none" }}
						onLoad={() => setLoaded(true)}
						onError={() => setError(true)}
					/>
				)}
				{error && (
					<span className="landing_example_placeholder landing_example_error">
						aperçu indisponible
					</span>
				)}
			</div>
		</div>
	);
}

function LandingExample() {
	return (
		<section className="landing_example">
			<h2 className="landing_example_title">Exemples de cards</h2>
			<div className="landing_example_grid">
				{EXAMPLE_CARDS.map((card) => (
					<ExampleCard key={card.handle} handle={card.handle} badges={card.badges} />
				))}
			</div>
			<Link className="landing_cta" href="/generator">
				Générer ma card
			</Link>
		</section>
	);
}

export default function LandingPage() {
	return (
		<div className="landing_page">
			<LandingHero />
			<LandingFeatures />
			<LandingGithubUsage />
			<LandingExample />
		</div>
	);
}
