// Initialize jsPDF
const { jsPDF } = window.jspdf;

// Declare teams as a global variable
let teams = [];

// Fetch student data from JSON file
let students = [];
fetch("students.json")
  .then(response => response.json())
  .then(data => {
    students = data;
    document.getElementById("generate-teams").disabled = false;
  })
  .catch(error => console.error("Error loading student data:", error));

document.getElementById("generate-teams").addEventListener("click", () => {
  teams = generateTeams(students); // Assign generated teams to the global variable
  renderTeams(teams);
});

document.getElementById("sort-teams").addEventListener("click", () => {
  sortTeamsByScore();
});


document.getElementById("export-csv").addEventListener("click", () => {
  exportTeamsToCSV();
});

document.getElementById("export-pdf").addEventListener("click", () => {
  exportTeamsToPDF();
});

function generateTeams(students) {
  const teams = [];
  const leaders = students.slice(0, 18); // First 18 as leaders
  const members = students.slice(18); // Remaining 48 students

  for (let i = 0; i < 17; i++) {
    const team = {
      leader: leaders[i],
      members: []
    };
    teams.push(team);
  }

  // Distribute members in round-robin fashion
  members.forEach((student, index) => {
    const teamIndex = index % 17;
    teams[teamIndex].members.push(student);
  });

  return teams;
}

function renderTeams(teams) {
  const container = document.getElementById("teams-container");
  container.innerHTML = "";

  teams.forEach((team, teamIndex) => {
    const teamDiv = document.createElement("div");
    teamDiv.className = "team";
    teamDiv.innerHTML = `<h3>Team ${teamIndex + 1}</h3>`;

    // Add leader
    const leaderDiv = createStudentDiv(team.leader, true);
    teamDiv.appendChild(leaderDiv);

    // Add members
    team.members.forEach(member => {
      const memberDiv = createStudentDiv(member);
      teamDiv.appendChild(memberDiv);
    });

    container.appendChild(teamDiv);
  });

  enableDragAndDrop();
}

function createStudentDiv(student, isLeader = false) {
  const studentDiv = document.createElement("div");
  studentDiv.className = "student";
  studentDiv.draggable = true;
  studentDiv.innerHTML = `
    <img src="${student.photo}" alt="${student.name}">
    <div class="name">${student.name} ${isLeader ? "(Leader)" : ""}</div>
    <div class="score">Score: ${student.score}</div>
  `;
  return studentDiv;
}

function enableDragAndDrop() {
  const students = document.querySelectorAll(".student");
  students.forEach(student => {
    student.addEventListener("dragstart", dragStart);
    student.addEventListener("dragend", dragEnd);
  });

  const teams = document.querySelectorAll(".team");
  teams.forEach(team => {
    team.addEventListener("dragover", dragOver);
    team.addEventListener("drop", drop);
  });
}

function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.innerHTML);
  e.target.classList.add("dragging");
}

function dragEnd(e) {
  e.target.classList.remove("dragging");
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData("text/plain");
  const newStudent = document.createElement("div");
  newStudent.className = "student";
  newStudent.innerHTML = data;
  newStudent.draggable = true;
  e.target.appendChild(newStudent);
}

function sortTeamsByScore() {
  const teamsContainer = document.getElementById("teams-container");
  const teamDivs = Array.from(teamsContainer.children);

  teamDivs.sort((a, b) => {
    const scoreA = calculateTeamScore(a);
    const scoreB = calculateTeamScore(b);
    return scoreB - scoreA;
  });

  teamsContainer.innerHTML = "";
  teamDivs.forEach(team => teamsContainer.appendChild(team));
}

function calculateTeamScore(teamDiv) {
  const students = teamDiv.querySelectorAll(".student");
  let totalScore = 0;
  students.forEach(student => {
    const scoreText = student.textContent.match(/Score: (\d+)/);
    if (scoreText) {
      totalScore += parseInt(scoreText[1], 10);
    }
  });
  return totalScore;
}

function electLeaders() {
  teams.forEach(team => {
    const allMembers = [team.leader, ...team.members];
    const newLeader = allMembers.sort((a, b) => b.score - a.score)[0];
    team.leader = newLeader;
    team.members = allMembers.filter(member => member !== newLeader);
  });
  renderTeams(teams);
}

function exportTeamsToCSV() {
  let csvContent = "data:text/csv;charset=utf-8,";
  teams.forEach((team, index) => {
    csvContent += `Team ${index + 1}\n`;
    csvContent += `Leader,${team.leader.name},${team.leader.score}\n`;
    team.members.forEach(member => {
      csvContent += `Member,${member.name},${member.score}\n`;
    });
    csvContent += "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "teams.csv");
  document.body.appendChild(link);
  link.click();
}

function exportTeamsToPDF() {
  const doc = new jsPDF();

  teams.forEach((team, teamIndex) => {
    // Add team heading
    doc.setFontSize(16);
    doc.text(`Team ${teamIndex + 1}`, 10, 20);

    // Add leader
    doc.setFontSize(12);
    doc.text(`Leader: ${team.leader.name} (Score: ${team.leader.score})`, 10, 30);

    // Add members
    let yOffset = 40;
    team.members.forEach((member, memberIndex) => {
      doc.text(`Member ${memberIndex + 1}: ${member.name} (Score: ${member.score})`, 10, yOffset);
      yOffset += 10;
    });

    // Add a new page for the next team (except the last team)
    if (teamIndex < teams.length - 1) {
      doc.addPage();
    }
  });

  // Save the PDF
  doc.save("teams.pdf");
}