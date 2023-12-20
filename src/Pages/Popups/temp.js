import axios from 'axios';

export const fetchQuizData = async () => {
  try {
    const response = await axios.get('./quiz.json');
    const quizData = response.data.data;

    // 라벨링만 남기고 나머지 데이터 삭제
    const labeledData = quizData.map(({ quizId, question, correctAnswer }) => ({
      quizId,
      question,
      correctAnswer
    }));

    return labeledData;
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    return []; // 혹은 에러 처리에 맞게 빈 배열 또는 다른 기본값 반환
  }
};