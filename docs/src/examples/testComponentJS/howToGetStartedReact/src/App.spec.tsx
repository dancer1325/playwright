import { test, expect } from '@playwright/experimental-ct-react';
import App from './App';

test('should work', async ({ mount }) => {
  const component = await mount(<App />);
  await expect(component).toContainText('Get startedEdit src/App.tsx and save to test HMRCount is 0DocumentationYour questions, answeredExplore ViteLearn moreConnect with usJoin the Vite communityGitHubDiscordX.comBluesky');
});
