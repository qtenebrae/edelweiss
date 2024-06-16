export interface IProfile {
	firstname: string;
	lastname: string;
	middlename?: string;
	sex?: string;
	birthday?: Date;
}

export interface ISettings {
	language?: string;
	notifications?: boolean;
}

export interface IUser {
	id: string;
	email: string;
	login: string;
	profile: IProfile;
	settings: ISettings;
}
