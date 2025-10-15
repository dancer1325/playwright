---
id: codegen
title: "Test generator"
---

import LiteYouTube from '@site/src/components/LiteYouTube';

## Introduction

* Playwright
  * allows
    * generating tests for you -- based on -- performed actions | browser /
      * figure out the best locator -- following -- the priority [role, text and test id locators](Guides/Locators/locators.md) /
        * if there are MULTIPLE elements / match the locator -> it improves the locator / UNIQUELY identify the target element
      * ALLOWED
        * actions
          * _Example:_ click OR fill
        * assertions
          * -- via -- click 1 toolbar's icon & click | element
          * are
            * `'assert visibility'`
              * == element is visible
            * `'assert text'`
              * == element contains specific text
            * `'assert value'`
              * == element has a specific value

## Generate tests in VS Code
* TODO:
* langs: js

Install the VS Code extension and generate tests directly from VS Code
* The extension is available on the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
* Check out our guide on [getting started with VS Code](./getting-started-vscode.md).

<LiteYouTube
    id="LM4yqrOzmFE"
    title="Generating Playwright tests in VS Code"
/>

### Record a New Test

To record a test click on the **Record new** button from the Testing sidebar. This will create a `test-1.spec.ts` file as well as open up a browser window.

<img width="1385" alt="record new in vs code" src="https://user-images.githubusercontent.com/13063165/220961665-615d0ab8-3f0b-439c-ad0b-0424d9aa154b.png" />

In the browser go to the URL you wish to test and start clicking around to record your user actions.

