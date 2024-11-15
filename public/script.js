// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading');
    setTimeout(() => {
        loader.style.display = 'none';
    }, 1000);
});

// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

// Check for saved dark mode preference
const darkMode = localStorage.getItem('darkMode');
if (darkMode === 'enabled') {
    body.classList.add('dark-mode');
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', null);
    }
});

// Skill Bars Animation
const skillBars = document.querySelectorAll('.skill-per');
const animateSkillBars = () => {
    skillBars.forEach(skill => {
        const percentage = skill.dataset.percentage;
        skill.style.width = percentage + '%';
    });
};

// Intersection Observer for Skill Bars
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

skillBars.forEach(bar => observer.observe(bar));

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
});

// Hover Effects for Cards
document.querySelectorAll('.section').forEach(section => {
    section.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    section.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Dynamic Year in Footer
document.querySelector('.footer p').innerHTML = 
    `© ${new Date().getFullYear()} Weerapol chansawang. All rights reserved.`;

// Typing Animation for Header
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    const typing = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
        }
    }, speed);
};

// Initialize typing animation
const headerTitle = document.querySelector('.glowing-text');
if (headerTitle) {
    typeWriter(headerTitle, headerTitle.textContent);
}

// Parallax Effect
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Form Validation (if you have forms)
const validateForm = (form) => {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
};


// Error Handling
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ', msg, '\nURL: ', url, '\nLine: ', lineNo, '\nColumn: ', columnNo, '\nError object: ', error);
    return false;
};

// Performance Optimization
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// แก้ไข JavaScript สำหรับการย่อขยาย
document.querySelectorAll('.section-header ').forEach((header, index) => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const toggleBtn = header.querySelector('.toggle-btn');
        
        // Toggle active states
        header.classList.toggle('active');
        header.classList.toggle('collapsed');
        toggleBtn.classList.toggle('active');
        
        // Calculate proper height for animation
        const contentHeight = content.scrollHeight;
        
        // Toggle content with smooth animation
        if (content.classList.contains('collapsed')) {
            // Expanding
            content.classList.remove('collapsed');
            content.style.maxHeight = contentHeight + 'px';
            
            // Animate children
            content.querySelectorAll(':scope > *').forEach((child, i) => {
                child.style.animation = `slideDown 0.3s ease-out ${i * 0.1}s forwards`;
            });
        } else {
            // Collapsing
            content.classList.add('collapsed');
            content.style.maxHeight = '0';
            
            // Reset animations
            content.querySelectorAll(':scope > *').forEach(child => {
                child.style.animation = '';
            });
        }
        
        // Save state to localStorage
        localStorage.setItem(`section-${index}`, !content.classList.contains('collapsed'));
    });
});

// Load collapsed state with smooth animation
const loadCollapsedState = () => {
    document.querySelectorAll('.section-content').forEach((content, index) => {
        const isExpanded = localStorage.getItem(`section-${index}`) === 'true';
        const header = content.previousElementSibling;
        const toggleBtn = header.querySelector('.toggle-btn');
        
        if (!isExpanded) {
            content.classList.add('collapsed');
            header.classList.add('collapsed');
            toggleBtn.classList.add('active');
            content.style.maxHeight = '0';
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            
            // Animate children
            content.querySelectorAll(':scope > *').forEach((child, i) => {
                child.style.animation = `slideDown 0.3s ease-out ${i * 0.1}s forwards`;
            });
        }
    });
};

// Initialize with smooth loading
document.addEventListener('DOMContentLoaded', () => {
    // Add initial transition delay
    document.querySelectorAll('.section-content').forEach(content => {
        content.style.transition = 'all 0s';
        setTimeout(() => {
            content.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        }, 100);
    });
    
    loadCollapsedState();
});

// Handle window resize
window.addEventListener('resize', () => {
    document.querySelectorAll('.section-content:not(.collapsed)').forEach(content => {
        content.style.maxHeight = content.scrollHeight + 'px';
    });
});

function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // สุ่มตำแหน่งเริ่มต้น
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        
        // สุ่มขนาด
        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // สุ่มความเร็ว animation
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// เรียกใช้ฟังก์ชันเมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', createParticles);










