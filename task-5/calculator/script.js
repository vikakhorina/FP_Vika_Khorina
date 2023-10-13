
var expression;
var active;


var expressionTxt = '';
var activeNUmber = '0';

var isAfterOperation = false;
var isAfterExecute = false;

var prevActiveNumber = null;
var prevLastoperation = null;
var lastoperation = null;

window.onload = function () {

    expression = document.getElementById('expression');
    active = document.getElementById('active');

    const button0 = document.getElementById('0');
    const button1 = document.getElementById('1');
    const button2 = document.getElementById('2');
    const button3 = document.getElementById('3');
    const button4 = document.getElementById('4');
    const button5 = document.getElementById('5');
    const button6 = document.getElementById('6');
    const button7 = document.getElementById('7');
    const button8 = document.getElementById('8');
    const button9 = document.getElementById('9');

    const buttonDiv = document.getElementById('Div');
    const buttonMult = document.getElementById('Mult');
    const buttonSub = document.getElementById('Sub');
    const buttonAdd = document.getElementById('Add');
    const buttonRoot = document.getElementById('Root');
    const buttonDeg = document.getElementById('Deg');

    const buttonReset = document.getElementById('Reset');
    const buttonExecute = document.getElementById('Execute');
    const buttonSlice = document.getElementById('Slice');

    active.innerHTML = activeNUmber;

    button0.addEventListener("click", () => { inputDigital(0); });
    button1.addEventListener("click", () => { inputDigital(1); });
    button2.addEventListener("click", () => { inputDigital(2); });
    button3.addEventListener("click", () => { inputDigital(3); });
    button4.addEventListener("click", () => { inputDigital(4); });
    button5.addEventListener("click", () => { inputDigital(5); });
    button6.addEventListener("click", () => { inputDigital(6); });
    button7.addEventListener("click", () => { inputDigital(7); });
    button8.addEventListener("click", () => { inputDigital(8); });
    button9.addEventListener("click", () => { inputDigital(9); });

    buttonDiv.addEventListener("click", () => { inputOperation(1); });
    buttonMult.addEventListener("click", () => { inputOperation(2); });
    buttonSub.addEventListener("click", () => { inputOperation(3); });
    buttonAdd.addEventListener("click", () => { inputOperation(4); });
    buttonRoot.addEventListener("click", () => { inputOperation(5); });
    buttonDeg.addEventListener("click", () => { inputOperation(6); });

    buttonReset.addEventListener("click", () => { resetAll(); });
    buttonExecute.addEventListener("click", () => { executeExpression(); });
    buttonSlice.addEventListener("click", () => { sliceActiveNumb(); });
};

function inputOperation(type) {
    const txt = getOperationStr(type, +activeNUmber);

    if (isAfterExecute) {

        if (prevLastoperation && lastoperation && isSkeepActiveNumber(lastoperation)) {
            const oper = type;

            const res = executeOpration(prevLastoperation, prevActiveNumber, +activeNUmber);

            cleare();

            inputDigital(res);
            inputOperation(oper);

        } else {
            const oper = type;
            const res = +this.activeNUmber;

            cleare();

            inputDigital(res);
            inputOperation(oper);
        }
    } else {
        if (lastoperation && lastoperation === type) {

            const oper = this.lastoperation;

            const res = executeOpration(lastoperation, prevActiveNumber, +activeNUmber);

            cleare();

            inputDigital(res);
            inputOperation(oper);

        } else {

            if (lastoperation && lastoperation !== type) {

                const oldOp = getOperationStr(lastoperation, + activeNUmber);
                const newOp = getOperationStr(type, + activeNUmber);

                if (isSkeepActiveNumber(type)) {
                    prevLastoperation = lastoperation;
                    lastoperation = type;
                    expressionTxt += `${newOp}`;
                    expression.innerHTML = expressionTxt;

                    const res = executeOpration(type, +activeNUmber, 0);
                    isAfterOperation = true;
                    inputDigital(res);
                    isAfterExecute = true;

                } else {
                    lastoperation = type;
                    expressionTxt = expressionTxt.replace(oldOp, newOp);
                    expression.innerHTML = expressionTxt;
                }

            } else {
                if (isSkeepActiveNumber(type)) {
                    writeExpression(txt);

                    prevActiveNumber = +activeNUmber;
                    lastoperation = type;

                    isAfterOperation = true;

                    executeExpression();
                } else {
                    writeExpression(activeNUmber, txt);

                    prevActiveNumber = +activeNUmber;
                    lastoperation = type;

                    isAfterOperation = true;
                }
            }
        }
    }
}

