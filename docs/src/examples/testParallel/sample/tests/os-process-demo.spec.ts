import { test } from '@playwright/test';

for (let i = 1; i <= 3; i++) {
  test(`os process ${i}`, async ({}, testInfo) => {
    // process.pid = PID de ESTE worker; process.ppid = el proceso padre (el runner)
    // eslint-disable-next-line no-console
    console.log(`worker #${testInfo.workerIndex} | pid=${process.pid} | ppid=${process.ppid} | argv0=${process.argv0}`);
    await new Promise(r => setTimeout(r, 1500)); // mantener vivo el proceso para verlo en 'ps'
  });
}
