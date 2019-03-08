export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  isFavorite: true;
  info: {
    id: number;
    company: string;
    avatar: string;
    address: string;
    phone: string;
    comments: string;
  };
}
