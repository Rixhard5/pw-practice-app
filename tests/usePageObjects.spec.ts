import { expect, test } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({page}) => {
    await page.goto('/');
});

test('navigate to form page @smoke @regression', async ({page}) => {
    const pm = new PageManager(page);
    await pm.navigateTo().formLayoutsPage();
    await pm.navigateTo().datepickerPage();
    await pm.navigateTo().smartTablePage();
    await pm.navigateTo().toastrPage();
    await pm.navigateTo().tooltipPage();
});

test('parametrized methods @smoke', async ({page}) => {
    const pm = new PageManager(page);
    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.toLowerCase()}${faker.number.int(1000)}@test.com`.replace(' ', '');

    await pm.navigateTo().formLayoutsPage();

    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2');
    await page.screenshot({path: 'screenshots/formsLayoutsPage.png'});
    const buffer = await page.screenshot();
    //console.log(buffer.toString('base64'));
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false);
    await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: 'screenshots/inlineForm.png'});

    //to be checked
    //await pm.navigateTo().datepickerPage();
//
    //await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(10);
    //await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 15);
});
