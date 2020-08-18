let userTable = document.getElementById('user-table');
let addUser = document.getElementById('add-user');
let doubleMoney = document.getElementById('double-money');
let showMillionairs = document.getElementById('show-Millionairs');
let totalWealth = document.getElementById('calc');
let sortUsers = document.getElementById('sort');
let users = [];
let totalUserWealth = 0;
let checkCalc = false;

addUser.addEventListener('click', addNewUser);
doubleMoney.addEventListener('click', doubleUserMoney);
showMillionairs.addEventListener('click', showUserMillionairs);
totalWealth.addEventListener('click', getTotalWealth);
sortUsers.addEventListener('click', getSortUsers);

function addUserInfo(){
    let out = `
        <tr>
            <th>Person</th>
            <th>Wealth</th>
        </tr>
    `;
    for(let user of users){
        debugger
        out += `
            <tr>
                <td>${user.name.first} ${user.name.last}</td>
                <td>${user.wealth}</td>
            </tr>
        `
    }

    if(checkCalc){
        out += `
            <tr style="background-color: #fff">
                <td> Total Wealth </td>
                <td>${totalUserWealth}</td>
            </tr>
        `
    }

    userTable.innerHTML = out;
}

function addNewUser(){
    debugger
    checkCalc ? getTotalWealth() : createUser();
}

function doubleUserMoney(){
    users = users.map(user => {
        user.wealth = user.wealth *2;
        return user;
    });
    checkCalc ? getTotalWealth() : addUserInfo();
}

function showUserMillionairs(){
    users = users.filter(user => {
        if(user.wealth > 1000000){
            return user;
        }
    });
    checkCalc ? getTotalWealth() : addUserInfo();
}

function compare(a, b) {

    const userA = a.name.first.toUpperCase();
    const userB = b.name.first.toUpperCase();
  
    let comparison = 0;
    if (userA > userB) {
      comparison = 1;
    } else if (userA < userB) {
      comparison = -1;
    }
    return comparison;
}

function getSortUsers(){
    users = users.sort(compare);
    addUserInfo();
}

function getTotalWealth(){
    totalUserWealth = 0;
    users.forEach(user => {
        totalUserWealth += user.wealth;
    });
    checkCalc = true;
    addUserInfo();
}

function createUser(){
    fetch('https://randomuser.me/api')
    .then(res => res.json())
    .then(data => {
        data.results[0].wealth = ((Math.random() * 10000000).toFixed(2)) - 200000;
        users = users.concat(data.results);
        addUserInfo();
    })
    .catch(err => console.log(err))
}

createUser();