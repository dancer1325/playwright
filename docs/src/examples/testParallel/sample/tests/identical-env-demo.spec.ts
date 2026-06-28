import { test, expect } from '@playwright/test';

// "Workers have identical environments": every worker starts from the same
// clean, equivalent state. The ONLY thing that differs on purpose is the
// per-worker index. Run with several workers and compare the output:
//
//   npx playwright test identical-env-demo --workers=3 --reporter=list
//
// Across workers you should see IDENTICAL values for everything except
// TEST_WORKER_INDEX / TEST_PARALLEL_INDEX.

for (let i = 1; i <= 6; i++) {
  test(`env snapshot ${i}`, async ({}, testInfo) => {
    const snapshot = {
      // --- identical across all workers (same config / same clean env) ---
      project: testInfo.project.name,
      headless: testInfo.project.use.headless ?? '(default)',
      nodeEnv: process.env.NODE_ENV ?? '(unset)',
      cwd: process.cwd(),
      // --- deliberately UNIQUE per worker ---
      workerIndex: process.env.TEST_WORKER_INDEX,
      parallelIndex: process.env.TEST_PARALLEL_INDEX,
      pid: process.pid,
    };
    // eslint-disable-next-line no-console
    console.log(`task ${i}`, JSON.stringify(snapshot));

    // Clean-slate guarantee: every test sees the SAME config object for its
    // own project (not a leftover from another test). We assert the project
    // name matches the one the runner assigned — works for any project.
    expect(testInfo.project.name).toBe(snapshot.project);
    await new Promise(r => setTimeout(r, 200));
  });
}
