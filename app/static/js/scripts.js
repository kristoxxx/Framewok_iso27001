document.addEventListener("DOMContentLoaded", function() {
    // Verificar si el elemento 'complianceChart' existe antes de acceder a él
    var complianceChartElement = document.getElementById('complianceChart');
    if (complianceChartElement) {
        var ctx = complianceChartElement.getContext('2d');
        var complianceChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Cumplidos', 'Pendientes'],
                datasets: [{
                    data: [completedControls, pendingControls],
                    backgroundColor: ['#4caf50', '#f44336']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }
            }
        });
    }

    // Verificar si el elemento 'riskChart' existe antes de acceder a él
    var riskChartElement = document.getElementById('riskChart');
    if (riskChartElement) {
        var ctx2 = riskChartElement.getContext('2d');
        var riskChart = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: ['Identificados', 'Mitigados', 'Pendientes'],
                datasets: [{
                    label: 'Riesgos',
                    data: [totalControls, completedControls, pendingControls],
                    backgroundColor: ['#ff9800', '#4caf50', '#f44336']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }
            }
        });
    }

    // Verificar si el elemento 'riskAssessmentChart' existe antes de acceder a él
    var riskAssessmentChartElement = document.getElementById('riskAssessmentChart');
    if (riskAssessmentChartElement) {
        var ctx3 = riskAssessmentChartElement.getContext('2d');
        var riskAssessmentChart = new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: ['Identificados', 'Mitigados', 'Pendientes'],
                datasets: [{
                    label: 'Riesgos',
                    data: [totalRisks, mitigatedRisks, pendingRisks],
                    backgroundColor: ['#ff9800', '#4caf50', '#f44336']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }
            }
        });
    }

    // Función para alternar el estado de un control
    function toggleStatus(controlId) {
        console.log('Toggling status for control:', controlId);
        fetch('/toggle-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ control_id: controlId })
        }).then(() => {
            console.log('Status toggled, reloading page');
            location.reload();  // Recargar la página para reflejar los cambios
        }).catch(error => console.error('Error:', error));
    }

    // Función para alternar el estado de un riesgo
    function toggleRisk(riskId) {
        console.log('Toggling risk state for risk:', riskId);
        fetch('/toggle-risk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ risk_id: riskId })
        }).then(() => {
            console.log('Risk state toggled, reloading page');
            location.reload();  // Recargar la página para reflejar los cambios
        }).catch(error => console.error('Error:', error));
    }

    // Función para eliminar un riesgo
    function deleteRisk(riskId) {
        console.log('Deleting risk:', riskId);
        fetch('/delete-risk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ risk_id: riskId })
        }).then(response => {
            console.log('Server response:', response);
            if (response.ok) {
                console.log('Risk deleted, reloading page');
                location.reload();  // Recargar la página para reflejar los cambios
            } else {
                console.error('Error deleting risk');
            }
        }).catch(error => console.error('Error:', error));
    }
    

    // Filtrado de controles
    function filterControls(status) {
        console.log('Filtering controls with status:', status);
        let rows = document.querySelectorAll('.control-row');
        rows.forEach(row => {
            if (status === 'all' || row.dataset.status === status) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    // Hacer accesibles las funciones en el DOM global
    window.toggleStatus = toggleStatus;
    window.filterControls = filterControls;
    window.toggleRisk = toggleRisk;
    window.deleteRisk = deleteRisk;
});