function inputDigital(digital) {

    if (activeNUmber === '0' && digital === 0)
        return;

    if (activeNUmber === '0' && digital !== 0) {
        activeNUmber = '';
        active.innerHTML = activeNUmber;
    }

    if (this.isAfterExecute) {
        this.cleareAll();
    }

    if (isAfterOperation) {
        activeNUmber = digital;
        isAfterOperation = false;
        active.innerHTML = activeNUmber;
    } else {
        activeNUmber += digital;
        active.innerHTML = activeNUmber;
    }

}

function executeExpression() {
    if (isAfterExecute) {

        isAfterExecute = false;

        const left = + activeNUmber;
        const right = +prevActiveNumber;
        const oper = lastoperation;

        cleare();

        if (isSkeepActiveNumber(oper)) {
            inputDigital(left);
            inputOperation(oper);
        } else {
            inputDigital(left);
            inputOperation(oper);
            inputDigital(right);

            executeExpression();
        }

    } else {
        isAfterExecute = true;

        const res = executeOpration(lastoperation, prevActiveNumber, + activeNUmber);

        if (!isSkeepActiveNumber(lastoperation)) {
            expressionTxt += `${activeNUmber}`;
            expression.innerHTML = expressionTxt;
        }

        prevActiveNumber = +  activeNUmber;
        activeNUmber = res;
        active.innerHTML = activeNUmber;
    }
}

function writeExpression(digital, operation) {
    if (operation) {
        expressionTxt += `${digital}${operation}`;
        expression.innerHTML = expressionTxt;
    }
    else {
        expressionTxt += `${digital}`;
        expression.innerHTML = expressionTxt;
    }
}

function sliceActiveNumb() {
    if (!activeNUmber) return;
    activeNUmber = activeNUmber.slice(0, -1);
    active.innerHTML = activeNUmber;
}

function resetAll() {
    cleareAll();
    activeNUmber = '0';
    active.innerHTML = activeNUmber;
}

function cleareAll() {
    isAfterOperation = false;
    isAfterExecute = false;
    cleare();
}

function cleare() {
    expressionTxt = '';
    expression.innerHTML = expressionTxt;
    activeNUmber = '';
    prevActiveNumber = null;
    lastoperation = null;
}

/*

    Div = 1,
    Mult = 2,
    Sub = 3,
    Add = 4,
    Root = 5,
    Deg = 6

*/

function getOperationStr(type, activeNUmber) {
    switch (type) {
        case 1:
            return ' / ';
        case 2:
            return ' * ';
        case 3:
            return ' - ';
        case 4:
            return ' + ';
        case 5:
            return `sqrt(${activeNUmber})`;
        case 6:
            return `pow(${activeNUmber}, 2)`;
    }
}

function isSkeepActiveNumber(type) {
    switch (type) {
        case 5:
        case 6:
            return true;
        default: return false;
    }
}

function executeOpration(oper, a, b) {
    switch (oper) {
        case 1:
            return a / b;
        case 2:
            return a * b;
        case 3:
            return a - b;
        case 4:
            return a + b;
        case 5:
            return Math.sqrt(a);
        case 6:
            return Math.pow(a, 2);
    }
}