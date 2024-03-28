
export const IP_ADDRESS = '192.168.1.19';

// api users

export const API_LOGIN= `http://${IP_ADDRESS}:6002/api/login`;

export const API_CHANGE_PASSWORD= `http://${IP_ADDRESS}:6002/api/change-password`;

export const API_CHANGE_EMAIL= `http://${IP_ADDRESS}:6002/api/change-email`;

export const API_VERIFY_PASSWORD= `http://${IP_ADDRESS}:6002/api/veryfy-password`;


// api test
export const API_LIST_QUIZZ= `http://${IP_ADDRESS}:6002/api/quizz/testsByName`;

export const API_QUIZZ_DETAIL= `http://${IP_ADDRESS}:6002/api/quizz/test`;

export const API_TAKE_QUIZZ= `http://${IP_ADDRESS}:6002/api/quizz/takeTest`;

export const API_GET_COIN = `http://${IP_ADDRESS}:6002/api/score/`;

export const API_HISTORY_TAKE_QUIZ_BY_UID= `http://${IP_ADDRESS}:6002/api/quizz/sessions/user`;


// API SCORE

export const API_TOTAL_COIN_BY_UID= `http://${IP_ADDRESS}:6002/api/score`;


// API RANK
export const API_RANK_LIST= `http://${IP_ADDRESS}:6002/api/rank/weekly`;

// api capcha
export const API_CREATE_CAPCHA= `http://${IP_ADDRESS}:6002/api/capcha/create`;
export const API_GET_CAPCHA= `http://${IP_ADDRESS}:6002/api/capcha/get`;
export const API_VALIDATE_CAPCHA= `http://${IP_ADDRESS}:6002/api/capcha/validate`;

//api update sol address user
export const API_UPDATE_SOL_ADDRESS= `http://${IP_ADDRESS}:6002/api/update-soladdress`;
export const API_UPDATE_SOL_ADDRESS_USER= `http://${IP_ADDRESS}:6002/api/update-solana-address`;


