from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField

class ControlForm(FlaskForm):
    control_name = StringField('Control Name')
    description = StringField('Description')
    submit = SubmitField('Add Control')
