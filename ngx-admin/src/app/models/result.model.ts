import { Candidate } from "./candidate.model";
import { Table } from "./table.model";

export class Result {
    _id?: string;
    votos?: number;
    table?: Table;
    candidate?: Candidate;
}
