import fetchApi from "../utils/fetch-api";

const common = {
  async getRef() {
    try {
      const response = await fetchApi.getData();
      return await response.json();
    } catch (error) {
      console.log(`services.common.getRef.ERROR: ${error}`)
    }
  }
}

export default common
