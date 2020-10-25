/*let numbers = {};
for (let i = 0; i < 10000; i++) {
  let sum = 0;
  for (let j = 0; j < 64; j++) {
    if (Math.random() < 0.32) {
      sum += 5;
    }
  }
  if (numbers[sum] === undefined) numbers[sum] = 1;
  else numbers[sum]++;
}

console.log(numbers);
let sum = 0;
for (let key in numbers) {
  if (key >= 100) {
    sum += numbers[key];
  }
}
console.log(sum);*/
let counts = [];
for (let i = 0; i < 20000; i++) {
  let count = 0;
  for (let progress = 0; progress < 100; ) {
    if (Math.random() < 0.53) {
      progress += randomInt(2, 6);
    }
    count++;
  }
  counts.push(count);
}
let average = counts.reduce((a, b) => a + b) / counts.length;
console.log(average);
function randomInt(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
/*let numbers = {};
let count = 10000;
for (let i = 0; i < count; i++) {
  let rand = randomInt(2, 6);
  if (numbers[rand] === undefined) numbers[rand] = 1;
  else numbers[rand]++;
}
console.log(numbers);
let sum = 0;
for (let num in numbers) {
  sum += num * numbers[num];
}
console.log(sum / count);*/
