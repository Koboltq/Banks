import { Rate } from "./rate";

export class Currency {
    table!: string;
    no!: string;
    effectiveDate!: Date;
    rates!: Rate[];
}