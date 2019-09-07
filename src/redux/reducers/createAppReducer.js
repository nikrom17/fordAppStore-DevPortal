import * as actionTypes from 'redux/actions/actionTypes';
import { updateObject } from 'utils/utility';

const initialState = {
  loading: false,
  newApp: false,
  appSourceFile: {
    value: '',
    fileObject: null,
  },
  appBannerFile: {
    value: '',
    fileObject: null,
  },
  appIconFile: {
    value: '',
    fileObject: null,
  },
  title: '',
  description: '',
  category: 'Auto & Vehicles',
  fileObjects: [],
};

const createAppStart = (state) => updateObject(state, {
  loading: true,
});

const resetNewApp = (state) => updateObject(state, {
  newApp: false,
});

const createAppSuccess = (state) => updateObject(state, {
  ...initialState,
  newApp: true,
});

const createAppFailed = (state) => updateObject(state, {
  loading: false,
});

const setFileObject = (state, action) => {
  const oldFileObjectArray = state.fileObjects;
  oldFileObjectArray.push(action.value);
  return updateObject(state, {
    fileObjects: oldFileObjectArray,
  });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_APP_START:
      return createAppStart(state);
    case actionTypes.CREATE_APP_SUCCESS:
      return createAppSuccess(state);
    case actionTypes.CREATE_APP_FAILED:
      return createAppFailed(state);
    case actionTypes.SET_FILE_OBJECT:
      return setFileObject(state, action);
    case actionTypes.RESET_NEW_APP:
      return resetNewApp(state);
    default:
      return state;
  }
};

export default reducer;
