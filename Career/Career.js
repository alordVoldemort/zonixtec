        // Global variables
         let allJobs = [];
            let filteredJobs = [];



        // FAQ functionality
        document.querySelectorAll('.faq-question').forEach(question => {
                question.addEventListener('click', () => {
                    const faqItem = question.parentElement;
                    faqItem.classList.toggle('active');
                });
            });

        // Load jobs from backend
        async function loadJobs() {
            const loadingElement = document.getElementById('jobsLoading');
            const containerElement = document.getElementById('jobsContainer');
            const noJobsElement = document.getElementById('noJobsMessage');
            const errorElement = document.getElementById('jobsError');

            // Show loading state
            loadingElement.style.display = 'block';
            containerElement.innerHTML = '';
            noJobsElement.style.display = 'none';
            errorElement.style.display = 'none';

            try {
                const response = await fetch('https://zonixtec.com/server/admin/admin-get-jobs.php');
                const data = await response.json();

                loadingElement.style.display = 'none';

                if (data.status && data.response && data.response.length > 0) {
                    allJobs = data.response.filter(job => job.status === 'active'); // Only show active jobs
                    filteredJobs = [...allJobs];
                    renderJobs(filteredJobs);
                    populateDepartmentFilter();
                } else {
                    noJobsElement.style.display = 'block';
                }
            } catch (error) {
                console.error('Error loading jobs:', error);
                loadingElement.style.display = 'none';
                errorElement.style.display = 'block';
            }
        }

        // Populate department filter dynamically
        function populateDepartmentFilter() {
            const departmentFilter = document.getElementById('departmentFilter');
            const departments = [...new Set(allJobs.map(job => job.department))].filter(dept => dept);
           
            // Clear existing options except "All Departments"
            departmentFilter.innerHTML = '<option value="">All Departments</option>';
           
            // Add unique departments
            departments.forEach(dept => {
                const option = document.createElement('option');
                option.value = dept;
                option.textContent = dept;
                departmentFilter.appendChild(option);
            });
        }

        // Render jobs
        function renderJobs(jobs) {
            const container = document.getElementById('jobsContainer');
           
            if (jobs.length === 0) {
                document.getElementById('noJobsMessage').style.display = 'block';
                return;
            }

            container.innerHTML = jobs.map(job => {
                const requirements = job.requirements ? job.requirements.split('\n').filter(req => req.trim()) : [];
                const tags = job.tags ? job.tags.split(',').map(tag => tag.trim()) : [];
               
                return `
                    <div class="job-card" data-job-id="${job.id}">
                        <div class="job-header">
                            <h3 class="job-title">${escapeHtml(job.title)}</h3>
                            <a href="#" class="job-apply-btn" data-job="${escapeHtml(job.title)}" data-job-id="${job.id}">
                                Apply Now <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                        <div class="job-meta">
                            <span><i class="fas fa-map-marker-alt"></i> ${escapeHtml(job.location)}</span>
                            <span><i class="fas fa-clock"></i> ${escapeHtml(job.type)}</span>
                            ${job.salary ? `<span><i class="fas fa-indian-rupee-sign"></i> ${escapeHtml(job.salary)}</span>` : ''}
                            <span><i class="fas fa-building"></i> ${escapeHtml(job.department)}</span>
                        </div>
                        <div class="job-description">
                            <p>${escapeHtml(job.description)}</p>
                        </div>
                        ${requirements.length > 0 ? `
                            <div class="job-requirements">
                                <h4>Requirements:</h4>
                                <ul>
                                    ${requirements.map(req => `<li>${escapeHtml(req)}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        ${tags.length > 0 ? `
                            <div class="job-tags" style="margin-top: 15px;">
                                ${tags.map(tag => `<span class="job-tag" style="background: rgba(37, 99, 235, 0.2); color: var(--secondary); padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; margin-right: 8px;">${escapeHtml(tag)}</span>`).join('')}
                            </div>
                        ` : ''}
                    </div>
                `;
            }).join('');

            // Re-attach event listeners for apply buttons
            attachApplyButtonListeners();
        }

        // Escape HTML to prevent XSS
        function escapeHtml(text) {
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            return text ? text.replace(/[&<>"']/g, function(m) { return map[m]; }) : '';
        }

        // Search and filter functionality
        function initializeSearch() {
            const searchInput = document.querySelector('.search-input');
            const searchBtn = document.querySelector('.search-btn');
            const keywordInput = document.querySelector('.filter-select'); // First filter input (keywords)
            const locationFilter = document.querySelectorAll('.filter-select')[1]; // Location filter
            const workTypeFilter = document.querySelectorAll('.filter-select')[2]; // Work type filter
            const departmentFilter = document.getElementById('departmentFilter'); // Department filter

            function performSearch() {
                const searchTerm = searchInput.value.toLowerCase().trim();
                const keyword = keywordInput.value.toLowerCase().trim();
                const location = locationFilter.value;
                const workType = workTypeFilter.value;
                const department = departmentFilter.value;

                filteredJobs = allJobs.filter(job => {
                    const matchesSearch = !searchTerm ||
                        job.title.toLowerCase().includes(searchTerm) ||
                        job.description.toLowerCase().includes(searchTerm) ||
                        (job.tags && job.tags.toLowerCase().includes(searchTerm));
                   
                    const matchesKeyword = !keyword ||
                        job.title.toLowerCase().includes(keyword) ||
                        job.description.toLowerCase().includes(keyword) ||
                        (job.tags && job.tags.toLowerCase().includes(keyword));
                   
                    const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
                    const matchesWorkType = !workType || job.type.toLowerCase() === workType.toLowerCase();
                    const matchesDepartment = !department || job.department.toLowerCase() === department.toLowerCase();

                    return matchesSearch && matchesKeyword && matchesLocation && matchesWorkType && matchesDepartment;
                });

                renderJobs(filteredJobs);
            }

            searchBtn.addEventListener('click', performSearch);
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });

            // Add event listeners to all filter inputs
            [keywordInput, locationFilter, workTypeFilter, departmentFilter].forEach(filter => {
                if (filter) {
                    filter.addEventListener('change', performSearch);
                    filter.addEventListener('input', performSearch);
                }
            });
        }

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            loadJobs();
            initializeSearch();
            initializeApplicationModal();
        });
    
        // Application Modal functionality
        function initializeApplicationModal() {
            const modal = document.getElementById('applicationModal');
            const closeModal = document.getElementById('closeModal');
            const cancelBtn = document.getElementById('cancelBtn');
            const closeSuccess = document.getElementById('closeSuccess');
            const jobTitleElement = document.getElementById('jobTitle');
            const applicationForm = document.getElementById('applicationForm');
            const formContainer = document.getElementById('formContainer');
            const successMessage = document.getElementById('successMessage');
            const fileUpload = document.getElementById('fileUpload');
            const resumeInput = document.getElementById('resume');
            const fileName = document.getElementById('fileName');
            const coverLetter = document.getElementById('coverLetter');
            const coverLetterCounter = document.getElementById('coverLetterCounter');
            const sourceSelect = document.getElementById('source');
            const otherSourceContainer = document.getElementById('otherSourceContainer');
            const otherSourceInput = document.getElementById('otherSource');
            const submitBtn = applicationForm.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');

            let currentJobTitle = '';
            let currentJobId = '';

            // Validation regex patterns
            const regexPatterns = {
                name: /^[A-Za-z\s]{2,50}$/, // Letters and spaces, 2-50 characters
                email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Valid email format
                phone: /^[\+]?[0-9\s\-\(\)]{10,15}$/, // Phone number with optional country code
            };

            // Show error message
            function showError(fieldId, message) {
                const errorElement = document.getElementById(fieldId + 'Error');
                const inputElement = document.getElementById(fieldId);
                if (errorElement && inputElement) {
                    errorElement.textContent = message;
                    errorElement.style.display = 'block';
                    inputElement.classList.add('error');
                }
            }

            // Clear error message
            function clearError(fieldId) {
                const errorElement = document.getElementById(fieldId + 'Error');
                const inputElement = document.getElementById(fieldId);
                if (errorElement && inputElement) {
                    errorElement.textContent = '';
                    errorElement.style.display = 'none';
                    inputElement.classList.remove('error');
                }
            }

            // Validate individual field
            function validateField(field) {
                const fieldId = field.id;
                const value = field.value.trim();

                if (field.required && !value) {
                    showError(fieldId, 'This field is required');
                    return false;
                }

                switch (fieldId) {
                    case 'firstName':
                    case 'lastName':
                        if (value && !regexPatterns.name.test(value)) {
                            showError(fieldId, 'Please enter a valid name (2-50 characters, letters only)');
                            return false;
                        }
                        break;
                    case 'email':
                        if (value && !regexPatterns.email.test(value)) {
                            showError(fieldId, 'Please enter a valid email address');
                            return false;
                        }
                        break;
                    case 'phone':
                        if (value && !regexPatterns.phone.test(value)) {
                            showError(fieldId, 'Please enter a valid phone number (10-15 digits)');
                            return false;
                        }
                        break;
                    case 'experience':
                    case 'education':
                    case 'source':
                        if (!value) {
                            showError(fieldId, 'Please select an option');
                            return false;
                        }
                        break;
                    case 'otherSource':
                        if (sourceSelect.value === 'other' && !value) {
                            showError('source', 'Please specify how you heard about us');
                            return false;
                        }
                        break;
                }
                clearError(fieldId);
                return true;
            }

            // Validate file upload
            function validateFile() {
                if (!resumeInput.files.length) {
                    showError('resume', 'Please upload your resume');
                    return false;
                }
                const file = resumeInput.files[0];
                const fileSize = file.size / 1024 / 1024; // Size in MB
                const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

                if (!validTypes.includes(file.type)) {
                    showError('resume', 'Please upload a PDF, DOC, or DOCX file');
                    return false;
                }
                if (fileSize > 5) {
                    showError('resume', 'File size must be less than 5MB');
                    return false;
                }

                clearError('resume');
                return true;
            }

            // Validate cover letter
            function validateCoverLetter() {
                const length = coverLetter.value.length;
                if (length > 500) {
                    showError('coverLetter', 'Cover letter cannot exceed 500 characters');
                    return false;
                }
                clearError('coverLetter');
                return true;
            }

            // Validate entire form
            function validateForm() {
                let isValid = true;
                const fields = ['firstName', 'lastName', 'email', 'phone', 'experience', 'education', 'source'];

                fields.forEach(fieldId => {
                    const field = document.getElementById(fieldId);
                    if (!validateField(field)) {
                        isValid = false;
                    }
                });

                if (!validateFile()) {
                    isValid = false;
                }

                if (!validateCoverLetter()) {
                    isValid = false;
                }

                if (sourceSelect.value === 'other') {
                    if (!validateField(otherSourceInput)) {
                        isValid = false;
                    }
                }

                return isValid;
            }

            // Character counter for cover letter
            coverLetter.addEventListener('input', function () {
                const length = this.value.length;
                coverLetterCounter.textContent = `${length}/500 characters`;
                if (length > 450) {
                    coverLetterCounter.classList.add('near-limit');
                    coverLetterCounter.classList.remove('over-limit');
                } else if (length > 500) {
                    coverLetterCounter.classList.remove('near-limit');
                    coverLetterCounter.classList.add('over-limit');
                } else {
                    coverLetterCounter.classList.remove('near-limit', 'over-limit');
                }
                validateCoverLetter();
            });

            // Show/hide other source input
            sourceSelect.addEventListener('change', function () {
                if (this.value === 'other') {
                    otherSourceContainer.classList.add('active');
                    otherSourceInput.required = true;
                } else {
                    otherSourceContainer.classList.remove('active');
                    otherSourceInput.required = false;
                    otherSourceInput.value = '';
                    clearError('source');
                }
                validateField(this);
            });

            // Attach event listeners to apply buttons
            window.attachApplyButtonListeners = function() {
                document.querySelectorAll('.job-apply-btn').forEach(btn => {
                    btn.addEventListener('click', function (e) {
                        e.preventDefault();
                        currentJobTitle = this.getAttribute('data-job');
                        currentJobId = this.getAttribute('data-job-id');
                        jobTitleElement.textContent = currentJobTitle;
                        modal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    });
                });
            };

            // Close modal
            function closeApplicationModal() {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                applicationForm.reset();
                fileName.textContent = '';
                fileUpload.classList.remove('has-file');
                formContainer.style.display = 'block';
                successMessage.classList.remove('active');
                coverLetterCounter.textContent = '0/500 characters';
                coverLetterCounter.classList.remove('near-limit', 'over-limit');
                otherSourceContainer.classList.remove('active');
                otherSourceInput.required = false;

                // Clear all errors
                document.querySelectorAll('.form-control').forEach(input => {
                    input.classList.remove('error');
                });
                document.querySelectorAll('.form-error').forEach(error => {
                    error.textContent = '';
                    error.style.display = 'none';
                });

                // Reset button state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
            }

            closeModal.addEventListener('click', closeApplicationModal);
            cancelBtn.addEventListener('click', closeApplicationModal);
            closeSuccess.addEventListener('click', closeApplicationModal);

            modal.addEventListener('click', function (e) {
                if (e.target === modal) {
                    closeApplicationModal();
                }
            });

            // File upload handling
            fileUpload.addEventListener('click', function () {
                resumeInput.click();
            });

            resumeInput.addEventListener('change', function () {
                if (this.files.length > 0) {
                    const file = this.files[0];
                    fileName.textContent = file.name;
                    fileUpload.classList.add('has-file');
                    validateFile();
                } else {
                    fileName.textContent = '';
                    fileUpload.classList.remove('has-file');
                    showError('resume', 'Please upload your resume');
                }
            });

            // Real-time validation
            const inputs = applicationForm.querySelectorAll('input[required], select[required]');
            inputs.forEach(input => {
                input.addEventListener('input', function () {
                    validateField(this);
                });
                input.addEventListener('blur', function () {
                    validateField(this);
                });
            });

            // Form submission
            applicationForm.addEventListener('submit', async function (e) {
                e.preventDefault();

                if (!validateForm()) {
                    return;
                }

                // Show loading state
                btnText.style.display = 'none';
                btnLoading.style.display = 'flex';
                submitBtn.disabled = true;

                try {
                    // Prepare form data
                    const formData = new FormData();
                    formData.append('name', `${document.getElementById('firstName').value.trim()} ${document.getElementById('lastName').value.trim()}`);
                    formData.append('email', document.getElementById('email').value.trim());
                    formData.append('phone', document.getElementById('phone').value.trim());
                    formData.append('experience', document.getElementById('experience').value);
                    formData.append('education', document.getElementById('education').value);
                    formData.append('cover_letter', document.getElementById('coverLetter').value.trim() || 'No cover letter provided');
                    formData.append('resume', resumeInput.files[0]);
                    formData.append('job_title', currentJobTitle);
                    formData.append('source', sourceSelect.value === 'other' ? otherSourceInput.value.trim() : sourceSelect.value);

                    // Submit to backend
                    const response = await fetch('https://zonixtec.com/server/admin/apply-job.php', {
                        method: 'POST',
                        body: formData
                    });

                    const result = await response.json();

                    if (result.status) {
                        // Success - show success message
                        formContainer.style.display = 'none';
                        successMessage.classList.add('active');
                    } else {
                        // Error - show error message
                        alert('Error: ' + (result.message || 'Failed to submit application. Please try again.'));
                    }
                } catch (error) {
                    console.error('Submission error:', error);
                    alert('Network error. Please check your connection and try again.');
                } finally {
                    // Reset button state
                    btnText.style.display = 'inline';
                    btnLoading.style.display = 'none';
                    submitBtn.disabled = false;
                }
            });
        }

document.querySelectorAll('.footer-dropdown-header').forEach(header => {
  header.addEventListener('click', () => {
    const parent = header.parentElement;
    parent.classList.toggle('open');
  });
});
