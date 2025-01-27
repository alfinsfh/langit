// Load siswa data from JSON file
async function loadStudents() {
    const response = await fetch('siswa.json');
    const students = await response.json();
    return students;
}

// Calculate average score per semester
function calculateAverageScore(semester) {
    const totalScore = semester.subjects.reduce((acc, subject) => acc + subject.score, 0);
    const averageScore = totalScore / semester.subjects.length;
    return averageScore.toFixed(2); // Format to 2 decimal places
}

// Display student scores and averages
async function displayStudentScores() {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('id');
    const students = await loadStudents();
    const student = students.find(student => student.id == studentId);

    if (student) {
        const scoresContent = `
            <h1>${student.name}'s Semester Scores</h1>
            <div>
                ${student.semester_scores.map(semester => `
                    <h3>${semester.semester}</h3>
                    <ul>
                        ${semester.subjects.map(subject => `
                            <li>${subject.name}: ${subject.score}</li>
                        `).join('')}
                    </ul>
                    <p><strong>Average Score:</strong> ${calculateAverageScore(semester)} </p>
                `).join('')}
            </div>
        `;

        // Insert scores content dynamically
        document.getElementById('scoresContent').innerHTML = scoresContent;
    }
}

// Run when one page loads
if (window.location.pathname.includes('one.html')) {
    displayStudentScores();
}