document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginButton").addEventListener("click", async (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        console.log("Logging in with:", { username, password });

        try {
            const response = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    const jwtToken = data.token;
                    loadTranscript(jwtToken);
                    closeDialog(); // ปิด dialog หลังจากล็อกอินสำเร็จ
                } else {
                    alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
                }
            } else {
                const errorText = await response.text();
                alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ทรานสคริปต์ได้: " + errorText);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("เกิดข้อผิดพลาดระหว่างการล็อกอิน: " + error.message);
        }
    });
});

async function loadTranscript(jwtToken) {
    if (!jwtToken) {
        alert("Token ไม่ถูกต้อง");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/api/transcript", {
            headers: {
                "Authorization": `Bearer ${jwtToken}`,
            },
        });

        if (response.ok) {
            const transcriptData = await response.json();
            displayTranscript(transcriptData);
        } else {
            alert("ไม่สามารถดึงข้อมูลทรานสคริปต์ได้");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("เกิดข้อผิดพลาดในการดึงข้อมูลทรานสคริปต์");
    }
}

function showLoginDialog() {
    const dialog = document.getElementById("loginDialog");
    if (typeof dialog.showModal === "function") {
        dialog.showModal();
    } else {
        alert("Your browser does not support the <dialog> element.");
    }
}

function closeDialog() {
    const dialog = document.getElementById("loginDialog");
    dialog.close();
}



document.getElementById("loginButton").addEventListener("click", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log("Logging in with:", { username, password }); // ตรวจสอบข้อมูลที่ส่ง

    try {
        const response = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                const jwtToken = data.token;
                loadTranscript(jwtToken);
            } else {
                alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
            }
        } else {
            const errorText = await response.text();
            alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ทรานสคริปต์ได้: " + errorText);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("เกิดข้อผิดพลาดระหว่างการล็อกอิน: " + error.message);
    }
});

async function loadTranscript(jwtToken) {
    if (!jwtToken) {
        alert("Token ไม่ถูกต้อง");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/api/transcript", {
            headers: {
                "Authorization": `Bearer ${jwtToken}`,
            },
        });

        if (response.ok) {
            const transcriptData = await response.json();
            displayTranscript(transcriptData);
        } else {
            alert("ไม่สามารถดึงข้อมูลทรานสคริปต์ได้");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("เกิดข้อผิดพลาดในการดึงข้อมูลทรานสคริปต์");
    }
}

document.getElementById("loginButton").addEventListener("click", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log("Logging in with:", { username, password });

    try {
        const response = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                const jwtToken = data.token;
                loadTranscript(jwtToken);
            } else {
                alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
            }
        } else {
            const errorText = await response.text();
            alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ทรานสคริปต์ได้: " + errorText);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("เกิดข้อผิดพลาดระหว่างการล็อกอิน: " + error.message);
    }
});

async function loadTranscript(jwtToken) {
    if (!jwtToken) {
        alert("Token ไม่ถูกต้อง");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/api/transcript", {
            headers: {
                "Authorization": `Bearer ${jwtToken}`,
            },
        });

        if (response.ok) {
            const transcriptData = await response.json();
            displayTranscript(transcriptData);
        } else {
            alert("ไม่สามารถดึงข้อมูลทรานสคริปต์ได้");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("เกิดข้อผิดพลาดในการดึงข้อมูลทรานสคริปต์");
    }
}




function calculateTranscriptData(item) {
    const gradePoints = calculateGradePoints(item.grade);
    const CA = parseFloat(item.credits); // จำนวนหน่วยกิตที่ลงทะเบียน
    const GX = gradePoints * CA; // เกรดคูณหน่วยกิต
    const CP = item.grade !== 'F' ? CA : 0; // หน่วยกิตที่ผ่าน (ถ้าไม่ใช่ F)

    return { CA, GX, CP };
}

