export interface HomeworkInterface {
  homework_id?: number;
  homework_title: string;
  homework_description: string;
  homework_done: number;
  homework_start_date: Date|string;
  homework_end_date: string;
  school_subject: string;
}
