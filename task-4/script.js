
window.onload = function () {
    const container = document.getElementById('container');

    const fizzbuzz = document.getElementById('fizzbuzz');
    let fizzbuzzCount = 0;
    const buzz = document.getElementById('buzz');
    let buzzCount = 0;
    const fizz = document.getElementById('fizz');
    let fizzCount = 0;
    const regular = document.getElementById('regular');
    let regularCount = 0;

    const start = 1;
    const count = 100;

    const arr = range(count, start)

    let msg = '';
    for (const item of arr) {
        switch (true) {
            case check(item, 15):
                msg += `FizzBuzz, `;
                fizzbuzzCount++;
                break;
            case check(item, 5):
                msg += `Buzz, `;
                buzzCount++;
                break;
            case check(item, 3):
                msg += `Fizz, `;
                fizzCount++;
                break;
            default:
                msg += `${item}, `;
                regularCount++;
                break;
        }
    }
    // удаляем последней ', '
    msg = msg.slice(0, -2);

    container.innerHTML = msg;

    fizzbuzz.innerHTML = `FizzBuzz - ${fizzbuzzCount}`;
    buzz.innerHTML = `Buzz - ${buzzCount}`;
    fizz.innerHTML = `Fizz - ${fizzCount}`;
    regular.innerHTML = `Regular - ${regularCount}`;
};

function range(size = 100, startAt = 1) {
    return [...Array(size).keys()].map(i => i + startAt);
}

function check(a, b) {
    return a % b === 0
}