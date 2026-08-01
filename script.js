document.getElementById('calculateBtn').addEventListener('click', function() {
    const dobInput = document.getElementById('dob').value;
    const statusMsg = document.getElementById('statusMessage');
    const resultsSection = document.getElementById('resultsSection');

    if (!dobInput) {
        statusMsg.innerText = "Please select a valid Date of Birth.";
        resultsSection.style.display = 'none';
        return;
    }
    statusMsg.innerText = "";

    const parts = dobInput.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    function reduceToSingleDigit(numString) {
        let sum = parseInt(numString, 10);
        while (sum > 9) {
            sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
        }
        return sum;
    }

    const kingNumber = reduceToSingleDigit(day);
    const fullDateString = day + month + year;
    const queenNumber = reduceToSingleDigit(fullDateString);

    // Professor's Feedback Fix:
    // For days 1 to 9, 10, 20, and 30, the day digits evaluate directly to the king number 
    // or don't need separate splitting because they are single digits/handled standardly.
    // We check if the day is an exception rule where we do not add the date digits explicitly 
    // on top of the king number if they are already handled.
    const dayInt = parseInt(day, 10);
    const isExceptionDay = (dayInt >= 1 && dayInt <= 9) || dayInt === 10 || dayInt === 20 || dayInt === 30;

    let numberPool = [];

    if (isExceptionDay) {
        // For exception days, use month + year digits, and add the king & queen numbers
        numberPool = (month + year).split('');
        numberPool.push(kingNumber.toString());
        numberPool.push(queenNumber.toString());
    } else {
        // Standard behavior for other days (11-19, 21-29, 31)
        numberPool = fullDateString.split('');
        numberPool.push(kingNumber.toString());
        numberPool.push(queenNumber.toString());
    }

    // Filter out zeros from the final pool
    numberPool = numberPool.filter(digit => digit !== '0');

    const gridCounts = {
        '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0
    };

    numberPool.forEach(digit => {
        if (gridCounts[digit] !== undefined) {
            gridCounts[digit]++;
        }
    });

    document.getElementById('kingOutput').innerText = kingNumber;
    document.getElementById('queenOutput').innerText = queenNumber;
    
    document.getElementById('poolOutput').innerText = numberPool.join(', ');

    for (let i = 1; i <= 9; i++) {
        const cell = document.getElementById(`cell-${i}`);
        const count = gridCounts[i.toString()];
        
        if (count > 0) {
            const repeatedValues = Array(count).fill(i).join(', ');
            cell.innerText = repeatedValues;
            cell.style.color = "var(--accent-gold)"; 
        } else {
            cell.innerText = "-";
            cell.style.color = "var(--text-secondary)"; 
        }
    }

    resultsSection.style.display = 'block';
});
