import { test } from '@playwright/test';

for (let i = 1; i <= 6; i++) {
  test(`task ${i}`, async ({}, testInfo) => {
    const t = new Date().toISOString().slice(11, 23);
    // eslint-disable-next-line no-console
    console.log(`[${t}] task ${i} | worker #${testInfo.workerIndex} | pid=${process.pid} | ppid=${process.ppid}`);
    await new Promise(r => setTimeout(r, 400));
  });
}
