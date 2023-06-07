export interface UserInterface {
  id?: number;
  username: string;
  email: string;
  password: string;
  role: number;
  create_time: Date | string;
  school_year: string | null;
  section: string | null;
}
