// ====== PREDEFINED 10 STAFF DATA WITH DIFFERENT TIMETABLES ======

const staffData = {
    "S101": {
        name: "Akash",
        timetable: [
            ["Math","Physics","Free","Chem","Lab","Eng"],
            ["Physics","Math","Chem","Free","Eng","Lab"],
            ["Chem","Free","Math","Physics","Lab","Eng"],
            ["Math","Chem","Physics","Free","Lab","Eng"],
            ["Physics","Math","Free","Chem","Lab","Eng"]
        ]
    },
    "S102": {
        name: "Ravi",
        timetable: [
            ["CS","Free","AI","ML","Lab","Math"],
            ["AI","CS","ML","Free","Math","Lab"],
            ["ML","Math","CS","AI","Lab","Free"],
            ["CS","AI","Free","ML","Lab","Math"],
            ["AI","ML","CS","Free","Math","Lab"]
        ]
    },
    "S103": {
        name: "Priya",
        timetable: [
            ["Eng","History","Free","Geo","Eco","Tamil"],
            ["Geo","Eng","Eco","Free","Tamil","History"],
            ["Eco","Free","Eng","Geo","History","Tamil"],
            ["Eng","Geo","History","Free","Tamil","Eco"],
            ["Geo","Eng","Free","Eco","History","Tamil"]
        ]
    },
    "S104": {
        name: "Yohitha",
        timetable: [
            ["Bio","Chem","Free","Physics","Lab","Math"],
            ["Physics","Bio","Chem","Free","Math","Lab"],
            ["Chem","Free","Bio","Physics","Lab","Math"],
            ["Bio","Physics","Free","Chem","Lab","Math"],
            ["Physics","Bio","Chem","Free","Lab","Math"]
        ]
    },
    "S105": {
        name: "Meena",
        timetable: [
            ["Tamil","Eng","Free","History","Geo","Eco"],
            ["History","Tamil","Geo","Free","Eco","Eng"],
            ["Geo","Free","Tamil","History","Eng","Eco"],
            ["Tamil","Geo","History","Free","Eco","Eng"],
            ["History","Tamil","Free","Geo","Eng","Eco"]
        ]
    },
    "S106": {
        name: "Arun",
        timetable: [
            ["AI","ML","Free","DS","Lab","Math"],
            ["DS","AI","ML","Free","Math","Lab"],
            ["ML","Free","AI","DS","Lab","Math"],
            ["AI","DS","Free","ML","Lab","Math"],
            ["DS","AI","ML","Free","Lab","Math"]
        ]
    },
    "S107": {
        name: "Divya",
        timetable: [
            ["Physics","Math","Free","Chem","Lab","CS"],
            ["Chem","Physics","Math","Free","CS","Lab"],
            ["Math","Free","Physics","Chem","Lab","CS"],
            ["Physics","Chem","Free","Math","Lab","CS"],
            ["Chem","Physics","Free","Math","Lab","CS"]
        ]
    },
    "S108": {
        name: "Vikram",
        timetable: [
            ["Accounts","Eco","Free","Stats","Bank","Math"],
            ["Stats","Accounts","Eco","Free","Math","Bank"],
            ["Eco","Free","Accounts","Stats","Bank","Math"],
            ["Accounts","Stats","Free","Eco","Bank","Math"],
            ["Stats","Accounts","Free","Eco","Bank","Math"]
        ]
    },
    "S109": {
        name: "Nisha",
        timetable: [
            ["Bio","Free","Chem","Physics","Lab","Math"],
            ["Chem","Bio","Physics","Free","Math","Lab"],
            ["Physics","Free","Bio","Chem","Lab","Math"],
            ["Bio","Physics","Free","Chem","Lab","Math"],
            ["Chem","Bio","Free","Physics","Lab","Math"]
        ]
    },
    "S110": {
        name: "Surya",
        timetable: [
            ["Law","Free","PolSci","History","Eco","Tamil"],
            ["PolSci","Law","History","Free","Tamil","Eco"],
            ["History","Free","Law","PolSci","Eco","Tamil"],
            ["Law","History","Free","PolSci","Eco","Tamil"],
            ["PolSci","Law","Free","History","Eco","Tamil"]
        ]
    }
};

