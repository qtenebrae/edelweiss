import { withLayout } from '@/layout/Layout';
import { TrendingMovies } from '@/page-components';
import { Card, CardBody } from '@nextui-org/react';

function Home() {
	return (
		<>
			<Card className="mx-auto mt-[40px] w-[1200px] h-[5120px] bg-background/30 backdrop-blur-[3px]">
				<CardBody>
					<TrendingMovies></TrendingMovies>
				</CardBody>
			</Card>
		</>
	);
}

export default withLayout(Home);
