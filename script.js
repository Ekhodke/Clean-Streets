const state = {
    currentPage: 'home',
    processedPhoto: '',
    currentFormStep: 1
};

const issueData = [
    {
        id: 'plastic-waste-1',
        type: 'plastic_waste',
        label: 'Plastic Waste',
        title: 'Plastic waste near riverbank',
        location: 'Lakeview Road, Ward 4',
        status: 'Volunteer Needed',
        urgency: 'High'
    },
    {
        id: 'dirt-roadside-1',
        type: 'dirt_roadside',
        label: 'Dirt on Roadside',
        title: 'Roadside dumping at Main Junction',
        location: 'Sunrise Avenue, Ward 7',
        status: 'Community Response',
        urgency: 'Medium'
    },
    {
        id: 'park-cleanup-1',
        type: 'park_cleanup',
        label: 'Park Cleanup',
        title: 'Park litter and broken benches',
        location: 'Greenwood Park, Ward 2',
        status: 'Volunteer Needed',
        urgency: 'High'
    },
    {
        id: 'pothole-1',
        type: 'pothole',
        label: 'Pothole',
        title: 'Large pothole outside school gate',
        location: 'North Street, Ward 3',
        status: 'Municipal Action',
        urgency: 'Critical'
    },
    {
        id: 'dark-street-1',
        type: 'dark_street',
        label: 'Dark Street',
        title: 'Unlit road section near community center',
        location: 'Riverside Lane, Ward 5',
        status: 'Municipal Action',
        urgency: 'Critical'
    },
    {
        id: 'drainage-1',
        type: 'drainage',
        label: 'Drainage Fault',
        title: 'Blocked drainage after rainfall',
        location: 'Cedar District, Ward 6',
        status: 'Municipal Action',
        urgency: 'High'
    }
];

const productData = [
    {
        id: 1,
        name: 'Eco Grabber Tool',
        category: 'grabbers',
        description: 'Long-reach tool for roadside cleanup and safe litter collection.',
        price: '₹599',
        icon: '🧤',
        rentable: true
    },
    {
        id: 2,
        name: 'Safety Gloves Kit',
        category: 'protection',
        description: 'Heavy-duty gloves for safe manual vegetation and debris cleanup.',
        price: '₹349',
        icon: '🧤',
        rentable: true
    },
    {
        id: 3,
        name: 'Waste Collection Bags',
        category: 'containers',
        description: 'High-strength trash bags for small and medium cleanup drives.',
        price: '₹199',
        icon: '🛍️',
        rentable: true
    },
    {
        id: 4,
        name: 'Street Sweeper Brush',
        category: 'cleaning',
        description: 'Efficient manual brush for cleaning sidewalks and small public spaces.',
        price: '₹799',
        icon: '🧽',
        rentable: true
    },
    {
        id: 5,
        name: 'Reflective Safety Vest',
        category: 'protection',
        description: 'Visible, lightweight vest for early morning and night cleanups.',
        price: '₹450',
        icon: '🦺',
        rentable: true
    },
    {
        id: 6,
        name: 'Portable Waste Bin',
        category: 'containers',
        description: 'Portable bin for separating recyclables from general waste.',
        price: '₹999',
        icon: '🗑️',
        rentable: true
    }
];

const innovationIdeas = [
    {
        title: 'Solar-Powered Waste Compactor',
        category: 'Technology',
        description: 'A compact solar-powered unit that compresses waste in public hotspots to reduce overflow and collection frequency.',
        creator: 'Aarav Mehta'
    },
    {
        title: 'Community Sweep Reward System',
        category: 'Community Engagement',
        description: 'A game-inspired token system that rewards residents for cleaning their streets and reporting issues.',
        creator: 'Sana Nair'
    },
    {
        title: 'AI Drain Monitors',
        category: 'Technology',
        description: 'Low-cost AI-enabled drainage sensors that detect performance issues and send alerts before blockages occur.',
        creator: 'Rohan Iyer'
    }
];

const leaderboardData = [
    { rank: 1, innovation: 'Solar-Powered Waste Compactor', creator: 'Aarav Mehta', votes: 245, status: 'Funded' },
    { rank: 2, innovation: 'Community Sweep Reward System', creator: 'Sana Nair', votes: 198, status: 'Reviewing' },
    { rank: 3, innovation: 'AI Drain Monitors', creator: 'Rohan Iyer', votes: 162, status: 'Prototype' }
];