let leaveRecords = JSON.parse(localStorage.getItem("leaveData")) || [];


// ===== LOGIN FUNCTION =====

function login(){
    let role = document.getElementById("role").value;
    let id = document.getElementById("staffID").value;
    let name = document.getElementById("staffName").value;
    let date = document.getElementById("leaveDate").value;

    if(role=="staff"){

        if(!staffData[id] || staffData[id].name !== name){
            alert("Invalid Staff ID or Name");
            return;
        }

        if(date==""){
            alert("Select Leave Date");
            return;
        }

        document.getElementById("loginPage").classList.add("hidden");
        document.getElementById("staffPage").classList.remove("hidden");
        document.getElementById("nameDisplay").innerText=name;

        generateTimetable(staffData[id].timetable);
    }

    if(role=="admin"){
        if(id=="admin" && name=="admin"){
            document.getElementById("loginPage").classList.add("hidden");
            document.getElementById("adminPage").classList.remove("hidden");
            showRecords();
        }else{
            alert("Admin login → ID: admin | Name: admin");
        }
    }
}


// ===== GENERATE TIMETABLE DYNAMICALLY =====

function generateTimetable(data){
    let table = document.getElementById("timetable");

    let days=["Monday","Tuesday","Wednesday","Thursday","Friday"];

    table.innerHTML="<tr><th>Day</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr>";

    for(let i=0;i<5;i++){
        let row="<tr><td>"+days[i]+"</td>";
        for(let j=0;j<6;j++){
            row+="<td>"+data[i][j]+"</td>";
        }
        row+="</tr>";
        table.innerHTML+=row;
    }
}


// ===== APPLY LEAVE =====

function applyLeave(){
    let type = document.getElementById("leaveType").value;
    let hour = document.getElementById("hourSelect").value;
    let id = document.getElementById("staffID").value;
    let name = document.getElementById("staffName").value;
    let date = document.getElementById("leaveDate").value;

    if(type=="hour" && hour==""){
        alert("Select Hour");
        return;
    }

    leaveRecords.push({
        id:id,
        name:name,
        date:date,
        type:type,
        hour: type=="day" ? "Full Day" : hour
    });

    localStorage.setItem("leaveData", JSON.stringify(leaveRecords));

    document.getElementById("msg").innerText="Leave Applied Successfully ✅";
}


// ===== ADMIN RECORDS =====

function showRecords(){
    leaveRecords = JSON.parse(localStorage.getItem("leaveData")) || [];

    let table=document.getElementById("leaveTable");
    table.innerHTML="<tr><th>Staff ID</th><th>Name</th><th>Date</th><th>Leave Type</th><th>Hour</th></tr>";

    leaveRecords.forEach(r=>{
        table.innerHTML += `<tr>
        <td>${r.id}</td>
        <td>${r.name}</td>
        <td>${r.date}</td>
        <td>${r.type}</td>
        <td>${r.hour}</td>
        </tr>`;
    });
}


// ===== DOWNLOAD CSV =====

function download(){
    leaveRecords = JSON.parse(localStorage.getItem("leaveData")) || [];

    if(leaveRecords.length==0){
        alert("No records available!");
        return;
    }

    let csv="Staff ID,Name,Date,Leave Type,Hour\n";
    leaveRecords.forEach(r=>{
        csv+=`${r.id},${r.name},${r.date},${r.type},${r.hour}\n`;
    });

    let blob=new Blob([csv],{type:"text/csv"});
    let a=document.createElement("a");
    a.href=URL.createObjectURL(blob);
    a.download="LeaveRecords.csv";
    a.click();
}

function logout(){
    location.reload();
}