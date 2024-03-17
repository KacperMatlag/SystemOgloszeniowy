import ApiManager from "../ApiMenager/ApiManager";

export const selectsDataValues = async (api: ApiManager) => {
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
      jobbSpotlight,
      count,
    ] = await Promise.all([
      api.get("cwp"),
      api.get("company"),
      api.get("workcategory"),
      api.get("announcement/latest"),
      api.get("joblevel"),
      api.get("typeofcontract"),
      api.get("workingtime"),
      api.get("worktype"),
      api.get("announcement/random"),
      api.get("announcement/getcount"),
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
      jobbSpotlight: jobbSpotlight.data,
      count: count.data,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
