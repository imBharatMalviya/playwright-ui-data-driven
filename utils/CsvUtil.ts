import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { CsvRow } from '../data/CsvRow';

export async function getCsvRows<T extends CsvRow>(fileName: string,testIDs:string[]): Promise<T[]> {
  const csvPath = path.resolve('data',fileName);
  const defaultPath = path.resolve('data','default.json');

  // Read CSV and Default JSON
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const defaults: Partial<T> = JSON.parse(fs.readFileSync(defaultPath, 'utf-8'));

  // Parse CSV to objects
  const records: T[] = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  });
  const filteredRows = testIDs.length===0 ? records : records.filter(row => testIDs.includes(row.testID));
  // Fill missing values from default.json
  const filledRecords = filteredRows.map((record) => {
    const filledRecord: any = { ...record };
    for (const key in defaults) {
      if (!filledRecord[key] || filledRecord[key].trim() === '') {
        filledRecord[key] = (defaults as any)[key];
      }
    }
    return filledRecord as T;
  });

  return filledRecords;
}
