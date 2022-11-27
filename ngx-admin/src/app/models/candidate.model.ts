import { Party } from "./party.model";

export class Candidate {
    _id?: string;
    apellido?: string;
    cedula?: string;
    nombre?: string;
    party?: Party;
}