const profileData = {
    reports: 12,
    cleanups: 8,
    hours: 24,
    badges: 5,
    badgesList: [
        { name: 'First Report', icon: '🏅' },
        { name: 'Cleanup Hero', icon: '🧹' },
        { name: 'Waste Warden', icon: '♻️' },
        { name: 'Volunteer', icon: '🤝' },
        { name: 'Truth Taker', icon: '✅' }
    ],
    activity: [
        { time: 'Today', text: 'Submitted a community cleanup report for riverbank litter.' },
        { time: '2 days ago', text: 'Participated in a roadside plastic debris collection drive.' },
        { time: 'This week', text: 'Verified 3 local issues and confirmed cleanup progress.' }
    ]
};

function initApp() {
    showPage('home');
    bindPageControls();
    bindFormEvents();
    renderExplore();
    renderProducts();
    renderIdeas();
    renderLeaderboard();
    renderProfile();
    setCurrentMapLocation('North Avenue, Ward 3');
}

function bindPageControls() {
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.textContent.toLowerCase().includes('submit') ? 'submit-idea'
                : button.textContent.toLowerCase().includes('browse') ? 'browse-ideas'
                : button.textContent.toLowerCase().includes('leaderboard') ? 'leaderboard'
                : null;

            if (tabId) {
                switchTab(tabId);
            }
        });
    });

    document.querySelectorAll('.learn-tabs .tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.textContent.toLowerCase().includes('waste') ? 'waste'
                : button.textContent.toLowerCase().includes('cleanup') ? 'cleanup'
                : button.textContent.toLowerCase().includes('hazard') ? 'hazards'
                : 'waste';
            switchLearnTab(id);
        });
    });
}

function bindFormEvents() {
    const issueTypeRadios = document.querySelectorAll('input[name="issueType"]');
    issueTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const container = document.getElementById('otherIssueContainer');
            if (this.value === 'other') {
                container.classList.remove('hidden');
            } else {
                container.classList.add('hidden');
            }
        });
    });

    document.getElementById('reportForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const truthChecked = document.getElementById('truthCheckbox');
        const legalChecked = document.getElementById('acceptLegalCheckbox');

        if (!truthChecked.checked) {
            alert('Please confirm the issue is real and truthful before submitting.');
            return;
        }

        if (!legalChecked.checked) {
            alert('Please accept the privacy and legal terms before continuing.');
            return;
        }

        const issueSelection = document.querySelector('input[name="issueType"]:checked');
        const reportChannel = document.querySelector('input[name="reportChannel"]:checked');

        if (!issueSelection) {
            alert('Please select an issue category.');
            return;
        }

        if (!document.getElementById('coordinates').value.trim()) {
            alert('Issue location is required.');
            return;
        }

        if (!reportChannel) {
            alert('Please choose whether the issue should be routed to volunteers or government authorities.');
            return;
        }

        alert('Report submitted successfully. It has been routed anonymously with the appropriate civic response route.');
        this.reset();
        document.getElementById('photoPreview').classList.add('hidden');
        state.processedPhoto = '';
        state.currentFormStep = 1;
        showFormStep(1);
        document.getElementById('otherIssueContainer').classList.add('hidden');
        if (document.getElementById('acceptLegalCheckbox')) {
            document.getElementById('acceptLegalCheckbox').checked = false;
        }
        if (document.getElementById('truthCheckbox')) {
            document.getElementById('truthCheckbox').checked = false;
        }
        if (document.getElementById('waiverCheckbox')) {
            document.getElementById('waiverCheckbox').checked = false;
        }
        showPage('home');
    });
}

function showPage(pageId) {
    state.currentPage = pageId;
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    const currentPage = document.getElementById(pageId);
    if (currentPage) {
        currentPage.classList.add('active');
    }
}

function showFormStep(stepNumber) {
    const steps = ['step-1', 'step-2', 'step-3', 'step-4', 'step-5-volunteer', 'step-6'];

    steps.forEach(stepId => {
        const element = document.getElementById(stepId);
        if (element) {
            element.classList.remove('active');
            element.style.display = 'none';
        }
    });

    const targetId = stepNumber === 5 ? 'step-5-volunteer' : `step-${stepNumber}`;
    const target = document.getElementById(targetId);
    if (target) {
        target.classList.add('active');
        target.style.display = 'block';
    }
}

