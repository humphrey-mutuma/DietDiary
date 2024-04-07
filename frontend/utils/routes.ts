const APIS_BASE_URL = process.env.NEXT_PUBLIC_APIS_BASE_URL;

export const USER_ROUTES = {
  GET_USERS: `${APIS_BASE_URL}/users`,
  GET_USER: `${APIS_BASE_URL}/users`,
  CREATE_USER: `${APIS_BASE_URL}/users`,
  UPDATE_USER: `${APIS_BASE_URL}/users`,
  DELETE_USER: `${APIS_BASE_URL}/users`,
  GET_USER_ANALYTICS: `${APIS_BASE_URL}/users/analytics`,
};
export const MEAL_ROUTES = {
  GET_MEALS: "/meals",
  GET_MEAL: "/meals",
  UPDATE_MEAL: "/meals",
  DELETE_MEAL: "/meals",
  MEALS_AUTO_SUGGESTIONS: "/meals/ai/suggestions",
};
// others ...
