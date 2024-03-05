import ApiManager from "../ApiMenager/ApiManager";
import {
  Annoucement,
  CategoryWithPositions,
  Company,
  JobLevel,
  TypeOfContract,
  WorkCategory,
  WorkType,
  WorkingTime,
} from "../Models";
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
      api.getData<CategoryWithPositions[]>("cwp"),
      api.getData<Company[]>("company"),
      api.getData<WorkCategory[]>("workcategory"),
      api.getData<Annoucement[]>("announcement/latest"),
      api.getData<JobLevel[]>("joblevel"),
      api.getData<TypeOfContract[]>("typeofcontract"),
      api.getData<WorkingTime[]>("workingtime"),
      api.getData<WorkType[]>("worktype"),
      api.getData<Annoucement>("announcement/random"),
      api.getData<number>("announcement/getcount"),
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
