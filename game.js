document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('board');
    const messageElement = document.getElementById('dice-result');
    const rollDiceButton = document.getElementById('roll-dice');
    const currentElement = document.getElementById('currentElement');
    const nextElement = document.getElementById('nextElement');

    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');

    const player1Avatar = document.getElementById('player1-avatar');
    const player2Avatar = document.getElementById('player2-avatar');

    let currentPlayer = 1;
    const totalCells = 55;
    const positions = [1, 1]; // Player positions, starting at 1


    function updateAvatarBorders() {
        if (currentPlayer === 1) {
            player1Avatar.classList.add('active-player1');
            player2Avatar.classList.remove('active-player2');
        } else {
            player2Avatar.classList.add('active-player2');
            player1Avatar.classList.remove('active-player1');
        }
    }

    // Initial setup: Set Player 1 as the active player
    updateAvatarBorders();

    // Function to display the text for the current grid
    function displayCurrentText(position) {
        const text = document.querySelector(`.cell:nth-child(${position})`).getAttribute('data-text');
        const type = document.querySelector(`.cell:nth-child(${position})`).getAttribute('data-type');
        
        if (type === 'move') {
            currentElement.textContent = `移动点数: ${text}`;
            return parseInt(text, 10);
        }
        else {
            currentElement.textContent = `移动点数: 0`;
        }

        return 0;
    }


    function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }


    function updatePlayerPositions() {
        const cells = document.querySelectorAll('.cell');

        cells.forEach(cell => {
            // 确保“起点”和“终点”的标识和颜色
            if (cell.dataset.index == 1) {
                cell.innerHTML = '起点';
                cell.style.backgroundColor = ''; // 默认颜色
                cell.style.color = ''; // 默认颜色
            } else if (cell.dataset.index == totalCells) {
                cell.innerHTML = '终点';
                cell.style.backgroundColor = ''; // 默认颜色
                cell.style.color = ''; // 默认颜色
            } else {
                cell.style.backgroundColor = ''; // 默认颜色
                cell.style.color = ''; // 默认颜色
            }
        });

        //第一遍
        const player1Position = positions[0];
        const player2Position = positions[1];

        if (player1Position > 0 && player1Position <= totalCells) {
            document.querySelector(`.cell:nth-child(${player1Position})`).style.backgroundColor = 'black';
            document.querySelector(`.cell:nth-child(${player1Position})`).style.color = 'white'; // 确保文字可读
            
        }
        if (player2Position > 0 && player2Position <= totalCells) {
            document.querySelector(`.cell:nth-child(${player2Position})`).style.backgroundColor = 'pink';
            document.querySelector(`.cell:nth-child(${player2Position})`).style.color = 'black'; // 确保文字可读


        }

    }



    function checkWin() {
        if (positions[currentPlayer - 1] === totalCells) {
            if (currentPlayer == 1) {
                messageElement.textContent = `恭喜黑眼镜获胜！`;
            }
            if (currentPlayer == 2) {
                messageElement.textContent = `恭喜解雨臣获胜！`;
            }
            rollDiceButton.disabled = true;
        }
    }

    function handleRoll() {
        const diceValue = rollDice();
        const playerIndex = currentPlayer - 1;

        //第一遍
        positions[playerIndex] = Math.min(positions[playerIndex] + diceValue, totalCells);
        updatePlayerPositions();
        messageElement.textContent = `掷骰子点数: ${diceValue}`;

        //第二遍
        const move = displayCurrentText(positions[playerIndex]);
        positions[playerIndex] = Math.min(positions[playerIndex] + move, totalCells);
        updatePlayerPositions();
        const text = document.querySelector(`.cell:nth-child(${positions[playerIndex]})`).getAttribute('data-text');
        nextElement.textContent = `当前任务: ${text}`;

        //无关
        updateAvatarBorders();
       
        checkWin();

        // Switch players
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        player1.style.color = currentPlayer === 1 ? 'black' : 'gray';
        player2.style.color = currentPlayer === 2 ? 'pink' : 'gray';
    }

    updatePlayerPositions();
    rollDiceButton.addEventListener('click', handleRoll);
});

