/**
 * WordPress dependencies.
 */
import { test, expect } from '@wordpress/e2e-test-utils-playwright';

test.describe('Block Header Edit test', () => {
    test.beforeEach(async ({ admin }) => {
        await admin.createNewPost();
    });

    test('Should render title and description fields', async ({ editor, page }) => {
        await editor.insertBlock({ name: 'wrc/header' });

        const titleField = page.locator('role=textbox[name="Header title"i]');
        const descriptionField = page.locator('role=textbox[name="Header description"i]');

        expect(await titleField.isVisible()).toBe(true);
        expect(await descriptionField.isVisible()).toBe(true);
    });

    test('Should update title attribute when title field is changed', async ({ editor, page }) => {
        await editor.insertBlock({ name: 'wrc/header' });

        const titleField = page.locator('role=textbox[name="Header title"i]');

        await titleField.fill('New Title');

        const postContent = await editor.getEditedPostContent();

        expect(postContent).toBe('<!-- wp:wrc/header {\"title\":\"New Title\"} /-->');
    });

    test('Should update description attribute when description field is changed', async ({ editor, page }) => {
        await editor.insertBlock({ name: 'wrc/header' });

        const descriptionField = page.locator('role=textbox[name="Header description"i]');

        await descriptionField.fill('New description');

        const postContent = await editor.getEditedPostContent();

        expect(postContent).toBe('<!-- wp:wrc/header {\"description\":\"New description\"} /-->');
    });
});
