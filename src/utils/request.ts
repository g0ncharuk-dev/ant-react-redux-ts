import axios from 'axios';
import auth from '@app/utils/localStorage';

const request = {
    post(url: string, data: {} = { token: auth.getToken() }) {
        return axios.post(url, data)
    }
};

export default request;