import axios from '@/app/utils/helpers/axios';

export const getLeaderBoards = async timeframe => {
	const response = await axios.get(`/api/leaderboards?timeFrame=${timeframe ?? 'daily'}`);
	return response.data;
};
