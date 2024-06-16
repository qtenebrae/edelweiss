import { withLayout } from '@/layout/Layout';
import { Main } from '@/page-components';
import { Card, CardBody } from '@nextui-org/react';

function Home() {
	return (
		<>
			<Card className="mx-auto px-[10px] pb-[10px] mt-[40px] mb-[30px] w-[1200px] bg-background/30 backdrop-blur-[3px]">
				<CardBody>
					<Main></Main>
				</CardBody>
			</Card>
		</>
	);
}

export default withLayout(Home);
