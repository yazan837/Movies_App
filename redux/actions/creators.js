import camelCase from 'lodash/camelCase';

export const createAction = (type, ...props) => {
  const actionCreatorName = camelCase(type);

  const actionCreator = (data = {}) => {
    const action = {type};
    props.forEach(property => {
      if (data.hasOwnProperty(property)) {
        action[property] = data[property];
      } else {
        action[property] = null;
      }
    });
    return action;
  };

  return {[type]: type, [actionCreatorName]: actionCreator};
};
