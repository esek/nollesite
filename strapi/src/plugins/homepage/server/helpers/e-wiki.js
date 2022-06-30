const axios = require('axios');
const setCookieParser = require('set-cookie-parser');

/**
 * Service to talk to E-Wiki
 * Requires the WIKI-configuration variables in `/src/config.ts`
 * to be set or it will always return 0
 */
class EWiki {
  #axios;
  #isAuthenticated;
  #cookies;
  #username;
  #password;

  constructor(url, username, password) {
    // Create axios instance
    this.#axios = axios.create({
      baseURL: url,
      withCredentials: true,
    });

    this.#username = username;
    this.#password = password;
    this.#cookies = [];
  }

  /**
   * Converts the cookie array to a string of wiki cookies
   */
  get #cookie() {
    return this.#cookies
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join('; ');
  }

  /**
   * Logs in the user with the provided env-variables
   * @param token A token needed to login
   * @returns A promise that resolves when the login is complete
   */
  async #login(token) {
    const params = new URLSearchParams({
      action: 'login',
      lgname: this.#username,
      lgpassword: this.#password,
    });

    if (token) {
      params.append('lgtoken', token);
    }

    try {
      const { data, headers } = await this.#request(params, 'post');

      const newCookies = setCookieParser.parse(headers['set-cookie']);
      this.#cookies = [...this.#cookies, ...newCookies];

      // If token is needed, just rerun the function with the token
      if (data.login.result === 'NeedToken') {
        return this.#login(data.login.token);
      }

      // Something else went wrong
      if (data.login.result !== 'Success') {
        return false;
      }

      this.#isAuthenticated = true;
      return true;
    } catch (err) {
      this.#isAuthenticated = false;
      return false;
    }
  }

  /**
   * Fetches the edit count of a single user
   * If the user is not authenticated, it will try to login
   * If the request still fails, it will retry once before returning 0
   * @param {string} username The username of the user to fetch the edit count for
   * @param {boolean} retrying Whether this is a retry or not
   */
  async getPageData(pageTitle, retrying = false) {
    if (!this.#isAuthenticated) {
      await this.#login();
    }

    const params = new URLSearchParams({
      action: 'parse',
      page: pageTitle,
      prop: 'text',
      disabletoc: true,
    });

    try {
      const { data } = await this.#request(params, 'get');

      // Unauthorized, we need to reauthenticate
      if (data.error?.code === 'readapidenied' && !retrying) {
        this.#isAuthenticated = false;
        return this.getPageData(pageTitle, true);
      }

      return data.parse?.text?.['*'] ?? null;
    } catch (err) {
      return null;
    }
  }
  /**
   * Helper method to make requests to the Wiki-API.
   * @param params The query parameters to send, (will always include format=json)
   * @param method The HTTP method to use, defaults to `GET`
   * @returns An axios response containing data of type `<T>` and the response headers
   */
  async #request(params, method) {
    params.append('format', 'json');

    const headers = {
      cookie: this.#cookie,
    };

    return this.#axios
      .request({ url: this.#url(params), method, headers })
      .then((res) => ({ data: res.data, headers: res.headers }));
  }

  /**
   * Helper method to convert the query parameters to a url
   * @param params Search parameters to add to the url
   * @returns The url with the query parameters
   */
  #url(params) {
    params.append('format', 'json');
    return `/api.php?${params.toString()}`;
  }
}

module.exports = EWiki;
