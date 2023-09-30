import axios from '@/app/utils/helpers/axios';

export const getStocks = async stock_id => {
	const response = await axios.get(`/api/stocks/${stock_id ?? ''}`);
	return response.data;
};
