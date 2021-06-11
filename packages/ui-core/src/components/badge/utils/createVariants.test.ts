import createVariants from './createVariants';

test('create variants for active state', () => {
  const variants = createVariants(true);
  expect(variants).toMatchInlineSnapshot(`
    Object {
      "prop": "variant",
      "variants": Object {
        "black": Object {
          "backgroundColor": "rgba(79,91,95,0.6)",
          "color": "#1D2729",
        },
        "blue": Object {
          "backgroundColor": "rgba(119,163,187,0.6)",
          "color": "#27566D",
        },
        "gray": Object {
          "backgroundColor": "rgba(205,207,211,0.6)",
          "color": "#4F5B5F",
        },
        "green": Object {
          "backgroundColor": "rgba(156,192,162,0.6)",
          "color": "#487650",
        },
        "lightBlue": Object {
          "backgroundColor": "rgba(201,236,248,0.6)",
          "color": "#85B4C3",
        },
        "orange": Object {
          "backgroundColor": "rgba(246,159,121,0.6)",
          "color": "#CB5623",
        },
        "pink": Object {
          "backgroundColor": "rgba(250,218,206,0.6)",
          "color": "#F4A083",
        },
        "purple": Object {
          "backgroundColor": "rgba(166,137,233,0.6)",
          "color": "#674AA9",
        },
        "red": Object {
          "backgroundColor": "rgba(217,149,155,0.6)",
          "color": "#9D2F3A",
        },
        "white": Object {
          "backgroundColor": "rgba(216,216,216,0.6)",
          "color": "#FFFFFF",
        },
        "yellow": Object {
          "backgroundColor": "rgba(255,231,194,0.6)",
          "color": "#E29B1E",
        },
      },
    }
  `);
});

test('create variants for inactive state', () => {
  const variants = createVariants(false);
  expect(variants).toMatchInlineSnapshot(`
    Object {
      "prop": "variant",
      "variants": Object {
        "black": Object {
          "backgroundColor": "rgba(79,91,95,0.3)",
          "color": "#1D2729",
        },
        "blue": Object {
          "backgroundColor": "rgba(119,163,187,0.3)",
          "color": "#27566D",
        },
        "gray": Object {
          "backgroundColor": "rgba(205,207,211,0.3)",
          "color": "#4F5B5F",
        },
        "green": Object {
          "backgroundColor": "rgba(156,192,162,0.3)",
          "color": "#487650",
        },
        "lightBlue": Object {
          "backgroundColor": "rgba(201,236,248,0.3)",
          "color": "#85B4C3",
        },
        "orange": Object {
          "backgroundColor": "rgba(246,159,121,0.3)",
          "color": "#CB5623",
        },
        "pink": Object {
          "backgroundColor": "rgba(250,218,206,0.3)",
          "color": "#F4A083",
        },
        "purple": Object {
          "backgroundColor": "rgba(166,137,233,0.3)",
          "color": "#674AA9",
        },
        "red": Object {
          "backgroundColor": "rgba(217,149,155,0.3)",
          "color": "#9D2F3A",
        },
        "white": Object {
          "backgroundColor": "rgba(216,216,216,0.3)",
          "color": "#FFFFFF",
        },
        "yellow": Object {
          "backgroundColor": "rgba(255,231,194,0.3)",
          "color": "#E29B1E",
        },
      },
    }
  `);
});
