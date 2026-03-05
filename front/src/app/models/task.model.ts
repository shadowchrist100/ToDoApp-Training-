import { categorie } from "./categorie.model";
import { priorite } from "./priorite.model";

export interface Itask{
    id: number,
    title: string,
    description: string,
    categorie: categorie,
    priorite: priorite,
    echeance: Date,
    completed: boolean
}