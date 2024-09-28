
document.addEventListener('DOMContentLoaded', function () {
    // Actualizar el tiempo de conexión
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        document.getElementById('current-time-connection').innerText = hours + ':' + minutes;
    }

    // Animación del saldo disponible
    const balanceElement = document.getElementById('balance-amount');
    const availableElement = document.getElementById('available-balance');
    const finalBalance = 86735.98;  // Saldo total final correcto
    let currentBalance = 0;  // Saldo inicial
    const duration = 2000;  // Duración de la animación en ms
    const startTime = performance.now();

    const updateBalance = () => {
        const elapsedTime = performance.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        currentBalance = finalBalance * progress;
        balanceElement.textContent = currentBalance.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
        availableElement.textContent = balanceElement.textContent;

        if (progress < 1) {
            requestAnimationFrame(updateBalance);
        }
    };

    updateBalance();  // Iniciar la animación

    // Animación de los últimos movimientos
    const transactions = document.querySelectorAll('.transaction');
    transactions.forEach((transaction, index) => {
        setTimeout(() => {
            transaction.classList.add('fade-in');
        }, index * 500); // 500ms de retraso entre cada movimiento para la animación
    });

    // Gráfico de balances
    const ctx = document.getElementById('balance-chart').getContext('2d');
    const balanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
            datasets: [{
                label: 'Saldo',
                data: [12000, 13000, 12500, 13500, 14000, 15000, 14500],
                borderColor: '#0051a2',
                backgroundColor: 'rgba(0, 81, 162, 0.2)',
                fill: true,
            }, {
                label: 'Gastos',
                data: [-3000, -2000, -1500, -2000, -2500, -3000, -2500],
                borderColor: '#e53935',
                backgroundColor: 'rgba(229, 57, 53, 0.2)',
                fill: true,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Actualizar la hora cada vez que se recarga la página
    window.onload = updateTime;

});
