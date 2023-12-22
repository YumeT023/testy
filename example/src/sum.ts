import {Test, TestClass} from "@yumii.saiko/testy/decorators";

export function sum(...numbers: number[]) {
  return numbers.reduce((acc, val) => acc + val, 0 /* initial */);
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
