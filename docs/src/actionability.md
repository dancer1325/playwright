---
id: actionability
title: "Auto-waiting"
---

## Introduction

* == actionability checks | elements /
  * run BEFORE perform actions
    * Reason: 🧠check actions behave -- as -- expected 🧠
    * if ALL checks pass -> perform actions
      * OTHERWISE -> NOT perform actions
  * ⚠️if checks' time spent > given timeout -> action fails with `TimeoutError` ⚠️

* actionability checks / EACH action

  | Action | [Visible] | [Stable] | [Receives Events] | [Enabled] | [Editable] |
  | :- | :-: | :-: | :-: | :-: | :-: |
  | [`method: Locator.check`] | Yes | Yes | Yes | Yes | - |
  | [`method: Locator.click`] | Yes | Yes | Yes | Yes | - |
  | [`method: Locator.dblclick`] | Yes | Yes | Yes | Yes | - |
  | [`method: Locator.setChecked`] | Yes | Yes | Yes | Yes | - |
  | [`method: Locator.tap`] | Yes | Yes | Yes | Yes | - |
  | [`method: Locator.uncheck`] | Yes | Yes | Yes | Yes | - |
  | [`method: Locator.hover`] | Yes | Yes | Yes | - | - |
  | [`method: Locator.dragTo`] | Yes | Yes | Yes | - | - |
  | [`method: Locator.screenshot`] | Yes | Yes | - | - | - |
  | [`method: Locator.fill`] | Yes | - | - | Yes | Yes |
  | [`method: Locator.clear`] | Yes | - | - | Yes | Yes |
  | [`method: Locator.selectOption`] | Yes | - | - | Yes | - |
  | [`method: Locator.selectText`] | Yes | - | - | - | - |
  | [`method: Locator.scrollIntoViewIfNeeded`] | - | Yes | - | - | - |
  | [`method: Locator.blur`] | - | - | - | - | - |
  | [`method: Locator.dispatchEvent`] | - | - | - | - | - |
  | [`method: Locator.focus`] | - | - | - | - | - |
  | [`method: Locator.press`] | - | - | - | - | - |
  | [`method: Locator.pressSequentially`] | - | - | - | - | - |
  | [`method: Locator.setInputFiles`] | - | - | - | - | - |

  * _Example:_
    * | [`method: Locator.click`], Playwright will ensure
      - locator -- resolves to -- 1! element
      - element is [Visible]
      - element is [Stable]
        - Reason: 🧠NOT animating or completed animation🧠
      - element [Receives Events]
        - Reason: 🧠NOT obscured by other elements 🧠
      - element is [Enabled]

## Forcing actions

* == actions / support `force` option
  * -> disables NON-essential actionability checks
* _Example:_ [`method: Locator.click`] action
  * if `force=true` -> [`method: Locator.click`] will NOT check -- that the -- target element ACTUALLY receives click events

## Assertions

* built-in AUTO-retrying assertions / remove flakiness
  * -- by -- waiting UNTIL the condition is met

| Assertion | Description |
| :- | :- |
| [`method: LocatorAssertions.toBeAttached`] | Element is attached |
| [`method: LocatorAssertions.toBeChecked`] | Checkbox is checked |
| [`method: LocatorAssertions.toBeDisabled`] | Element is disabled |
| [`method: LocatorAssertions.toBeEditable`] | Element is editable |
| [`method: LocatorAssertions.toBeEmpty`] | Container is empty |
| [`method: LocatorAssertions.toBeEnabled`] | Element is enabled |
| [`method: LocatorAssertions.toBeFocused`] | Element is focused |
| [`method: LocatorAssertions.toBeHidden`] | Element is not visible |
| [`method: LocatorAssertions.toBeInViewport`] | Element intersects viewport |
| [`method: LocatorAssertions.toBeVisible`] | Element is visible |
| [`method: LocatorAssertions.toContainText`] | Element contains text |
| [`method: LocatorAssertions.toHaveAttribute`] | Element has a DOM attribute |
| [`method: LocatorAssertions.toHaveClass`] | Element has a class property |
| [`method: LocatorAssertions.toHaveCount`] | List has exact number of children |
| [`method: LocatorAssertions.toHaveCSS`] | Element has CSS property |
| [`method: LocatorAssertions.toHaveId`] | Element has an ID |
| [`method: LocatorAssertions.toHaveJSProperty`] | Element has a JavaScript property |
| [`method: LocatorAssertions.toHaveText`] | Element matches text |
| [`method: LocatorAssertions.toHaveValue`] | Input has a value |
| [`method: LocatorAssertions.toHaveValues`] | Select has options selected |
| [`method: PageAssertions.toHaveTitle`] | Page has a title |
| [`method: PageAssertions.toHaveURL`] | Page has a URL |
| [`method: APIResponseAssertions.toBeOK`] | Response has an OK status |

* see [assertions guide](./test-assertions.md)

## Visible

* := element /
  * has NON-empty bounding box
  * NOT have `visibility:hidden` computed style

* Elements /
  * NOT visible
    * Elements / 's size=0
    * Elements / `display:none`
  * visible
    * Elements / `opacity:0`

## Stable

* := element /
  * 's SAME bounding box / 2-consecutive animation frames

## Enabled

* := element /
  * EXCEPT TO `<button>`, `<select>`, `<input>` or `<textarea>` / `disabled` property

## Editable

* := element /
  * is [enabled] & NOT have `readonly` property

## Receives Events

* := element /
  * pointer event's hit target is | action point
* _Examples:_
  * _Example1:_ click | point `(10;10)`,
    * Playwright checks whether SOME OTHER element (usually an overlay) -- will capture -- the click | `(10;10)`
  * _Example2:_ Playwright will click `Sign Up` button / regardless of if [`method: Locator.click`]
    - page -- is checking that --
      - user name is UNIQUE
      - `Sign Up` button is DISABLED
    - | AFTER checking with the server,
      - disabled `Sign Up` button -- is replaced with -- ANOTHER one / is NOW enabled

[Visible]: #visible "Visible"
[Stable]: #stable "Stable"
[Enabled]: #enabled "Enabled"
[Editable]: #editable "Editable"
[Receives Events]: #receives-events "Receives Events"
