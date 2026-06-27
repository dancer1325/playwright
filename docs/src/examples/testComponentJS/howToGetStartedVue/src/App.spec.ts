import { test, expect } from '@playwright/experimental-ct-vue';
import App from './App.vue';

test('should work', async ({ mount }) => {
  const component = await mount(App);
  await expect(component).toContainText('Get startedEdit src/App.vue and save to test HMR Count is 0DocumentationYour questions, answered Explore Vite  Learn more Connect with usJoin the Vite community GitHub  Discord  X.com  Bluesky ');
});
