import axios from '@/app/utils/helpers/axios';

export const getProfile = async () => {
	const response = await axios.get(`/api/profile`);
	return response.data;
};
