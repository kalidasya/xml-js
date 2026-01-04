expect.extend({
  toContain: (collection, value) => jest.toContainEqual(collection, value),
});
