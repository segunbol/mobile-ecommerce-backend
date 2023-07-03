
import { ObjectId } from 'mongoose'

export interface IRetributions {
    company_id:ObjectId;
    department_id: ObjectId;
    type: string;
    variation: string;
    roll_over: string;
    roll_over_day: Date | null;
    bonus: number;
    userID: ObjectId;
    createdBy: ObjectId;
    approvedBy?: ObjectId;
    deletedAt?: Date | null;
}