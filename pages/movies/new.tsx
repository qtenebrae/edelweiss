import { withLayout } from '@/layout/Layout';
import { MovieNew } from '@/page-components';
import { Card, CardBody } from '@nextui-org/react';

function MoviePage() {
	return (
		<Card className="mx-auto px-[10px] pb-[10px] mt-[40px] w-[1200px] bg-background/30 backdrop-blur-[3px]">
			<CardBody>
				<MovieNew></MovieNew>
			</CardBody>
		</Card>
	);
}

export default withLayout(MoviePage);
