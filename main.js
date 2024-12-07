document.addEventListener('DOMContentLoaded', () => {
    const tripForm = document.getElementById('tripForm');
    const tripSummary = document.getElementById('tripSummary');
    const summaryContent = tripSummary.querySelector('.summary-content');

    // Set minimum date to today for date inputs
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('startDate').min = today;
    document.getElementById('endDate').min = today;

    // Update end date minimum when start date changes
    document.getElementById('startDate').addEventListener('change', (e) => {
        document.getElementById('endDate').min = e.target.value;
    });

    tripForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const destination = document.getElementById('destination').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const people = document.getElementById('people').value;
        const budget = document.getElementById('budget').value;

        const duration = calculateTripDuration(startDate, endDate);
        const budgetPerDay = budget / duration;
        const budgetPerPerson = budget / people;

        const summaryHTML = `
            <div class="summary-item">
                <strong>Destination:</strong> ${destination}
            </div>
            <div class="summary-item">
                <strong>Duration:</strong> ${duration} days
                <br>
                <strong>Dates:</strong> ${formatDate(startDate)} to ${formatDate(endDate)}
            </div>
            <div class="summary-item">
                <strong>Travelers:</strong> ${people} ${people > 1 ? 'people' : 'person'}
            </div>
            <div class="summary-item">
                <strong>Total Budget:</strong> ${formatCurrency(budget)}
                <br>
                <strong>Budget per Day:</strong> ${formatCurrency(budgetPerDay)}
                <br>
                <strong>Budget per Person:</strong> ${formatCurrency(budgetPerPerson)}
            </div>
        `;

        summaryContent.innerHTML = summaryHTML;
        tripSummary.classList.remove('hidden');
    });
});