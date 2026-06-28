import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// In-memory "mailbox": looks shared in the source, but each worker process
// has its OWN copy. Writing here in one worker is invisible to the others.
const inMemoryMailbox: string[] = [];

// A file on disk: an EXTERNAL channel, shared by the OS, not by the process.
const fileMailbox = path.join(__dirname, '..', 'mailbox.txt');

test.beforeAll(() => {
  // clean the file once per worker startup (each worker runs beforeAll)
  try { fs.writeFileSync(fileMailbox, '', { flag: 'wx' }); } catch { /* exists */ }
});

for (let i = 1; i <= 6; i++) {
  test(`worker comm ${i}`, async ({}, testInfo) => {
    const w = process.env.TEST_WORKER_INDEX;

    // 1) try to "send" via in-memory variable
    inMemoryMailbox.push(`hello-from-worker-${w}`);

    // 2) also "send" via the external file channel
    fs.appendFileSync(fileMailbox, `hello-from-worker-${w}\n`);

    // read both back
    const memSeen = [...inMemoryMailbox];
    const fileSeen = fs.readFileSync(fileMailbox, 'utf8').trim().split('\n').filter(Boolean);

    // eslint-disable-next-line no-console
    console.log(`worker #${w} pid=${process.pid} | MEM sees ${memSeen.length} msg [${memSeen.join(',')}] | FILE sees ${fileSeen.length} msgs`);

    await new Promise(r => setTimeout(r, 200));
  });
}
