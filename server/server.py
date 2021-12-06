from flask_app import app
from flask_cors import CORS
from flask_app.controllers import game
from flask_app.config.mysqlconnection import connectToMySQL


CORS(app)


if __name__ == "__main__":
    app.run(debug=True)