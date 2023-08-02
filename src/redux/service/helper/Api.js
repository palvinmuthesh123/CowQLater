import { BASE_URL } from '../../../utils/filehandler';
import NetworkUtils from './NetworkUtils';

const Api = new NetworkUtils({
  baseUrl: BASE_URL,
  // baseUrl: PRODUCTION_URL,
});

export default Api;
