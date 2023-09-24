import axios from '@/app/utils/helpers/axios';

export const getPatterns = async () => {
	const response = await axios.get('/api/stock-patterns');
	return response.data;
};
