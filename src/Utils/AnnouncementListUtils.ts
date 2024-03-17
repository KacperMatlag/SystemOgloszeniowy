import ApiManager from "../ApiMenager/ApiManager";

export const selectsDataValues = async (api: ApiManager, queryParams: any) => {
  try {
    const [
      jobPositions,
      companies,
      categories,
      announcements,
      jobLevel,
      typeOfContract,
      workingTime,
      workType,
    ] = await Promise.all([
      api.get("cwp"),
      api.get("company"),
      api.get("workcategory"),
      api.get(`announcement/filter?${queryParams ?? ""}`),
      api.get("joblevel"),
      api.get("typeofcontract"),
      api.get("workingtime"),
      api.get("workType"),
    ]);

    return {
      jobPositions: jobPositions.data,
      companies: companies.data,
      categories: categories.data,
      announcements: announcements.data,
      jobLevel: jobLevel.data,
      typeOfContract: typeOfContract.data,
      workingTime: workingTime.data,
      workType: workType.data,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
