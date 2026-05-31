/**
 * External dependencies
 */
import { defineConfig, devices } from '@playwright/test';

/**
 * Env variables + static paths
 */
const { BASE_URL, CI, TIMEOUT } = process.env;
const STORAGE_STATE_PATH = 'artifacts/storage-states/admin.json';

/**
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig( {
	/* Global setup */
	globalSetup: require.resolve( './tests/e2e/global-setup.ts' ),

	/* Test file match extension. Currently only supporting `.spec.ts` extension */
	testMatch: [ 'tests/e2e/**/*.spec.ts' ],

	/* Run tests in files in parallel */
	fullyParallel: true,

	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !! CI,

	/* Retry on CI only */
	retries: CI ? 2 : 0,

	/* Opt out of parallel tests on CI. */
	workers: CI ? 1 : undefined,

	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'html',

	/* Report don't show test files. See https://playwright.dev/docs/api/class-testconfig#test-config-report-slow-tests */
	reportSlowTests: null,

	/* https://playwright.dev/docs/test-timeouts#set-test-timeout-in-the-config */
	timeout: parseInt( TIMEOUT || '', 10 ) || 60_000,

	/* Web-first assertions - separate timeout. See https://playwright.dev/docs/test-timeouts#expect-timeout */
	expect: {
		timeout: 10 * 1000,
	},

	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: BASE_URL ?? 'http://localhost:8889',

		headless: true,

		/* Take screenshot on failure. */
		screenshot: 'only-on-failure',

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',

		/* Emulates consistent viewport for each page. See https://playwright.dev/docs/api/class-testoptions#test-options-viewport */
		viewport: {
			width: 1280,
			height: 720,
		},

		/* https://playwright.dev/docs/api/class-testoptions#test-options-ignore-https-errors */
		ignoreHTTPSErrors: true,

		/* Emulates the user locale. See https://playwright.dev/docs/emulation#locale--timezone */
		locale: 'en-US',

		/* Options used to create the context. See https://playwright.dev/docs/api/class-testoptions#test-options-context-options */
		contextOptions: {
			reducedMotion: 'reduce',
			strictSelectors: true,
		},

		/* Auth storage state path. See https://playwright.dev/docs/api/class-testoptions#test-options-storage-state */
		storageState: STORAGE_STATE_PATH,
	},

	/* Configure projects for major browsers. See https://playwright.dev/docs/test-projects#configure-projects-for-multiple-browsers */
	projects: [
		{
			name: 'chromium',
			use: {
				...devices[ 'Desktop Chrome' ],
			},
		},
	],

	/* Run your local dev server before starting the tests */
	webServer: {
		command: 'npm run env:start',
		url: 'http://localhost:8889',
		reuseExistingServer: ! CI,
		timeout: 1_800_000,
	},
} );
