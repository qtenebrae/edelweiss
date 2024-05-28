import { GATEWAY_HOST } from '@/constants';
import { IMovie } from '@/interfaces';
import { withLayout } from '@/layout/Layout';
import { Movie } from '@/page-components';
import { Card, CardBody } from '@nextui-org/react';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

function MoviePage({ movie }: MoviePageProps) {
	return (
		<Card className="mx-auto px-[10px] pb-[10px] mt-[40px] w-[1200px] bg-background/30 backdrop-blur-[3px]">
			<CardBody>
				<Movie movie={movie}></Movie>
			</CardBody>
		</Card>
	);
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
