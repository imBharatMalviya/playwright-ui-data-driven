import { test} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { getCsvRows } from '../utils/CsvUtil';
import { SearchTestData } from '../data/SearchTestData';



test.describe("Search tests",async ()=>{

  let testIDs:string[] = process.env.TEST_IDS
  ? process.env.TEST_IDS.split(',').map(id => id.trim())
  : []
  let csvRows = await getCsvRows<SearchTestData>('testdata.csv',testIDs);
  csvRows.forEach((row:SearchTestData) =>{
   test(`${row.testID} - ${row.title}`, async ({page})=>{
      await page.goto("");
      const homePage = new HomePage(page);
      await homePage.clickOnCategories();
      await homePage.clickOnCategory(row.category);
      await homePage.searchText(row.searchText);
      await homePage.clickOnSearchButton();
      await homePage.verifyResultHeading(row.searchText);
    }) 
  });
});