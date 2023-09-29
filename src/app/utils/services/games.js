import axios from '@/app/utils/helpers/axios';

export const getLeaderBoards = async timeframe => {
	const response = await axios.get(`/api/leaderboards?timeFrame=${timeframe ?? 'daily'}`);
	return response.data;
};

export const getlastGame = async () => {
	const response = await axios.get(`/api/games/last`);
	return response.data;
};

export const postCreateAttempt = async game_id => {
	const response = await axios.post(`/api/games/${game_id}/attempts`);
	return response.data;
};

export const getGame = async game_id => {
	const response = await axios.get(`/api/games/${game_id}`);
	return response.data;
};

export const postAnswerQuestion = async params => {
	const response = await axios.post(
		`/api/games/${params.game_id}/attempts/${params.attempt_id}/questions/${params.question_id}`,
		{
			answer: params.answer,
			timeSeconds: params.timeSeconds
		}
	);
	return response.data;
};

export const postEndAttempt = async params => {
	const response = await axios.post(
		`/api/games/${params.game_id}/attempts/${params.attempt_id}/end`
	);
	return response.data;
};
