import * as ActionTypes from '../action/action_type';

let intialState = {
  type: null,
  isLanguageChangeEnglish: false,
  isLogin: false,
  isAddFarm: false,
  isAddPaddock: false,
  isAddRainfall: false,
  isAddTally: false,
  isAddAnimal: false,
  userData: [],
};

export default function base(state = intialState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_PENDING: {
      return {
        ...state,
        type: action.type,
        isLogin: true
      };
    }
    case ActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        type: action.type,
        userData: action.payload,
        isLogin: false
      };
    }

    case ActionTypes.LOGIN_FAIL: {
      return {
        ...state,
        type: action.type,
        userData: [],
        isLogin: false
      };
    }

    case ActionTypes.ADD_FARM_PENDING: {
      return {
        ...state,
        type: action.type,
        isAddFarm: true
      };
    }
    case ActionTypes.ADD_FARM_SUCCESS: {
      return {
        ...state,
        type: action.type,
        addFarmData: action.payload,
        isAddFarm: false
      };
    }

    case ActionTypes.ADD_FARM_FAIL: {
      return {
        ...state,
        type: action.type,
        addFarmData: [],
        isAddFarm: false
      };
    }

    case ActionTypes.ADD_PADDOCK_PENDING: {
      return {
        ...state,
        type: action.type,
        isAddPaddock: true
      };
    }
    case ActionTypes.ADD_PADDOCK_SUCCESS: {
      return {
        ...state,
        type: action.type,
        addPaddockData: action.payload,
        isAddPaddock: false
      };
    }

    case ActionTypes.ADD_PADDOCK_FAIL: {
      return {
        ...state,
        type: action.type,
        addPaddockData: [],
        isAddPaddock: false
      };
    }

    case ActionTypes.ADD_RAINFALL_PENDING: {
      return {
        ...state,
        type: action.type,
        isAddRainfall: true
      };
    }
    case ActionTypes.ADD_RAINFALL_SUCCESS: {
      return {
        ...state,
        type: action.type,
        addRainfallData: action.payload,
        isAddRainfall: false
      };
    }

    case ActionTypes.ADD_RAINFALL_FAIL: {
      return {
        ...state,
        type: action.type,
        addTallyData: [],
        isAddTally: false
      };
    }

    case ActionTypes.ADD_TALLY_PENDING: {
      return {
        ...state,
        type: action.type,
        isAddTally: true
      };
    }
    case ActionTypes.ADD_TALLY_SUCCESS: {
      return {
        ...state,
        type: action.type,
        addTallyData: action.payload,
        isAddTally: false
      };
    }

    case ActionTypes.ADD_TALLY_FAIL: {
      return {
        ...state,
        type: action.type,
        addTallyData: [],
        isAddTally: false
      };
    }

    case ActionTypes.ADD_ANIMAL_PENDING: {
      return {
        ...state,
        type: action.type,
        isAddAnimal: true
      };
    }
    case ActionTypes.ADD_ANIMAL_SUCCESS: {
      return {
        ...state,
        type: action.type,
        addAnimalData: action.payload,
        isAddAnimal: false
      };
    }

    case ActionTypes.ADD_ANIMAL_FAIL: {
      return {
        ...state,
        type: action.type,
        addAnimalData: [],
        isAddAnimal: false
      };
    }

    case ActionTypes.CLEAR_AUTH_REDUCER_SUCCESS: {
      let data = action.payload;
      let stateData = {
        ...state,
      };
      Object.assign(stateData, data);
      console.log('Data', stateData);
      return stateData;
    }

    default:
      return state;
  }
}
