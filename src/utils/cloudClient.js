const BASE_URL = '/nextcloud/remote.php/dav/files/proxima-cloud/ProximaCloudContent/';
const APP_PASSWORD = import.meta.env.VITE_APP_PASSWORD;
const USERNAME = 'proxima-cloud';

/**
 * Fetches a file from Nextcloud WebDAV (inside ProximaCloudContent/)
 * @param {string} endpoint - path relative to ProximaCloudContent/, e.g. "Projects/index.json"
 * @param {Object} [options] - optional fetch options
 * @returns {Promise<any>} Parsed JSON if available, else text
 */
export async function fetchFromCloud(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const authHeader = 'Basic ' + btoa(`${USERNAME}:${APP_PASSWORD}`);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': authHeader,
      'OCS-APIRequest': 'true',
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
}
