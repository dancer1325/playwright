import { test } from '@playwright/test';

// Each test sleeps ~2s and logs WHEN it starts/ends and on WHICH worker.
// If tests run in parallel, you'll see several "START" lines appear together,
// on different worker indices, and the whole file finishes in ~2s (not ~8s).

function stamp(label: string, testInfo: { workerIndex: number; title: string }) {
  const t = new Date().toISOString().slice(11, 23); // HH:MM:SS.mmm
  // eslint-disable-next-line no-console
  console.log(`[${t}] ${label.padEnd(5)} | worker #${testInfo.workerIndex} (pid ${process.pid}) | ${testInfo.title}`);
}

for (let i = 1; i <= 4; i++) {
  test(`slow test ${i}`, async ({}, testInfo) => {
    stamp('START', testInfo);
    await new Promise(r => setTimeout(r, 2000));
    stamp('END', testInfo);
  });
}
