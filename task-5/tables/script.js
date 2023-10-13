var data;
var selectedPacient;

var pacientBody;
var analyzeBody;
var doctorBody;
var medicinesBody;

window.onload = function () {

    pacientBody = document.getElementById('pacient');
    analyzeBody = document.getElementById('analyze');
    doctorBody = document.getElementById('doctor');
    medicinesBody = document.getElementById('medicines');


    const removeMeanalyzeBtn = document.getElementById('removemeAnalyze');
    removeMeanalyzeBtn.addEventListener("click", () => {
        if (!selectedPacient) return;
        selectedPacient.analyzes.shift();
        viewData();
    });

    const removeDoctorBtn = document.getElementById('removeDoctor');
    removeDoctorBtn.addEventListener("click", () => {
        if (!selectedPacient) return;
        selectedPacient.doctors.shift();
        viewData();
    });

    const removeMedicinesBtn = document.getElementById('removeMedicines');
    removeMedicinesBtn.addEventListener("click", () => {
        if (!selectedPacient) return;
        selectedPacient.medicines.shift();
        viewData();
    });

    const removemePacientBtn = document.getElementById('removemePacient');
    removemePacientBtn.addEventListener("click", () => {
        if (data.length == 0) return;
        data.shift();
        viewData();
    });
    const addPacientBtn = document.getElementById('addPacient');
    addPacientBtn.addEventListener("click", () => {
        data.push(getNewpacient());
        viewData();
    });

    const updatePacientBtn = document.getElementById('updatePacient');
    updatePacientBtn.addEventListener("click", () => {
        if (!selectedPacient) return;
        selectedPacient.fName = 'new fNAME'
        selectedPacient.lname = 'new lname'
        viewData();
    });

    const buttonRestore = document.getElementById('restore');
    buttonRestore.addEventListener("click", () => {
        data = getTestData();
        viewData();
    });

    data = getTestData();
    viewData();
};

function viewData() {
    console.log(data);

    if (data.length == 0) {
        pacientBody.innerHTML = '';
        analyzeBody.innerHTML = '';
        doctorBody.innerHTML = '';
        medicinesBody.innerHTML = '';

        return;
    }

    pacientBody.innerHTML = '';

    for (const pacient of data) {

        let row = `<tr> <td>${pacient.fName}</td> <td>${pacient.lname}</td> <td>${pacient.age}</td> </tr>`
        pacientBody.innerHTML += row;
    }

    const rows = pacientBody.getElementsByTagName('tr');
    Array.from(rows).forEach((row, index) => {
        row.addEventListener("click", () => {
            selectedPacient = data[index];
            viewPacientData()
        });
    });

    if (data.length > 0) {
        selectedPacient = data[0];
        viewPacientData();
    }

}

function viewPacientData() {
    if (!selectedPacient) return;

    analyzeBody.innerHTML = '';
    doctorBody.innerHTML = '';
    medicinesBody.innerHTML = '';

    for (const medicine of selectedPacient.medicines) {
        let row = `<tr> <td>${medicine.name}</td> <td>${medicine.dose}</td> </tr>`
        medicinesBody.innerHTML += row;
    }

    for (const doctor of selectedPacient.doctors) {
        let row = `<tr> <td>${doctor.fName}</td> <td>${doctor.lname}</td> <td>${doctor.profile}</td> <td>${doctor.experience}</td> </tr>`
        doctorBody.innerHTML += row;
    }

    for (const analyz of selectedPacient.analyzes) {
        let row = `<tr> <td>${analyz.title}</td> <td>${analyz.value}</td> </tr>`
        analyzeBody.innerHTML += row;
    }
}