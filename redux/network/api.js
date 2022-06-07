import reactotron from 'reactotron-react-native';

export const URL = 'http://www.omdbapi.com/?s=star&apikey=5a870659';

const request = async (method, endpoin) => {
  const url = `${URL}`;

  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(res => {
      if (res != null) {
        return {
          networkSuccess: true,
          data: res,
        };
      } else {
        return {
          networkSuccess: false,
        };
      }
    })
    .catch(e => ({networkSuccess: false}));
};

export {request};
