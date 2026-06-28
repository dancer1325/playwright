# way to achieve parallel running: run several worker processes / run | SAME time
* | [here](sample)
  * `npx playwright test`
    * check output messages / MULTIPLE START FIRST

# by default,
## **test files** run in parallel | DIFFERENT AVAILABLE workers
* | [here](sample)
  * `npx playwright test`
    * check output messages / display "tests/parallel-demo.spec.ts:14:7" + "tests/example.spec.ts:9:5"
## tests | 1! file run in order | SAME worker process
* | [here](sample)
  * `npx playwright test`
    * check output messages
    * search "worker #2"
    * check the order
      * START | worker #2 (pid 63884) | slow test 1
      * END   | worker #2 (pid 63884) | slow test 1
      * START | worker #2 (pid 63884) | slow test 4

# Worker processes
## == 👀OS processes👀
* | [here](sample)
  * `npx playwright test`
    * check output messages
    * see "pid"
### run INDEPENDENTLY
* | [here](sample)
  * `npx playwright test independent-demo.spec.ts`
    * check output messages / counter is INDEPENDENT | browsers
### orchestrated -- by the -- test runner /
* | [here](sample)
  * `npx playwright test orchestration-demo.spec.ts`
    * check output messages / SAME ppid
### have IDENTICAL environments
* | [here](sample)
  * `npx playwright test identical-env-demo.spec.ts`
    * check output messages
### ❌can NOT communicate BETWEEN THEM❌
TODO:
#### as soon as a worker is free -> it's reused
TODO:


# TODO:
TODO:

