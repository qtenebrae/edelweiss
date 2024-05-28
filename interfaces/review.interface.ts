export interface IReview {
	id: number;
	movieId: number;
	header: string;
	text: string;
	score: number;
	publicationDate: Date;
	authotId: number;
}
