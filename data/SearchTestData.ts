import { CsvRow } from "./CsvRow";

export interface SearchTestData extends CsvRow{
    category:string,
    searchText:string
}