// Store hours config
const storeHours = {
    0: { open: 6.5, close: 20 }, // Monday
    1: { open: 6.5, close: 20 }, // Tuesday
    2: { open: 6.5, close: 20 }, // Wednesday
    3: { open: 6.5, close: 20 }, // Thursday
    4: { open: 6.5, close: 20 }, // Friday
    5: { open: 6.5, close: 20 },  // Saturday
    6: { open: 8, close: 15 } // Sunday
}

// Check if store is currently open
function updateStoreStatus() {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = hour + (minute / 60);

    let isOpen = false;
    let nextChange = '';

    const todayHours = storeHours[day];
    
    if (currentTime >= todayHours.open && currentTime < todayHours.close) {
        isOpen = true;
        const closeHour = Math.floor(todayHours.close);
        const closeMin = Math.round((todayHours.close - closeHour) * 60);
        nextChange = `Closes at ${closeHour}:${closeMin.toString().padStart(2, '0')}`;
    } else {
        isOpen = false;
        if (currentTime < todayHours.open) {
            const openHour = Math.floor(todayHours.open);
            const openMin = Math.round((todayHours.open - openHour) * 60);
            nextChange = `Opens at ${openHour}:${openMin.toString().padStart(2, '0')}`;
        } else {
            // Check tomorrow's hours
            const tomorrow = (day + 1) % 7;
            const tomorrowHours = storeHours[tomorrow];
            const openHour = Math.floor(tomorrowHours.open);
            const openMin = Math.round((tomorrowHours.open - openHour) * 60);
            nextChange = `Opens tomorrow at ${openHour}:${openMin.toString().padStart(2, '0')}`;
        }
    }

    const statusElement = document.getElementById('currentStatus');
    const indicator = document.querySelector('.status-indicator');
    
    if (isOpen) {
        statusElement.textContent = `We're Open! ${nextChange}`;
        indicator.style.background = '#28a745';
        statusElement.parentElement.style.background = 'rgba(40, 167, 69, 0.1)';
        statusElement.parentElement.style.borderColor = '#28a745';
        statusElement.parentElement.style.color = '#155724';
    } else {
        statusElement.textContent = `We're Closed - ${nextChange}`;
        indicator.style.background = '#dc3545';
        statusElement.parentElement.style.background = 'rgba(220, 53, 69, 0.1)';
        statusElement.parentElement.style.borderColor = '#dc3545';
        statusElement.parentElement.style.color = '#721c24';
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('A&A Newsagent website loaded successfully');
    
    // Update store status immediately
    updateStoreStatus();
    
    // Update status every minute
    setInterval(updateStoreStatus, 60000);
    
    // Log current status for debugging
    console.log('Store hours configuration loaded:', storeHours);
});