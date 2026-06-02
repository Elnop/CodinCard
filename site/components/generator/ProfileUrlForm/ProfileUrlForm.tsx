import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./ProfileUrlForm.css";
import { CodingamerDataContext } from "@/context_providers/CodingamerData";

const profile_base_url = "https://www.codingame.com/profile/";

export function ProfileUrlForm() {
	const { watch, register } = useForm();
	const { codingamer, setCodingamer } = useContext(CodingamerDataContext);
	const input = watch<string>("profile-url", "") as string;

	useEffect(() => {
		let tmp = input;
		if (!tmp.length) return;
		if (!tmp.startsWith(profile_base_url)) tmp = profile_base_url + tmp;
		void setCodingamer(tmp);
	}, [input]);

	return (
		<form
			className="profile-url-form"
			onSubmit={(e) => {
				e.preventDefault();
			}}
		>
			<label htmlFor="profile-url">Profil URL</label>
			<input
				id="profile-url"
				aria-label="URL du profil CodinGame"
				placeholder="codingame.com/profile/<ton-id>"
				defaultValue={
					codingamer?.public_handle ? profile_base_url + codingamer.public_handle : undefined
				}
				{...register("profile-url")}
			/>
		</form>
	);
}
