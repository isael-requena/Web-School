export interface HomeworkInterface {
/*   homework_id?: number;
  homework_title: string;
  homework_description: string;
  homework_done: number;
  homework_start_date: Date|string;
  homework_end_date: Date|string;
  school_subject: string; */
	id?: number;
  user_id?: number | undefined | null;
  school_subject: string;
  title: string;
  description: string;
  status: string;
  start_date: Date | string;
  end_date: Date | string;
}