function nextStep(currentStep) {
    const stepToValidate = currentStep;

    if (stepToValidate === 1) {
        const selectedIssue = document.querySelector('input[name="issueType"]:checked');
        if (!selectedIssue) {
            alert('Please choose the type of issue you are reporting.');
            return;
        }
    }

    if (stepToValidate === 2) {
        const coords = document.getElementById('coordinates').value.trim();
        if (!coords) {
            alert('Issue location is required to route the report correctly.');
            return;
        }
    }

    if (stepToValidate === 4) {
        const selectedChannel = document.querySelector('input[name="reportChannel"]:checked');
        if (!selectedChannel) {
            alert('Please choose whether this is a volunteer or government report.');
            return;
        }
    }

    if (stepToValidate === 4 && document.querySelector('input[name="reportChannel"]:checked')?.value === 'volunteer') {
        showFormStep(5);
        return;
    }

    const nextStepNumber = currentStep + 1;
    if (currentStep === 5) {
        showFormStep(6);
        return;
    }

    showFormStep(nextStepNumber);
}

function prevStep(currentStep) {
    if (currentStep === 1) {
        showPage('home');
        return;
    }

    if (currentStep === 5) {
        showFormStep(4);
        return;
    }

    if (currentStep === 6) {
        const selectedChannel = document.querySelector('input[name="reportChannel"]:checked');
        if (selectedChannel && selectedChannel.value === 'volunteer') {
            showFormStep(5);
            return;
        }
        showFormStep(4);
        return;
    }

    showFormStep(currentStep - 1);
}

function captureLocation() {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported in this browser. Please enter coordinates manually.');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const coords = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
            document.getElementById('coordinates').value = coords;
            document.getElementById('wardName').value = inferWard(latitude, longitude);
            setCurrentMapLocation(inferWard(latitude, longitude));
        },
        () => {
            alert('Unable to access your current location. Please enter the location manually.');
        }
    );
}

function inferWard(latitude, longitude) {
    if (latitude > 12.99 && longitude < 77.59) return 'North Ward';
    if (latitude < 12.98 && longitude > 77.58) return 'South Ward';
    if (latitude > 12.95 && longitude > 77.61) return 'East Ward';
    return 'Central Ward';
}

