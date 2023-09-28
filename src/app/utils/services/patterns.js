import axios from '@/app/utils/helpers/axios';

export const getPatterns = async pattern_id => {
	const response = await axios.get(`/api/stock-patterns/${pattern_id ?? ''}`);
	return response.data;
};

export const createAttempt = async pattern_id => {
	const response = await axios.post(`/api/stock-patterns/${pattern_id}/attempts`);
	return response.data;
};

export const getLastAttempt = async pattern_id => {
	const response = await axios.get(`/api/stock-patterns/${pattern_id}/attempts/last`);
	return response.data;
};

export const postAnswerQuestion = async params => {
	const response = await axios.post(
		`/api/stock-patterns/${params.pattern_id}/attempts/${params.attempt_id}/questions/${params.question_id}`,
		{
			answer: params.answer,
			timeSeconds: params.timeSeconds
		}
	);
	return response.data;
};

export const postEndAttempt = async params => {
	const response = await axios.post(
		`/api/stock-patterns/${params.pattern_id}/attempts/${params.attempt_id}/end`
	);
	return response.data;
};
