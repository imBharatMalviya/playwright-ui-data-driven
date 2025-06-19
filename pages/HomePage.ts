import {expect, Locator, Page} from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly searchBar: Locator;
    readonly searchButton: Locator;
    readonly category: Locator;
    readonly categoryLink: Locator;
    constructor(page: Page){
        this.page = page;
        this.searchBar = page.getByRole('textbox',{name:"Search"});
        this.searchButton = page.getByRole('button',{name:"Search"});
        this.category = page.getByRole("button",{name:"All Categories"})
        this.categoryLink = page.getByText("All Categories Desktops");
    }

    async searchText(searchText: string){
        await this.searchBar.fill(searchText);
    }

    async clickOnCategories(){
        await this.category.click();
    }

    async clickOnCategory(categoryName:string){
        await this.categoryLink.getByRole('link', { name: categoryName, exact: true }).click();
    }

    async clickOnSearchButton(){
        await this.searchButton.click();
    }

    async verifyResultHeading(searchText: string){
        expect(this.page.getByRole('link',{name:searchText}).first()).toBeTruthy();
    }
}
