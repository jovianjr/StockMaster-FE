'use client';

import Profile from '@/app/_profile';
import SwiperPattern from '@/app/_pattern';
import Navbar from '@/app/components/Navbar';

const Home = () => {
	return (
		<>
			<Navbar />
			<div className="sticky top-24 hidden w-full lg:block ">
				<SwiperPattern className="!h-full !px-20" />
			</div>
			<Profile className="lg:hidden" />
		</>
	);
};

export default Home;
