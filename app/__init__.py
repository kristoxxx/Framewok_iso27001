from flask import Flask

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    # Importar y registrar las rutas después de crear la app
    with app.app_context():
        from .routes import init_routes
        init_routes(app)  # Pasar la app a las rutas

    return app
