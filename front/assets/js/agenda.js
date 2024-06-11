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
    const viewSelector = document.getElementById('viewSelector');
    const dropdownItems = document.querySelectorAll('.dropdown-item[data-view]');

    let currentDate = new Date();
    let currentView = 'semaine'; // Vue par défaut

    // Event Listeners
    todayButton.addEventListener('click', goToToday);
    prevButton.addEventListener('click', goToPrevious);
    nextButton.addEventListener('click', goToNext);
    button1.addEventListener('click', showForm1);
    button2.addEventListener('click', showForm2);
    dropdownItems.forEach(item => item.addEventListener('click', changeView));

    // Update the calendar based on the selected view
    function updateCalendar() {
        calendarBody.classList.remove('month-view', 'week-view'); // Enlever les classes spécifiques
        switch (currentView) {
            case 'jour':
                generateDayView();
                break;
            case 'semaine':
                generateWeekView();
                break;
            case 'mois':
                generateMonthView();
                break;
            case 'année':
                generateYearView();
                break;
            default:
                console.error('Type de vue non géré :', currentView);
        }
    }

    function goToToday() {
        currentDate = new Date();
        updateCalendar();
    }

    function goToPrevious() {
        switch (currentView) {
            case 'jour':
                currentDate.setDate(currentDate.getDate() - 1);
                break;
            case 'semaine':
                currentDate.setDate(currentDate.getDate() - 7);
                break;
            case 'mois':
                currentDate.setMonth(currentDate.getMonth() - 1);
                break;
            case 'année':
                currentDate.setFullYear(currentDate.getFullYear() - 1);
                break;
        }
        updateCalendar();
    }

    function goToNext() {
        switch (currentView) {
            case 'jour':
                currentDate.setDate(currentDate.getDate() + 1);
                break;
            case 'semaine':
                currentDate.setDate(currentDate.getDate() + 7);
                break;
            case 'mois':
                currentDate.setMonth(currentDate.getMonth() + 1);
                break;
            case 'année':
                currentDate.setFullYear(currentDate.getFullYear() + 1);
                break;
        }
        updateCalendar();
    }

    function changeView(event) {
        currentView = event.target.getAttribute('data-view');
        viewSelector.textContent = event.target.textContent;
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

    function generateDayView() {
        calendarBody.innerHTML = '';
        calendarBody.classList.add('day-view'); // Ajouter la classe 'day-view'
        const dayOfWeek = currentDate.toLocaleDateString('fr-FR', { weekday: 'long' });
        const dayOfMonth = currentDate.getDate();
        const monthYear = currentDate.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
    
        currentDateElement.innerHTML = `${dayOfMonth} ${monthYear}`;
    
        let html = '<table class="table table-bordered"><thead><tr><th></th><th>' + dayOfWeek + ' ' + dayOfMonth + '</th></tr></thead><tbody>';
        for (let hour = 0; hour < 24; hour++) {
            html += `<tr><td class="hour-cell">${hour}:00</td><td class="day-cell"></td></tr>`;
        }
        html += '</tbody></table>';
        calendarBody.innerHTML = html;
    }
    

    function generateWeekView() {
        calendarBody.innerHTML = '';
        calendarBody.classList.add('week-view'); // Ajouter la classe 'week-view'
        const weekStart = getMonday(currentDate);
        currentDateElement.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

        let html = '<table class="table table-bordered"><thead><tr><th></th>';
        for (let day = 0; day < 7; day++) {
            let dayDate = new Date(weekStart);
            dayDate.setDate(weekStart.getDate() + day);
            html += `<th>${dayDate.toLocaleDateString('default', { weekday: 'short' })} ${dayDate.getDate()}</th>`;
        }
        html += '</tr></thead><tbody>';

        for (let hour = 0; hour < 24; hour++) {
            html += '<tr>';
            html += `<td class="hour-cell">${hour}:00</td>`;
            for (let day = 0; day < 7; day++) {
                html += '<td class="day-cell"></td>';
            }
            html += '</tr>';
        }
        html += '</tbody></table>';
        calendarBody.innerHTML = html;
    }

    function generateMonthView() {
        calendarBody.innerHTML = '';
        calendarBody.classList.add('month-view'); // Ajouter la classe 'month-view'
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayIndex = new Date(year, month, 1).getDay();
        const lastDayIndex = new Date(year, month, daysInMonth).getDay();
        const prevMonthDays = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
        const nextMonthDays = lastDayIndex === 0 ? 0 : 7 - lastDayIndex;

        currentDateElement.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

        let html = '<table class="table table-bordered">';
        html += '<tr><th>Lun</th><th>Mar</th><th>Mer</th><th>Jeu</th><th>Ven</th><th>Sam</th><th>Dim</th></tr><tr>';

        const prevMonth = new Date(year, month, 0).getDate();
        for (let i = prevMonth - prevMonthDays + 1; i <= prevMonth; i++) {
            html += `<td class="day previous-month">${i}</td>`;
        }

        for (let i = 1; i <= daysInMonth; i++) {
            if (new Date(year, month, i).getDay() === 1 && i !== 1) {
                html += '</tr><tr>';
            }
            html += `<td class="day">${i}</td>`;
        }

        for (let i = 1; i <= nextMonthDays; i++) {
            html += `<td class="day next-month">${i}</td>`;
        }

        html += '</tr></table>';
        calendarBody.innerHTML = html;
    }

    function generateYearView() {
        calendarBody.innerHTML = '';
        const year = currentDate.getFullYear();
        currentDateElement.textContent = year;
        let html = '<div class="year-grid">';
    
        for (let month = 0; month < 12; month++) {
            const monthDate = new Date(year, month);
            const monthName = monthDate.toLocaleString('default', { month: 'long' });
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const firstDayIndex = new Date(year, month, 1).getDay();
            const prevMonthDays = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
            const prevMonth = new Date(year, month, 0).getDate();
    
            html += `<div class="month-box"><p>${monthName}<p><table class="table table-bordered">`;
    
            html += '<tr><th>L</th><th>M</th><th>M</th><th>J</th><th>V</th><th>S</th><th>D</th></tr><tr>';
    
            for (let i = prevMonth - prevMonthDays + 1; i <= prevMonth; i++) {
                html += `<td class="day previous-month">${i}</td>`;
            }
    
            for (let i = 1; i <= daysInMonth; i++) {
                const currentDateObj = new Date(year, month, i);
                const isCurrentDate = isSameDay(currentDateObj, currentDate);
    
                if (currentDateObj.getDay() === 1 && i !== 1) {
                    html += '</tr><tr>';
                }
    
                if (isCurrentDate) {
                    html += `<td class="day current-day">${i}</td>`;
                } else {
                    html += `<td class="day">${i}</td>`;
                }
            }
    
            html += '</tr></table></div>';
        }
    
        html += '</div>';
        calendarBody.innerHTML = html;
    }
    
    function isSameDay(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    }
    
    
    function getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    // Initial load
    updateCalendar();
});
