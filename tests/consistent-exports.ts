// @ts-expect-error no types
function get(one) {
  console.log(one);
}
function getTwo(one: string, two: string) {
  console.log(one, two);
}
function getTree(one: string, two: string, three: string) {
  console.log(one, two, three);
}
function getFour(one: string, two: string, three: string, four: string) {
  console.log(one, two, three, four);
}