function appendSemesterSummary(container, summary, cumulative, year, semester) {
    // Update cumulative values
    cumulative.CA += summary.CA;
    cumulative.GX += summary.GX;
    cumulative.CP += summary.CP;

    // Calculate semester GPA and cumulative GPA
    const semesterGPA = summary.GX / summary.CA;
    const cumulativeGPA = cumulative.GX / cumulative.CA;

    // Create summary div with detailed formatting
    const summaryDiv = document.createElement("div");
    summaryDiv.classList.add("semester-summary");
    summaryDiv.innerHTML = `
        <div>CA (Credits Attempt): ${summary.CA}</div>
        <div>CP (Credits Pass): ${summary.CP}</div>
        <div>GX (Grade x): ${summary.GX.toFixed(2)}</div>
        <div>CCX (Cumulative Credits x): ${cumulative.GX.toFixed(2)}</div>
        <div>CCP (Cumulative Credits Pass): ${cumulative.CP}</div>
        <div>CCA (Cumulative Credits Attempt): ${cumulative.CA}</div>
        <div>GPS (Grade Point Average of Semester): ${semesterGPA.toFixed(2)}</div>
        <div>GPA (Cumulative Grade Point Average): ${cumulativeGPA.toFixed(2)}</div>
    `;
    container.appendChild(summaryDiv);
}

function calculateGradePoints(grade) {
    const gradeMapping = {
        'A': 4.0,
        'B+': 3.5,
        'B': 3.0,
        'C+': 2.5,
        'C': 2.0,
        'D+': 1.5,
        'D': 1.0,
        'F': 0.0
    };
    return gradeMapping[grade] || 0.0;
}

function calculateDynamicGPA(transcriptData) {
    const favorites = JSON.parse(localStorage.getItem('favoritesCourses') || '[]');
    let totalGradePoints = 0;
    let totalCredits = 0;

    transcriptData.forEach(item => {
        if (favorites.includes(item.course_code)) {
            const gradePoints = calculateGradePoints(item.grade);
            const credits = parseFloat(item.credits);

            totalGradePoints += gradePoints * credits;
            totalCredits += credits;
        }
    });

    const gpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : '0.00';
    
}

