import { AccommodationResponse } from "../accommodation/accommodation-response.model";
import { UserResponse } from "../user/user-response.model";

export interface BookingResponse {
  id?: number;
  accommodation: AccommodationResponse;
  user: UserResponse;
  startDate: string; // Formato: yyyy-MM-dd
  endDate: string; // Formato: yyyy-MM-dd
  numGuests: number;
  createdAt: string;
  updatedAt: string;
}
