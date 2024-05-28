import { GATEWAY_HOST } from '@/constants';
import { IMovie } from '@/interfaces';
import { withLayout } from '@/layout/Layout';
import { MovieComponent } from '@/page-components';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

function MoviePage({ movie }: MoviePageProps) {
	return <MovieComponent movie={movie}></MovieComponent>;
}

export default withLayout(MoviePage);

export async function getServerSideProps<Movie>({
	params,
}: GetServerSidePropsContext<ParsedUrlQuery>) {
	if (!params) {
		return {
			notFound: true,
		};
	}

	try {
		const { data: movie } = await axios.get<Movie>(
			`http://${GATEWAY_HOST}/catalog/movie/findById/${params.id}`,
		);

		return {
			props: {
				movie,
			},
		};
	} catch {
		return {
			notFound: true,
		};
	}
}

export interface MoviePageProps extends Record<string, unknown> {
	movie: IMovie;
}
