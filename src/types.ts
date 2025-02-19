export interface Task {
    id: number;
    title: string;
    description: string;
    lifetime: number; 
  }
  
  export interface TaskWithTimer extends Task {
    timeRemaining: number; 
  }