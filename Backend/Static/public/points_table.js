document.addEventListener('DOMContentLoaded', function() {
    fetch('Backend\points_table.json')
        .then(response => response.json())
        .then(data => {
            // Check if we have the API format or local format
            let points = [];
            
            if (data.table && data.table.group) {
                // API format - extract from nested structure
                points = data.table.group.map(team => ({
                    position: team.position,
                    team_name: team.team_name,
                    team_flag: team.team_flag,
                    played: team.played,
                    won: team.won,
                    lost: team.lost,
                    tied: team.tied || 0,
                    no_result: team.no_result || 0,
                    points: team.points,
                    nrr: team.nrr
                }));
            } else if (data.points) {
                // Local format - use directly
                points = data.points;
            }
            
            const tbody = document.getElementById('points-table-body');
            tbody.innerHTML = '';
            
            points.forEach(team => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${team.position}</td>
                    <td>
                        ${team.team_flag ? `<img src="${team.team_flag}" alt="${team.team_name}" style="width:24px;vertical-align:middle;margin-right:8px;">` : ''}
                        ${team.team_name}
                    </td>
                    <td>${team.played}</td>
                    <td>${team.won}</td>
                    <td>${team.lost}</td>
                    <td>${team.tied || 0}</td>
                    <td>${team.no_result || 0}</td>
                    <td>${team.points}</td>
                    <td>${team.nrr}</td>
                `;
                tbody.appendChild(tr);
            });
        });
});