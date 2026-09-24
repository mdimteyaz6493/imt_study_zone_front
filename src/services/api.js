const API_URL = "https://imt-study-zone.onrender.com/api";

export const getSubjects = async () => {
  const response = await fetch(`${API_URL}/subjects`);

  if (!response.ok) {
    throw new Error("Failed to fetch subjects");
  }

  return response.json();
};

export const getQuestions = async (slug) => {
  const response = await fetch(`${API_URL}/questions/${slug}`);

  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }

  return response.json();
};

export const checkAnswer = async (questionId, answer) => {
  const response = await fetch(`${API_URL}/questions/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      questionId,
      answer,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to check answer");
  }

  return response.json();
};

export const getPracticalQuestions = async (slug) => {
  const response = await fetch(`${API_URL}/practical/${slug}`);

  if (!response.ok) {
    throw new Error("Failed to fetch practical questions");
  }

  return response.json();
};

export const checkPracticalAnswer = async (questionId, answer) => {
  const response = await fetch(`${API_URL}/practical/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      questionId,
      answer,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to check practical answer");
  }

  return response.json();
};

/* =========================================================
   NOTES API
========================================================= */

export const getNoteSubjects = async () => {
  const response = await fetch(`${API_URL}/notes`);

  if (!response.ok) {
    throw new Error("Failed to fetch note subjects");
  }

  return response.json();
};

export const getNotesBySubject = async (subjectSlug) => {
  const response = await fetch(
    `${API_URL}/notes/${subjectSlug}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch subject notes");
  }

  return response.json();
};

export const getNoteByTopic = async (
  subjectSlug,
  topicSlug
) => {
  const response = await fetch(
    `${API_URL}/notes/${subjectSlug}/${topicSlug}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch note topic");
  }

  return response.json();
};