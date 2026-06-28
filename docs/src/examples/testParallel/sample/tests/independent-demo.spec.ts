import { test, expect } from '@playwright/test';

// Module-level state. Looks shared, but each worker process loads its OWN copy.
let counter = 0;
const secret = `set-by-pid-${process.pid}`;

for (let i = 1; i <= 4; i++) {
  test(`independent ${i}`, async ({}, testInfo) => {
    counter++; // increment the module global
    // eslint-disable-next-line no-console
    console.log(`worker #${testInfo.workerIndex} pid=${process.pid} | counter=${counter} | secret=${secret} | env=${process.env.MY_FLAG ?? 'unset'}`);
    // Mutate process-level state: only visible within THIS worker process.
    process.env.MY_FLAG = `touched-by-worker-${testInfo.workerIndex}`;
    await new Promise(r => setTimeout(r, 300));
  });
}
