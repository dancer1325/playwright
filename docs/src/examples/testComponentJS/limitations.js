// 1. ❌you can NOT pass complex live objects -- to -- your component❌
test('this will work', async ({ mount }) => {
  const component = await mount(<ProcessViewer process={{ name: 'playwright' }}/>);
});

test('this will not work', async ({ mount }) => {
  // `process` is a Node object, we can't pass it to the browser and expect it to work.
  const component = await mount(<ProcessViewer process={process}/>);
});

// 2. ❌you can NOT pass data synchronously | a callback❌
test('this will not work', async ({ mount }) => {
  // () => 'red' callback lives in Node. If `ColorPicker` component in the browser calls the parameter function
  // `colorGetter` it won't get result synchronously. It'll be able to get it via await, but that is not how
  // components are typically built.
  const component = await mount(<ColorPicker colorGetter={() => 'red'}/>);
});