function setCurrentMapLocation(locationLabel) {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        mapElement.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-map-marked-alt" style="font-size: 3rem; color: var(--primary-green); margin-bottom: 1rem;"></i>
                <p><strong>Detected Area:</strong> ${locationLabel}</p>
                <small>Location data is required for accurate issue routing.</small>
            </div>
        `;
    }
}

function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            const processedImage = canvas.toDataURL('image/jpeg', 0.9);
            state.processedPhoto = processedImage;

            const preview = document.getElementById('previewImage');
            preview.src = processedImage;
            document.getElementById('photoPreview').classList.remove('hidden');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function removePhoto() {
    state.processedPhoto = '';
    document.getElementById('previewImage').src = '';
    document.getElementById('photoPreview').classList.add('hidden');
    document.getElementById('photoInput').value = '';
}

function showLegalPage() {
    document.getElementById('legalModal').classList.remove('hidden');
}

function closeLegalPage() {
    document.getElementById('legalModal').classList.add('hidden');
}

function acceptLegalTerms() {
    document.getElementById('acceptLegalCheckbox').checked = true;
    closeLegalPage();
}

function renderExplore() {
    const filterValue = document.getElementById('issueFilter')?.value || '';
    const filteredIssues = filterValue
        ? issueData.filter(issue => issue.type === filterValue)
        : issueData;

    const listContainer = document.getElementById('issuesList');
    listContainer.innerHTML = filteredIssues.map(issue => `
        <div class="issue-item" data-type="${issue.type}">
            <div class="issue-item-type">${issue.label}</div>
            <div class="issue-item-title">${issue.title}</div>
            <div class="issue-item-location">📍 ${issue.location}</div>
            <div class="issue-item-status">${issue.status}</div>
        </div>
    `).join('');
}

function filterIssues() {
    renderExplore();
}

function renderProducts() {
    const productSearch = document.getElementById('productSearch')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';

    const filteredProducts = productData.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(productSearch) || product.description.toLowerCase().includes(productSearch);
        const matchesCategory = !categoryFilter || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const container = document.getElementById('productsGrid');
    container.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">${product.icon}</div>
            <div class="product-content">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">${product.price}</div>
                <div class="product-buttons">
                    <button class="btn btn-primary" onclick="buyOrRentProduct('${product.name}')">Buy</button>
                    <button class="btn btn-secondary" onclick="buyOrRentProduct('${product.name}', true)">Rent</button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterProducts() {
    renderProducts();
}

function buyOrRentProduct(productName, rent = false) {
    const action = rent ? 'Rental request' : 'Purchase';
    alert(`${action} for ${productName} added successfully. This supports community cleanup initiatives.`);
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.add('active');
    }

    document.querySelectorAll('.tab-btn').forEach(button => {
        button.classList.remove('active');
    });

    const relatedButton = Array.from(document.querySelectorAll('.tab-btn')).find(button => {
        const clickValue = button.getAttribute('onclick');
        return clickValue && clickValue.includes(`'${tabId}'`);
    });

    if (relatedButton) {
        relatedButton.classList.add('active');
    }
}

function switchLearnTab(tabId) {
    document.querySelectorAll('#learn .tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.add('active');
    }

    document.querySelectorAll('#learn .tab-btn').forEach(button => {
        button.classList.remove('active');
    });

    const relatedButton = Array.from(document.querySelectorAll('#learn .tab-btn')).find(button => {
        const text = button.textContent.toLowerCase();
        if (tabId === 'waste') return text.includes('waste');
        if (tabId === 'cleanup') return text.includes('cleanup');
        if (tabId === 'hazards') return text.includes('civic');
        return false;
    });

    if (relatedButton) {
        relatedButton.classList.add('active');
    }
}

function renderIdeas() {
    const container = document.getElementById('ideasGrid');
    container.innerHTML = innovationIdeas.map(idea => `
        <div class="idea-card">
            <div class="idea-badge">${idea.category}</div>
            <div class="idea-title">${idea.title}</div>
            <div class="idea-description">${idea.description}</div>
            <div class="idea-creator">Submitted by: ${idea.creator}</div>
        </div>
    `).join('');
}

function renderLeaderboard() {
    const tbody = document.getElementById('leaderboardBody');
    tbody.innerHTML = leaderboardData.map(item => `
        <tr>
            <td>#${item.rank}</td>
            <td>${item.innovation}</td>
            <td>${item.creator}</td>
            <td>${item.votes}</td>
            <td>${item.status}</td>
        </tr>
    `).join('');
}

function renderProfile() {
    document.getElementById('reportsCount').textContent = profileData.reports;
    document.getElementById('volunteersCount').textContent = profileData.cleanups;
    document.getElementById('hoursCount').textContent = profileData.hours;
    document.getElementById('badgesCount').textContent = profileData.badges;

    const badgesGrid = document.getElementById('badgesGrid');
    badgesGrid.innerHTML = profileData.badgesList.map(badge => `
        <div class="badge">
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-name">${badge.name}</div>
        </div>
    `).join('');

    const activityList = document.getElementById('activityList');
    activityList.innerHTML = profileData.activity.map(item => `
        <div class="activity-item">
            <div class="activity-item-time">${item.time}</div>
            <div class="activity-item-text">${item.text}</div>
        </div>
    `).join('');
}

window.showPage = showPage;
window.showLegalPage = showLegalPage;
window.closeLegalPage = closeLegalPage;
window.acceptLegalTerms = acceptLegalTerms;
window.nextStep = nextStep;
window.prevStep = prevStep;
window.captureLocation = captureLocation;
window.handlePhotoUpload = handlePhotoUpload;
window.removePhoto = removePhoto;
window.filterIssues = filterIssues;
window.filterProducts = filterProducts;
window.buyOrRentProduct = buyOrRentProduct;
window.switchTab = switchTab;
window.switchLearnTab = switchLearnTab;
window.renderExplore = renderExplore;
window.renderProducts = renderProducts;

document.addEventListener('DOMContentLoaded', initApp);
