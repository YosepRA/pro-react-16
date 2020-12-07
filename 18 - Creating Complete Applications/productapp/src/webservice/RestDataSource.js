import Axios from 'axios';

export class RestDataSource {
  constructor(base_url, errorCallback) {
    this.BASE_URL = base_url;
    this.handleError = errorCallback;
  }

  GetData(callback) {
    this.SendRequest('get', this.BASE_URL, callback);
  }

  async Store(data, callback) {
    this.SendRequest('post', this.BASE_URL, callback, data);
  }

  async GetOne(id, callback) {
    this.SendRequest('get', `${this.BASE_URL}/${id}`, callback);
  }

  async Update(data, callback) {
    this.SendRequest('put', `${this.BASE_URL}/${data.id}`, callback, data);
  }

  async Delete(data, callback) {
    this.SendRequest('delete', `${this.BASE_URL}/${data.id}`, callback);
  }

  async SendRequest(method, url, callback, data) {
    try {
      let response = await Axios.request({ method, url, data });
      callback(response.data);
    } catch (err) {
      this.handleError('Operation Failed: Network Error');
    }
  }
}
