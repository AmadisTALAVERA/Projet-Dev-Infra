// assets/js/agenda.js
document.addEventListener('DOMContentLoaded', function() {
    const currentDateElement = document.getElementById('currentDate');
    const calendarBody = document.getElementById('calendarBody');
    const daysOfWeekElement = document.getElementById('daysOfWeek');
    const todayButton = document.getElementById('todayButton');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const button1 = document.getElementById('button1');
    const button2 = document.getElementById('button2');
    const form1 = document.getElementById('form1');
    const form2 = document.getElementById('form2');
    
    let currentDate = new Date();

    // Event Listeners
    todayButton.addEventListener('click', goToToday);
    prevButton.addEventListener('click', goToPreviousMonth);
    nextButton.addEventListener('click', goToNextMonth);
    button1.addEventListener('click', showForm1);
    button2.addEventListener('click', showForm2);

    // Show current month
    function updateCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayIndex = new Date(year, month, 1).getDay();
        const lastDayIndex = new Date(year, month, daysInMonth).getDay();
        const prevMonthDays = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
        const nextMonthDays = lastDayIndex === 0 ? 0 : 7 - lastDayIndex;

        currentDateElement.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

        daysOfWeekElement.innerHTML = '';
        calendarBody.innerHTML = '';

        const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            daysOfWeekElement.appendChild(dayElement);
        });

        const prevMonth = new Date(year, month, 0).getDate();
        for (let i = prevMonth - prevMonthDays + 1; i <= prevMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day previous-month';
            dayElement.textContent = i;
            calendarBody.appendChild(dayElement);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            dayElement.textContent = i;
            calendarBody.appendChild(dayElement);
        }

        for (let i = 1; i <= nextMonthDays; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day next-month';
            dayElement.textContent = i;
            calendarBody.appendChild(dayElement);
        }
    }

    function goToToday() {
        currentDate = new Date();
        updateCalendar();
    }

    function goToPreviousMonth() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    }

    function goToNextMonth() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    }

    function showForm1() {
        form1.classList.add('active');
        form2.classList.remove('active');
        button1.classList.add('btn-active');
        button1.classList.remove('btn-inactive');
        button2.classList.add('btn-inactive');
        button2.classList.remove('btn-active');
    }

    function showForm2() {
        form1.classList.remove('active');
        form2.classList.add('active');
        button1.classList.add('btn-inactive');
        button1.classList.remove('btn-active');
        button2.classList.add('btn-active');
        button2.classList.remove('btn-inactive');
    }

    // Initial load
    updateCalendar();
});
