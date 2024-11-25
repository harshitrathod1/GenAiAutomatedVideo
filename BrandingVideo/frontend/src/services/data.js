class DataService {
  constructor(companyId = '') {
    this.companyId = companyId;
  }

  static data = {};

  static getCompanyData(id) {
    return DataService.data[id];
  }

  static clearCompanyData(id) {
    delete DataService.data[id];
  }

  // Method to fetch data from the API and update cache
  async fetchData() {
    try {
      console.log('Fetching new data from API');
      const [
        companyData,
        competitorData,
        ratingsData,
        popularProfilesData,
        benefitsData,
      ] = await Promise.all([
        fetch(
          `https://www.ambitionbox.com/company-services/v0/company/${this.companyId}/details`,
          {
            headers: { appId: '123', systemId: '123' },
          }
        ).then((res) => res.text()),
        fetch(
          `https://employer.ambitionbox.com/employer-branding-services/v0/company/${this.companyId}/competitor-details/enhanced?limit=9`,
          {
            headers: {
              appId: '123',
              systemId: '123',
            },
          }
        ).then((res) => res.text()),
        fetch(
          `https://www.ambitionbox.com/review-services/v0/review/rating-distribution/${this.companyId}`,
          {
            headers: {
              appId: 931,
              systemId: 'ambitionbox-review-services',
            },
          }
        ).then((res) => res.text()),
        fetch(
          `https://www.ambitionbox.com/salaries-services/v0/profile/top-paid-profiles/${this.companyId}`,
          {
            headers: { appId: 927, systemId: 'companyReviews' },
          }
        ).then((res) => res.text()),
        fetch(
          `https://www.ambitionbox.com/benefits-services/v0/company/${this.companyId}/benefits-stats`,
          { headers: { appId: 927, systemId: 'companyReviews' } }
        ).then((res) => res.text()),
      ]);

      DataService.data[this.companyId] = {
        companyData: JSON.parse(companyData),
        competitorData: JSON.parse(competitorData)?.data,
        ratingsData: JSON.parse(ratingsData)?.data,
        popularProfilesData: JSON.parse(popularProfilesData)?.data,
        benefitsData: JSON.parse(benefitsData)?.data,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default DataService;
