import Profile from '@/app/_profile';
import SwiperPattern from '@/app/_pattern';

const Home = () => {
	return (
		<>
			<div className="sticky top-24 hidden w-full lg:block">
				<div className="w-full">
					<SwiperPattern className="!px-20" />
				</div>
			</div>
			<Profile className="lg:hidden" />
		</>
	);
};

export default Home;
