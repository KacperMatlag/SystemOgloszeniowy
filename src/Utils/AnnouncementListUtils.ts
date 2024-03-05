import axios from "axios";
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

export const selectsDataValues = async (queryParams: any) => {
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
      axios.get<CategoryWithPositions[]>("http://localhost:2137/cwp"),
      axios.get<Company[]>("http://localhost:2137/company"),
      axios.get<WorkCategory[]>("http://localhost:2137/workcategory"),
      axios.get<Annoucement[]>(
        `http://localhost:2137/announcement/filter?${queryParams ?? ""}`
      ),
      axios.get<JobLevel[]>("http://localhost:2137/joblevel"),
      axios.get<TypeOfContract[]>("http://localhost:2137/typeofcontract"),
      axios.get<WorkingTime[]>("http://localhost:2137/workingtime"),
      axios.get<WorkType[]>("http://localhost:2137/workType"),
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
