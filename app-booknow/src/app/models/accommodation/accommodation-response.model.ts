export interface AccommodationResponse {
  id: number;
  title: string;
  location: string;
  price: number;
  maxGuests: number;
  amenities: string;
  imageUrl?: string;
}