function saveOriginalOrder(order) {
    localStorage.setItem('originalOrder', JSON.stringify(order));
}
function displayTranscript(transcriptData) {
    const transcriptContainer = document.getElementById("transcriptContainer");
    transcriptContainer.innerHTML = '';
    transcriptContainer.classList.add('transcript-container');

    // Create a div for header control with toggle switch and label
    const headerControl = document.createElement('div');
    headerControl.classList.add('header-control');
    
    // Create the switch for fold/unfold
    const controlSwitchDiv = document.createElement('div');
    controlSwitchDiv.classList.add('form-check', 'form-switch');
    
    const controlSwitch = document.createElement('input');
    controlSwitch.classList.add('form-check-input');
    controlSwitch.setAttribute('type', 'checkbox');
    controlSwitch.id = 'foldSwitch';

    const controlLabel = document.createElement('label');
    controlLabel.classList.add('form-check-label');
    controlLabel.setAttribute('for', 'foldSwitch');
    controlLabel.innerText = 'Show All';

    controlSwitchDiv.appendChild(controlSwitch);
    controlSwitchDiv.appendChild(controlLabel);
    headerControl.appendChild(controlSwitchDiv);
    transcriptContainer.appendChild(headerControl);

    let currentYear = '';
    let currentSemester = '';
    let table;
    let semesterSummary = { CA: 0, GX: 0, CP: 0 };
    let cumulativeSummary = { CA: 0, GX: 0, CP: 0 };
    let favorites = JSON.parse(localStorage.getItem('favoritesCourses') || '[]');
    let originalOrder = transcriptData.map(item => item.course_code);
    let runningCount = 1;

    // Event listener for the switch
    controlSwitch.addEventListener('change', () => {
        const allRows = document.querySelectorAll('.transcript-table tbody tr');
        const isFoldAll = controlSwitch.checked;

        allRows.forEach(row => {
            const courseCode = row.querySelector('[data-course-code]').dataset.courseCode;
            if (!favorites.includes(courseCode)) {
                row.classList.toggle('hidden', isFoldAll);
            }
        });

        controlLabel.textContent = isFoldAll ? 'Fold All' : 'Show All';
    });

    transcriptData.forEach((item) => {
        if (item.year !== currentYear || item.semester !== currentSemester) {
            if (currentYear && currentSemester) {
                appendSemesterSummary(transcriptContainer, semesterSummary, cumulativeSummary, currentYear, currentSemester);
            }

            currentYear = item.year;
            currentSemester = item.semester;
            semesterSummary = { CA: 0, GX: 0, CP: 0 };

            // Create and add the semester header
            const semesterHeader = document.createElement("div");
            semesterHeader.classList.add("section-header");
            semesterHeader.innerText = `Semester ${currentSemester} / Year ${currentYear}`;
            transcriptContainer.appendChild(semesterHeader);

            table = document.createElement("table");
            table.classList.add("transcript-table");
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Star</th>
                        <th>No</th>
                        <th>Course Code</th>
                        <th>Course Title</th>
                        <th>Credits</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody></tbody>
            `;
            transcriptContainer.appendChild(table);
        }

        const { CA, GX, CP } = calculateTranscriptData(item);
        semesterSummary.CA += CA;
        semesterSummary.GX += GX;
        semesterSummary.CP += CP;

        const tbody = table.querySelector("tbody");
        const row = document.createElement("tr");
        const isFavorite = favorites.includes(item.course_code);

        row.innerHTML = `
            <td>
                <button class="favorite-button ${isFavorite ? 'active' : ''}" data-course-code="${item.course_code}">
                    ${isFavorite ? "★" : "☆"}
                </button>
            </td>
            <td class="row-number">${runningCount++}</td>
            <td data-course-code="${item.course_code}">${item.course_code}</td>
            <td>${item.course_title}</td>
            <td>${item.credits}</td>
            <td>${item.grade}</td>
        `;

        if (isFavorite) {
            row.classList.add('favorite-row');
        }
        tbody.appendChild(row);

        const favoriteButton = row.querySelector('.favorite-button');
        favoriteButton.addEventListener('click', () => {
            toggleFavorite(item.course_code, favorites, favoriteButton, row, tbody, originalOrder);
            sortTablesByFavorites();
            updateGlobalRowNumbers();
            calculateDynamicGPA(transcriptData); // Recalculate GPA after each toggle
        });
    });

    appendSemesterSummary(transcriptContainer, semesterSummary, cumulativeSummary, currentYear, currentSemester);
    sortTablesByFavorites();
    calculateDynamicGPA(transcriptData); // Calculate GPA on initial load
}

// Function to update row numbers across all tables globally
function updateGlobalRowNumbers() {
    const allTables = document.querySelectorAll('.transcript-table tbody');
    let globalCount = 1;

    allTables.forEach(tbody => {
        Array.from(tbody.querySelectorAll('.row-number')).forEach(cell => {
            cell.textContent = globalCount++;
        });
    });
}

function toggleFavorite(courseCode, favorites, button, row, tbody, originalOrder) {
    const index = favorites.indexOf(courseCode);

    if (index === -1) {
        favorites.push(courseCode);
        button.classList.add('active');
        button.textContent = "★";
        row.classList.add('favorite-row');
    } else {
        favorites.splice(index, 1);
        button.classList.remove('active');
        button.textContent = "☆";
        row.classList.remove('favorite-row');
    }

    localStorage.setItem('favoritesCourses', JSON.stringify(favorites));
}


// Function to sort tables by favorites and update global row numbers
function sortTablesByFavorites() {
    const allTables = document.querySelectorAll('.transcript-table tbody');
    const favorites = JSON.parse(localStorage.getItem('favoritesCourses') || '[]');
    const originalOrder = getOriginalOrder();

    allTables.forEach(tbody => {
        const rows = Array.from(tbody.querySelectorAll('tr'));
        rows.sort((a, b) => {
            const aCode = a.querySelector('[data-course-code]').dataset.courseCode;
            const bCode = b.querySelector('[data-course-code]').dataset.courseCode;

            const aIsFav = favorites.includes(aCode);
            const bIsFav = favorites.includes(bCode);

            if (aIsFav && bIsFav) {
                // Sort favorites based on their original order
                return originalOrder.indexOf(aCode) - originalOrder.indexOf(bCode);
            }
            if (aIsFav) return -1; // Move favorite to the top
            if (bIsFav) return 1;  // Move non-favorite to the bottom
            return originalOrder.indexOf(aCode) - originalOrder.indexOf(bCode); // Default order for non-favorites
        });

        // Re-append rows in sorted order
        rows.forEach(r => tbody.appendChild(r));
    });

    updateGlobalRowNumbers(); // Update row numbers after sorting
}

function getOriginalOrder() {
    return JSON.parse(localStorage.getItem('originalOrder') || '[]');
}

