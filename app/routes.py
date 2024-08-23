from .controls import controls
from .risks import risks  # Importar riesgos desde risks.py
# routes.py
from flask import render_template, request, redirect, url_for

# Simulación de una base de datos de controles y riesgos



def init_routes(app):
    @app.route('/')
    def dashboard():
        total_controls = len(controls)
        completed_controls = sum(1 for control in controls if control['completed'])
        pending_controls = total_controls - completed_controls

        return render_template('dashboard.html', 
                               total_controls=total_controls, 
                               completed_controls=completed_controls, 
                               pending_controls=pending_controls)

    @app.route('/compliance-checklist', methods=['GET', 'POST'])
    def compliance_checklist():
        if request.method == 'POST':
            control_id = request.form.get('control_id')
            # Encuentra el control y alterna su estado
            for control in controls:
                if control['id'] == control_id:
                    control['completed'] = not control['completed']
                    break
            return redirect(url_for('compliance_checklist'))

        return render_template('compliance_checklist.html', controls=controls)

    @app.route('/toggle-status', methods=['POST'])
    def toggle_status():
        control_id = request.json.get('control_id')
        for control in controls:
            if control['id'] == control_id:
                control['completed'] = not control['completed']
                break
        return '', 204  # Respuesta sin contenido

    @app.route('/risk-assessment')
    def risk_assessment():
        total_risks = len(risks)
        mitigated_risks = sum(1 for risk in risks if risk['mitigated'])
        pending_risks = total_risks - mitigated_risks
        return render_template('risk_assessment.html', 
                               total_risks=total_risks, 
                               mitigated_risks=mitigated_risks, 
                               pending_risks=pending_risks, 
                               risks=risks)

    @app.route('/add-risk', methods=['POST'])
    def add_risk():
        new_risk_description = request.form['risk_description']
        new_risk = {"id": len(risks) + 1, "description": new_risk_description, "mitigated": False}
        risks.append(new_risk)
        return redirect(url_for('risk_assessment'))

    @app.route('/toggle-risk', methods=['POST'])
    def toggle_risk():
        risk_id = int(request.json.get('risk_id'))
        for risk in risks:
            if risk['id'] == risk_id:
                risk['mitigated'] = not risk['mitigated']
                break
        return '', 204

    @app.route('/delete-risk', methods=['POST'])
    def delete_risk():
        try:
            risk_id = int(request.json.get('risk_id'))
            global risks
            risks = [risk for risk in risks if risk['id'] != risk_id]
            return '', 204
        except Exception as e:
            print(f'Error occurred while deleting risk: {e}')
            return str(e), 500
