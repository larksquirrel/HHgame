document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('pureLoveMode').addEventListener('click', () => {
        window.location.href = 'game.html?mode=pure';
    });
    document.getElementById('aceAdmireMode').addEventListener('click', () => {
        window.location.href = 'game1.html?mode=ace';
    });
});
