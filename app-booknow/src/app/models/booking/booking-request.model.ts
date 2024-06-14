export interface BookingRequest {
  accommodationId?: number;
  startDate: string; // Formato: yyyy-MM-dd
  endDate: string; // Formato: yyyy-MM-dd
  numGuests: number;
}
