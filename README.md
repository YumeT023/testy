# Testy

Decorator-based testing frameworks facade in Typescript

## Usage

Suppose you have a _function sum(...numbers)_ function in a file named `sum.ts`.
You would like it to contain both the `sum` function and its `test`. Here's how you could accomplish that.

> src/sum.ts

```typescript
import {TestClass, Test} from "@yumii.saiko/testy/decorators";

export function sum(...numbers: number[]) {
  return numbers.reduce((acc, n) => acc + n, 0);
}

@TestClass({
  desc: "fn Sum()",
})
export class SumTest {
  @Test()
  should_compute_numbers_sum() {
    expect(sum(10, 10)).toEqual(20);
  }

  @Test({
    skip: true,
    desc: "Explicitly skip this for now",
  })
  not_implemented_yet() {}
}
```

Using the filename pattern that your testing framework might identify, example `src/test/*/**/*.spec.ts`, create a single file in which all of the `Test class` registrations should go.

> src/test/bootstrap_test.spec.ts

```typescript
import {DECLARE_TESTS} from "@yumii.saiko/testy";
import {SumTest} from "../sum.ts";

DECLARE_TESTS([SumTest]);
```

> screenshot (jest)

![jest_testy](./assets/testy_jest.PNG)
