import 'babel-polyfill'; //this is how you polyfill, right?

[1,2,3].map(n => n + 1);

const countries = {
    BR: 'Brazil',
    DE: 'Germany',
    RO: 'Romania',
    US: 'United States of America'
};
Object.values(countries); // ['Brazil', 'Germany', 'Romania', 'United States of America']