![generating user actions](https://github.com/microsoft/playwright/assets/13063165/1d4c8f37-8325-4816-a665-d0e95e63f509)

Playwright will record your actions and generate the test code directly in VS Code. You can also generate assertions by choosing one of the icons in the toolbar and then clicking on an element on the page to assert against. The following assertions can be generated:
  * `'assert visibility'` to assert that an element is visible
  * `'assert text'` to assert that an element contains specific text
  * `'assert value'` to assert that an element has a specific value

![generating assertions](https://github.com/microsoft/playwright/assets/13063165/d131eb35-b2ca-4bf4-a8ac-88b6e40dcf07)

Once you are done recording click the **cancel** button or close the browser window. You can then inspect your `test-1.spec.ts` file and manually improve it if needed.

![code from a generated test](https://github.com/microsoft/playwright/assets/13063165/2ba4c212-4713-460a-b054-6dc6b67a9a7c)

### Record at Cursor

To record from a specific point in your test move your cursor to where you want to record more actions and then click the **Record at cursor** button from the Testing sidebar. If your browser window is not already open then first run the test with 'Show browser' checked and then click the **Record at cursor** button.


![record at cursor in vs code](https://github.com/microsoft/playwright/assets/13063165/77948ab8-92a2-435f-9833-0944da5ae664)

In the browser window start performing the actions you want to record.

<img width="1394" alt="add feed the dog to todo app" src="https://user-images.githubusercontent.com/13063165/220960770-6435cec7-1723-42a8-8c1f-8244e2d800c7.png" />


In the test file in VS Code you will see your new generated actions added to your test at the cursor position.

![code from a generated test](https://github.com/microsoft/playwright/assets/13063165/4f4bb34e-9cda-41fe-bf65-8d8016d84c7f)

### Generating locators

You can generate locators with the test generator.
- Click on the **Pick locator** button form the testing sidebar and then hover over elements in the browser window to see the [locator](Guides/Locators/locators.md) highlighted underneath each element.
- Click the element you require and it will now show up in the **Pick locator** box in VS Code.
- Press <kbd>Enter</kbd> on your keyboard to copy the locator into the clipboard and then paste anywhere in your code. Or press 'escape' if you want to cancel.

<img width="1641" alt="Pick locators in VS code" src="https://user-images.githubusercontent.com/13063165/220958368-95b03620-3c9b-40a8-be74-01c96ba03cad.png" />

## Generate tests with the Playwright Inspector

* `codegen` command
  * 2 windows are opened
    * browser window | you interact -- with the -- website
    * Playwright Inspector window | you can
      * record your tests
      * copy the tests | your editor

* `.. playwright codegen websiteURLWhereGenerateTests`
  * `websiteURLWhereGenerateTests`
    * OPTIONAL
      * if you do NOT specify it -> | opened browser window, specify it

  * ways
    ```bash js
    npx playwright codegen demo.playwright.dev/todomvc
    ```

    ```bash java
    mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="codegen demo.playwright.dev/todomvc"
    ```

    ```bash python
    playwright codegen demo.playwright.dev/todomvc
    ```

    ```bash csharp
    pwsh bin/Debug/netX/playwright.ps1 codegen demo.playwright.dev/todomvc
    ```
* record a test
  * perform actions | browser window
  * stop the recording & press the **copy** button

* _Example:_ `npx playwright codegen https://www.cncf.io/`
  ![](static/codegenExample.png)

### Generating locators

* steps
  * stop the recording
  * select the `'Pick Locator'`
  * select elements | browser window
    * -> | Playwright inspector window,
      * highlight EACH element

* _Example:_ `npx playwright codegen https://www.cncf.io/`

## Emulation

You can use the test generator to generate tests using emulation so as to generate a test for a specific viewport, device, color scheme, as well as emulate the geolocation, language or timezone. The test generator can also generate a test while preserving authenticated state.

### Emulate viewport size

Playwright opens a browser window with its viewport set to a specific width and height and is not responsive as tests need to be run under the same conditions. Use the `--viewport` option to generate tests with a different viewport size.

```bash js
npx playwright codegen --viewport-size=800,600 playwright.dev
```

```bash java
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="codegen --viewport-size=800,600 playwright.dev"
```

```bash python
playwright codegen --viewport-size=800,600 playwright.dev
```

```bash csharp
pwsh bin/Debug/netX/playwright.ps1 codegen --viewport-size=800,600 playwright.dev
```
######
* langs: js

<img width="870" alt="Codegen generating code for tests for playwright.dev website with a specific viewport js" src="https://user-images.githubusercontent.com/13063165/220402029-f90d1c9f-d740-4c0f-acc8-95235ee83f85.png" />

######
* langs: java

<img width="870" alt="Codegen generating code for tests for playwright.dev website with a specific viewport java" src="https://user-images.githubusercontent.com/13063165/220402748-12a856c2-b3ff-4155-b82d-64dad9c46886.png" />

######
* langs: python

<img width="870" alt="Codegen generating code for tests for playwright.dev website with a specific viewport python" src="https://user-images.githubusercontent.com/13063165/220403118-7704b708-dea3-44b3-97a4-04c2b9d1d0fa.png" />

######
* langs: csharp

<img width="870" alt="Codegen generating code for tests for playwright.dev website with a specific viewport dotnet" src="https://user-images.githubusercontent.com/13063165/220403496-4a46a9a1-4bc4-43e7-8f22-9cc760ceadaf.png" />


### Emulate devices

Record scripts and tests while emulating a mobile device using the `--device` option which sets the viewport size and user agent among others.

```bash js
npx playwright codegen --device="iPhone 13" playwright.dev
```

```bash java
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args='codegen --device="iPhone 13" playwright.dev'
```

```bash python
playwright codegen --device="iPhone 13" playwright.dev
```

```bash csharp
pwsh bin/Debug/netX/playwright.ps1 codegen --device="iPhone 13" playwright.dev
```
######
* langs: js

<img width="1300" alt="Codegen generating code for tests for playwright.dev website emulated for iPhone 13 js" src="https://user-images.githubusercontent.com/13063165/220921482-dc4f5532-9dce-40bd-8a28-e0d87d26a601.png" />

######
* langs: java

<img width="1300" alt="Codegen generating code for tests for playwright.dev website emulated for iPhone 13 java" src="https://user-images.githubusercontent.com/13063165/220922591-241e6a59-a920-4cb1-97a2-d46c33ea17c5.png" />

######
* langs: python

<img width="1300" alt="Codegen generating code for tests for playwright.dev website emulated for iPhone 13 python" src="https://user-images.githubusercontent.com/13063165/220922790-5c5a4d1a-e27d-4c9b-90ac-13cf9c925706.png" />

######
* langs: csharp

<img width="1300" alt="Codegen generating code for tests for playwright.dev website emulated for iPhone 13 csharp" src="https://user-images.githubusercontent.com/13063165/220923048-f13583b1-ab08-4702-ab74-58691d50acfe.png" />


### Emulate color scheme

Record scripts and tests while emulating the color scheme with the `--color-scheme` option.

```bash js
npx playwright codegen --color-scheme=dark playwright.dev
```

```bash java
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="codegen --color-scheme=dark playwright.dev"
```

```bash python
playwright codegen --color-scheme=dark playwright.dev
```

```bash csharp
pwsh bin/Debug/netX/playwright.ps1 codegen --color-scheme=dark playwright.dev
```

######
* langs: js

<img width="1394" alt="Codegen generating code for tests for playwright.dev website in dark mode js" src="https://user-images.githubusercontent.com/13063165/220930273-f3a25bae-64dd-4bbb-99ed-1e97c0cb1ebf.png" />

######
* langs: java

<img width="1394" alt="Codegen generating code for tests for playwright.dev website in dark mode java" src="https://user-images.githubusercontent.com/13063165/220930514-3b105fab-c87e-4f58-affa-d11d570122a8.png" />

######
* langs: python

<img width="1394" alt="Codegen generating code for tests for playwright.dev website in dark mode python" src="https://user-images.githubusercontent.com/13063165/220930714-737647fd-ae99-4dd3-b7a4-4f3eb4fe712d.png" />

######
* langs: csharp

<img width="1394" alt="Codegen generating code for tests for playwright.dev website in dark mode csharp" src="https://user-images.githubusercontent.com/13063165/220930893-c1d0df65-c662-4b33-91eb-ea10552d7cc5.png" />

### Emulate geolocation, language and timezone

Record scripts and tests while emulating timezone, language & location using the `--timezone`, `--geolocation` and `--lang` options. Once the page opens:

1. Accept the cookies
1. On the top right click on the locate me button to see geolocation in action.

```bash js
npx playwright codegen --timezone="Europe/Rome" --geolocation="41.890221,12.492348" --lang="it-IT" bing.com/maps
```

```bash java
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args='codegen --timezone="Europe/Rome" --geolocation="41.890221,12.492348" --lang="it-IT" bing.com/maps'
```

```bash python
playwright codegen --timezone="Europe/Rome" --geolocation="41.890221,12.492348" --lang="it-IT" bing.com/maps
```

```bash csharp
pwsh bin/Debug/netX/playwright.ps1 codegen --timezone="Europe/Rome" --geolocation="41.890221,12.492348" --lang="it-IT" bing.com/maps
```

######
* langs: js

<img width="1394" alt="Codegen generating code for tests for bing maps showing timezone, geolocation as Rome, Italy and in Italian language" src="https://user-images.githubusercontent.com/13063165/220931996-d3144421-8d3b-4f9f-896c-769c01566c01.png" />

######
* langs: java

<img width="1394" alt="Codegen generating code for tests for bing maps showing timezone, geolocation as Rome, Italy and in Italian language java" src="https://user-images.githubusercontent.com/13063165/220932268-9012163f-7673-4072-aa91-13b3c8f57799.png" />

######
* langs: python

<img width="1394" alt="Codegen generating code for tests for bing maps showing timezone, geolocation as Rome, Italy and in Italian language python" src="https://user-images.githubusercontent.com/13063165/220932413-f2943956-dd38-4560-94b9-51968076210d.png" />


######
* langs: csharp

<img width="1394" alt="Codegen generating code for tests for bing maps showing timezone, geolocation as Rome, Italy and in Italian language csharp" src="https://user-images.githubusercontent.com/13063165/220932688-a47df2a8-332b-47a4-9580-7d351def9f50.png" />

### Preserve authenticated state

Run `codegen` with `--save-storage` to save [cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) and [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) at the end of the session. This is useful to separately record an authentication step and reuse it later when recording more tests.

```bash js
npx playwright codegen github.com/microsoft/playwright --save-storage=auth.json
```

```bash java
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="codegen github.com/microsoft/playwright  --save-storage=auth.json"
```

```bash python
playwright codegen github.com/microsoft/playwright --save-storage=auth.json
```

```bash csharp
pwsh bin/Debug/netX/playwright.ps1 codegen github.com/microsoft/playwright --save-storage=auth.json
```

######
* langs: js

<img width="1394" alt="github page before logging in js" src="https://user-images.githubusercontent.com/13063165/220929062-88dfe567-0c6d-4e49-b9f9-74ae241fb8c7.png" />


######
* langs: java

<img width="1394" alt="github page before logging in java" src="https://user-images.githubusercontent.com/13063165/220929236-08129e16-82a9-46a3-9f1c-3e59619c6289.png" />


######
* langs: python

<img width="1394" alt="github page before logging in python" src="https://user-images.githubusercontent.com/13063165/220929429-8756ec49-fbf2-46e0-8f41-d25f5f5a6623.png" />

######
* langs: csharp

<img width="1394" alt="github page before logging in csharp" src="https://user-images.githubusercontent.com/13063165/220929619-28d4ed0c-d172-4cf1-b30b-bf5bed0e07bf.png" />

#### Login

After performing authentication and closing the browser, `auth.json` will contain the storage state which you can then reuse in your tests.

<img width="1394" alt="login to GitHub screen" src="https://user-images.githubusercontent.com/13063165/220561688-04b2b984-4ba6-4446-8b0a-8058876e2a02.png" />

Make sure you only use the `auth.json` locally as it contains sensitive information. Add it to your `.gitignore` or delete it once you have finished generating your tests.

#### Load authenticated state

Run with `--load-storage` to consume the previously loaded storage from the `auth.json`. This way, all [cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) and [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) will be restored, bringing most web apps to the authenticated state without the need to login again. This means you can can continue generating tests from the logged in state.

```bash js
npx playwright codegen --load-storage=auth.json github.com/microsoft/playwright
```

```bash java
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="codegen --load-storage=auth.json github.com/microsoft/playwright"
```

```bash python
playwright codegen --load-storage=auth.json github.com/microsoft/playwright
```

```bash csharp
pwsh bin/Debug/netX/playwright.ps1 codegen --load-storage=auth.json github.com/microsoft/playwright
```

######
* langs: js

<img width="1394" alt="github signed in showing use of load storage js" src="https://user-images.githubusercontent.com/13063165/220927873-9e55fdda-2def-45c1-9a1b-bcc851885f96.png" />


######
* langs: java

<img width="1394" alt="github signed in showing use of load storage java" src="https://user-images.githubusercontent.com/13063165/220928075-1e38347b-9d0d-4d9e-9a67-506c717893df.png" />

######
* langs: python

<img width="1394" alt="github signed in showing use of load storage python" src="https://user-images.githubusercontent.com/13063165/220928211-ca1d4dc9-9966-414e-ab23-a3ef1d2d5ed9.png" />

######
* langs: csharp

<img width="1394" alt="github signed in showing use of load storage scharp" src="https://user-images.githubusercontent.com/13063165/220928354-caa0e958-fe09-4125-9b54-67483064da51.png" />

## Record using custom setup

* steps
  * [record -- via -- Codegen](#generate-tests-with-the-playwright-inspector)
  * | generated code,
    * add your DESIRED custom setup
      * _Example:_ `BrowserContext.route`, `Page.pause`

