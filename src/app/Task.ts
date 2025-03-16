export interface Task {
    id?: number;
    text: string;
    day: string;
    priority: string;
    done: boolean;
    dateAdded: Date;
}