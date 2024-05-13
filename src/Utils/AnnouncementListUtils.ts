import ApiManager from "../ApiMenager/ApiManager";

export const selectsDataValues = async (
  api: ApiManager,
  queryParams: string | null
) => {
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

export const createPaginationButtons = (
  lastPage: number,
  currentPage: number
) => {
  const startPage = Math.max(1, currentPage - 3);
  const endPage = Math.min(startPage + 6, lastPage);
  const visiblePages: string[] = [];
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i.toString());
  }
  if (startPage > 1) {
    visiblePages.unshift("...");
  }
  if (endPage < lastPage) {
    visiblePages.push("...");
  }
  if (!visiblePages.includes(lastPage.toString())) {
    visiblePages.push(lastPage.toString());
  }
  return visiblePages;
};
