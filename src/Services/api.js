const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

const getApi = async () => {
  const resposta = await fetch(ENDPOINT);
  const data = await resposta.json(); // formato json
  return data;
};

export default getApi;
