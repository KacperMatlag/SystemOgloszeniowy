import Annoucement from "./Announcement";

export default interface AnnouncementFilterResponse {
  page: number;
  lastPage: number;
  data: Annoucement[] | [];
}
