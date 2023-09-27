import axios from '@/app/utils/helpers/axios';

export const getPatterns = async params => {
	const response = await axios.get(`/api/stock-patterns/${params ?? ''}`);
	return response.data;
};
