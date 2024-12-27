// Định nghĩa các interface ở đây
export type BookingCourseType = {
  id: string;
  name: string;
  // ... các thuộc tính khác ...
};

export type CancelCourseType = {
  id: string;
  name: string;
  // ... các thuộc tính khác ...
};

export interface BookingCourseState {
  bookingCourse: BookingCourseType | null;
  cancelCourse: CancelCourseType | null;
  isLoading: boolean;
  error: string | null;
} 